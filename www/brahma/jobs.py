__author__ = 'zhengjitang@gmail.com'


class TaskSender:
    @staticmethod
    def send_email(to, title, body, html=True):
        from brahma.env import redis
        import logging

        logging.debug("邮件任务%s" % to)
        redis.lpush("tasks", ("email", (to, title, body, html)))