__author__ = 'zhengjitang@gmail.com'

import tornado.web

from brahma.views import BaseHandler


class MainHandler(BaseHandler):
    def get(self):
        self.render_page("main.html", title="主页")


class SearchHandler(BaseHandler):
    def post(self):
        import tornado.options, importlib

        keyword = self.get_argument("keyword")
        items = list()
        for p in tornado.options.options.app_plugins:
            items.extend(importlib.import_module("brahma.plugins." + p).search(keyword))
        self.render_page("search.html", title="搜索[%s]" % keyword, keyword=keyword, items=[])


class HelpHandler(BaseHandler):
    def get(self):
        from brahma.cache import get_site_info

        self.render_page("template.html", index="/help", title="帮助文档", content=get_site_info("help"))


class AboutMeHandler(BaseHandler):
    def get(self):
        from brahma.cache import get_site_info

        self.render_page("template.html", index="/aboutMe", title="关于我们", content=get_site_info("aboutMe"))


class CalendarHandler(BaseHandler):
    def get(self, year, month, day=None):
        year = int(year)
        month = int(month)
        day = int(day) if day else None

        import tornado.options, importlib

        items = list()
        for p in tornado.options.options.app_plugins:
            items.extend(importlib.import_module("brahma.plugins." + p).calendar(year, month, day))

        self.render_page(
            "calendar.html",
            title="%04d年%02d月%02d日" % (year, month, day) if day else "%04d年%02d月" % (year, month),
            items=items)


handlers = [
    (r"/", tornado.web.RedirectHandler, dict(url="/main")),
    (r"/main", MainHandler),
    (r"/search", SearchHandler),
    (r"/aboutMe", AboutMeHandler),
    (r"/help", HelpHandler),
    (r"/calendar/([0-9]+)/([0-9]+)", CalendarHandler),
    (r"/calendar/([0-9]+)/([0-9]+)/([0-9]+)", CalendarHandler)
]