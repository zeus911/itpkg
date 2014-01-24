__author__ = 'zhengjitang@gmail.com'

import datetime

import tornado.web

from brahma.views import BaseHandler
from brahma.web import Message
from brahma.forms.personal import ContactForm, SetPwdForm
from brahma.store.site import LogDao, UserDao


class InfoHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self, act):
        if act == "logs":
            self.render_list_widget("日志列表", items=["[%s] %s： %s" % (l.flag, l.created.isoformat(), l.message) for l in
                                                   LogDao.list_log(datetime.datetime.min, datetime.datetime.max,
                                                                   user=self.current_user['id'], limit=20)])
        elif act == "setPwd":
            form = SetPwdForm("setPwd", "修改密码", "/personal/self/setPwd")
            self.render_form_widget(form=form)
        elif act == "contact":
            form = ContactForm("contact", "联系信息", "/personal/self/contact")
            user = UserDao.get_by_id(self.current_user['id'])
            if user.contact:
                import json

                form.from_dict(json.loads(user.contact))
            form.username.data = user.username
            form.logo.data = user.logo
            self.render_form_widget(form=form)
        elif act == "attach":
            import os
            import brahma.utils

            path = brahma.utils.path("../../statics/tmp/attach")
            if not self.is_admin():
                path = "%s/u%d" % (path, self.current_user['id'])

            items = list()
            l = len(path)
            for root, dirs, files in os.walk(path, True):
                for name in files:
                    items.append("%s/%s" % (root[l:], name))

            self.render("personal/self/attach.html", items=items,
                        uid=None if self.is_admin() else self.current_user['id'])

        elif act == "ssh":
            self.render("personal/self/ssh.html", ssh=None)
        else:
            pass

    @tornado.web.authenticated
    def post(self, act):
        messages = []
        if act == "setPwd":

            fm = SetPwdForm(formdata=self.request.arguments)
            if fm.validate():
                uid = self.current_user['id']
                u = UserDao.get_by_id(uid)
                if u.check(fm.oldPassword.data):
                    UserDao.set_password(uid, fm.password.data)
                    LogDao.add_log("修改密码", user=uid)
                    self.render_message_widget(Message(ok=True))
                    return
                else:
                    messages.append("旧密码输入有误")
            else:
                messages.extend(fm.messages())
        elif act == "contact":
            fm = ContactForm(formdata=self.request.arguments)
            if fm.validate():
                UserDao.set_info(self.current_user['id'], fm.username.data, fm.logo.data,
                                 fm.to_dict(
                                     ["qq", "email", "website", "wechat", "weibo", "address", "fax", "tel", "details"]))
                self.render_message_widget(Message(ok=True))
                return
            else:
                messages.extend(fm.messages())
        elif act == "ssh":
            from brahma.env import ssh

            flag = self.get_argument("act")
            ok = False
            data = []

            if flag == "login":
                host = self.get_argument("host")
                password = self.get_argument("password")

                try:
                    i1 = host.index("@")
                except ValueError:
                    i1 = None

                try:
                    i2 = host.index(":")
                except ValueError:
                    i2 = None

                if i1:
                    user = host[0:i1]
                    if i2:
                        port = host[i2 + 1:]
                        host = host[i1 + 1:i2]
                    else:
                        port = 22
                        host = host[i1 + 1:]
                else:
                    user = "root"
                    if i2:
                        port = host[i2 + 1:]
                        host = host[0:i2]
                    else:
                        port = 22
                data.append("%s@%s:%s" % (user, host, port))
                sid = ssh.login(host, user, password, port)
                if sid:
                    self.set_secure_cookie("ssh", sid, expires_days=1)
                    ok = True
                    data.append("成功登录")
                else:
                    data.append("登录失败")

            elif flag == "logout":
                sid = self.get_secure_cookie("ssh").decode()
                ssh.logout(sid)
                self.clear_cookie("ssh")
                data.append("成功注销登录")
                ok = True
            elif flag == "run":
                command = self.get_argument("command")
                sid = self.get_secure_cookie("ssh").decode()
                data.extend(ssh.execute(sid, command))
                ok = True
            else:
                data.append("未知操作")
            self.write({"ok": ok, "data": data})
            return
        else:
            messages.append("未知操作")

        self.render_message_widget(Message(messages=messages))

    @tornado.web.authenticated
    def delete(self, attach):
        if attach.startswith("attach/"):
            attach = attach[7:]
            import os, logging
            import brahma.utils

            logging.debug("用户[%s]请求删除[%s]" % (self.current_user["id"], attach))
            d = "../../statics/tmp/attach"
            if self.is_admin():
                tmp = brahma.utils.path(d)
                attach = brahma.utils.path("%s/%s" % (d, attach))
            else:
                d = "%s/u%d" % (d, self.current_user['id'])
                tmp = brahma.utils.path(d)
                attach = brahma.utils.path("%s/%s" % (d, attach))

            if attach.startswith(tmp):
                os.remove(attach)
                self.render_message_widget(Message(ok=True))
            else:
                self.render_message_widget(Message(messages=["你大爷的!"]))


class SelfHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render_ctlbar_widget(act="/personal/self",
                                  items=[
                                      ("ssh", "SSH工具"),
                                      ("attach", "附件管理"),
                                      ("contact", "联系信息"),
                                      ("setPwd", "修改密码"),
                                      ("logs", "日志列表"),
                                  ])


handlers = [
    (r"/personal/self", SelfHandler),
    (r"/personal/self/(.*)", InfoHandler),
]
