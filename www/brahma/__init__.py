__author__ = 'zhengjitang@gmail.com'


import logging
import time
import importlib
import tornado.ioloop
import tornado.web
from brahma import daemon


class Daemon(daemon.Daemon):
    def run(self, debug=False):
        Tornado.setup(debug)
        self._run("jobs", Tornado.jobs)
        self._run("tasks", Tornado.tasks)
        Tornado.http()

    def _run1(self, name, target):
        import threading
        t = threading.Thread(name=name, target=target)
        t.daemon = True
        t.start()

    def _run(self, name, target):
        import multiprocessing
        t = multiprocessing.Process(name=name, target=target)
        t.daemon = True
        t.start()
        time.sleep(1)


class Tornado:
    @staticmethod
    def http():
        import tornado.options

        app = Application(tornado.options.options.debug)
        logging.info("开始监听端口%d", tornado.options.options.http_port)

        import socket
        from tornado.httpserver import HTTPServer
        from tornado.netutil import bind_sockets

        sockets = bind_sockets(
            port=tornado.options.options.http_port,
            address=tornado.options.options.http_host,
            family=socket.AF_INET)
        if not tornado.options.options.debug:
            import tornado.process

            tornado.process.fork_processes(0)
        server = HTTPServer(app, xheaders=True)
        server.add_sockets(sockets)
        tornado.ioloop.IOLoop.instance().start()

    @staticmethod
    def tasks():
        logging.info("启动任务调度")
        import time, sched, tornado.options
        from brahma.store.task import TaskDao

        s = sched.scheduler(time.time, time.sleep)

        def run():
            for t in TaskDao.available():
                TaskDao.set_nextRun(t.id)
                #处理任务
                if t.flag in ['qr', 'sitemap', 'rss', 'robots']:
                    from brahma.jobs import TaskSender
                    getattr(TaskSender, t.flag)()
                else:
                    logging.error("未知的任务类型[%s]" % t.flag)

        while True:
            s.enter(tornado.options.options.task_space, 10, run)
            s.run()


    @staticmethod
    def jobs():
        import logging
        from brahma.env import redis
        from brahma.store.site import SettingDao
        from brahma.utils.email import Email
        from brahma.jobs import TaskListener

        logging.info("启动后台进程")
        while True:
            flag, args = redis.brpop("tasks")
            if flag == "email":
                TaskListener.email(*args)
            elif flag in ["rss", "sitemap", "qr", "robots"]:
                import importlib

                getattr(TaskListener, flag)()
            elif flag == "echo":
                logging.info(str(args))
            else:
                logging.error("丢弃的任务[(%s, %s)]" % (type, str(args)))


    @staticmethod
    def setup(debug):
        from brahma import utils
        import tornado.options

        app_store = utils.path("../../tmp")

        tornado.options.define("http_secret", type=str, help="COOKIE密钥")
        tornado.options.define("http_port", type=int, help="HTTP Server 监听端口")
        tornado.options.define("http_host", type=str, help="HTTP Server 监听地址")

        tornado.options.define("app_name", type=str, help="APP名称")
        tornado.options.define("app_secret", type=str, help="加密密钥")
        tornado.options.define("app_store", type=str, help="站点数据存储目录", default=app_store)
        tornado.options.define("app_plugins", type=list, help="插件列表", default=[])

        tornado.options.define("task_space", type=int, help="任务调度间隔", default=300)

        tornado.options.define("db_uri", type=str, help="数据库连接", default="sqlite:///" + app_store + "/db")
        tornado.options.define("redis_host", type=str, help="redis地址")
        tornado.options.define("redis_port", type=int, help="redis端口")

        tornado.options.define("debug", type=bool, help="redis端口", default=debug)

        tornado.options.options.log_file_prefix = tornado.options.options.app_store + "/httpd.log"
        tornado.options.parse_config_file(utils.path("../../web.cfg"))


class Application(tornado.web.Application):
    def __init__(self, debug):
        import tornado.options
        from brahma import utils, widgets
        from brahma.views import PageNotFoundHandler

        routes = []

        for i in utils.list_mod("../views"):
            routes.extend(importlib.import_module("brahma.views." + i).handlers)

        for p in tornado.options.options.app_plugins:
            for i in utils.list_mod("../plugins/" + p + "/views"):
                routes.extend(importlib.import_module("brahma.plugins." + p + ".views." + i).handlers)

        routes.append((r".*", PageNotFoundHandler))

        settings = dict(
            ui_modules=widgets,
            template_path=utils.path("../../templates"),
            static_path=utils.path("../../statics"),
            login_url="/main",
            cookie_secret=tornado.options.options.http_secret,
            xsrf_cookies=True,
            debug=debug,
        )

        tornado.web.Application.__init__(self, routes, **settings)






