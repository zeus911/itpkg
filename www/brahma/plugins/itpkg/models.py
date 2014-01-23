__author__ = 'zhengjitang@gmail.com'

import datetime

from sqlalchemy import Column, Integer, String, DateTime, Text, Sequence, Boolean, Time

from brahma.models import Base


class Router(Base):
    __tablename__ = "itpkg_routers"
    id = Column(Integer, Sequence('itpkg_router_id_seq'), primary_key=True)
    name = Column(String(255), nullable=False)
    wan = Column(String(512), nullable=False)
    lan = Column(String(512))
    ping = Column(Boolean, nullable=False, default=True)
    manager = Column(Integer, nullable=False)
    details = Column(Text)
    version = Column(Integer, nullable=False)
    state = Column(String(8), nullable=False, default="SUBMIT")
    created = Column(DateTime, nullable=False, default=datetime.datetime.now())

    def __init__(self, name, wan, details):
        self.name = name
        self.wan = wan
        self.details = details


class Input(Base):
    __tablename__ = "itpkg_input"
    id = Column(Integer, Sequence('itpkg_input_id_seq'), primary_key=True)
    port = Column(Integer, nullable=False)
    tcp = Column(Boolean, nullable=False)
    router = Column(Integer, nullable=False)

    def __init__(self, router, port, tcp):
        self.router = router
        self.port = port
        self.tcp = tcp


class Output(Base):
    __tablename__ = "itpkg_output"
    id = Column(Integer, Sequence('itpkg_output_id_seq'), primary_key=True)
    name = Column(String(255), nullable=False)
    flag = Column(String(8))
    keyword = Column(String(255))
    begin = Column(Time, nullable=False, default=datetime.time())
    end = Column(Time, nullable=False, default=datetime.time(23, 59, 59))
    mon = Column(Boolean, nullable=False, default=True)
    tue = Column(Boolean, nullable=False, default=True)
    wed = Column(Boolean, nullable=False, default=True)
    thu = Column(Boolean, nullable=False, default=True)
    fri = Column(Boolean, nullable=False, default=True)
    sat = Column(Boolean, nullable=False, default=True)
    sun = Column(Boolean, nullable=False, default=True)
    router = Column(Integer, nullable=False)

    def __init__(self, name, flag, keyword):
        self.name = name
        self.flag = flag
        self.keyword = keyword


class Nat(Base):
    __tablename__ = "itpkg_nat"
    id = Column(Integer, Sequence('itpkg_nat_id_seq'), primary_key=True)
    name = Column(String(255), nullable=False)
    sport = Column(Integer, nullable=False)
    dport = Column(Integer, nullable=False)
    tcp = Column(Boolean, nullable=False)
    router = Column(Integer, nullable=False)

    def __init__(self, name, sport, dport, tcp):
        self.name = name
        self.sport = sport
        self.dport = dport
        self.tcp = tcp


class RouterDevice(Base):
    __tablename__ = "itpkg_router_device"
    id = Column(Integer, Sequence('itpkg_router_device_id_seq'), primary_key=True)
    router = Column(Integer, nullable=False)
    device = Column(Integer, nullable=False)
    def __init__(self, router, device):
        self.router = router
        self.device = device


class Device(Base):
    __tablename__ = "itpkg_devices"
    mac = Column(String(18), Sequence('itpkg_device_id_seq'), primary_key=True)
    name = Column(String(255))
    ip = Column(Integer, nullable=False)
    fix = Column(Boolean, nullable=False)
    state = Column(String(8), nullable=False, default="SUBMIT")
    user = Column(Integer)
    details = Column(Text)
    version = Column(Integer, nullable=False)
    created = Column(DateTime, nullable=False, default=datetime.datetime.now())

    def __init__(self, mac, name, ip):
        self.mac = mac
        self.name = name
        self.ip = ip


class Group(Base):
    __tablename__ = "itpkg_groups"
    id = Column(Integer, Sequence('itpkg_group_id_seq'), primary_key=True)
    name = Column(String(255))

    details = Column(Text)
    state = Column(String(8), nullable=False, default="SUBMIT")
    version = Column(Integer, nullable=False)
    created = Column(DateTime, nullable=False, default=datetime.datetime.now())

    def __init__(self, router, name, details):
        self.router = router
        self.name = name
        self.details = details


class User(Base):
    __tablename__ = "itpkg_users"
    id = Column(Integer, Sequence('itpkg_user_id_seq'), primary_key=True)
    name = Column(String(255))
    details = Column(Text)
    state = Column(String(8), nullable=False, default="SUBMIT")
    created = Column(DateTime, nullable=False, default=datetime.datetime.now())

    def __init__(self, name, details):
        self.name = name
        self.details = details


class GroupUser(Base):
    __tablename__ = "itpkg_group_user"
    id = Column(Integer, Sequence('itpkg_group_user_id_seq'), primary_key=True)
    group = Column(Integer, nullable=False)
    user = Column(Integer, nullable=False)
    router = Column(Integer, nullable=False)

    def __init__(self, router, group, user):
        self.router = router
        self.user = user
        self.group = group


class Limit(Base):
    __tablename__ = "itpkg_limits"
    id = Column(Integer, Sequence('itpkg_limit_id_seq'), primary_key=True)
    name = Column(String(255), nullable=False)
    upMax = Column(Integer, nullable=False)
    downMax = Column(Integer, nullable=False)
    upMin = Column(Integer, nullable=False)
    downMin = Column(Integer, nullable=False)
    begin = Column(Time, nullable=False, default=datetime.time())
    end = Column(Time, nullable=False, default=datetime.time(23, 59, 59))
    mon = Column(Boolean, nullable=False, default=True)
    tue = Column(Boolean, nullable=False, default=True)
    wed = Column(Boolean, nullable=False, default=True)
    thu = Column(Boolean, nullable=False, default=True)
    fri = Column(Boolean, nullable=False, default=True)
    sat = Column(Boolean, nullable=False, default=True)
    sun = Column(Boolean, nullable=False, default=True)
    version = Column(Integer, nullable=False)
    created = Column(DateTime, nullable=False, default=datetime.datetime.now())

    def __init__(self, name, upMax, downMax, upMin, downMin):
        self.name = name
        self.upMax = upMax
        self.upMin = upMin
        self.downMax = downMax
        self.downMin = downMin





