# Generated by the protocol buffer compiler.  DO NOT EDIT!

from google.protobuf import descriptor
from google.protobuf import message
from google.protobuf import reflection
from google.protobuf import descriptor_pb2
# @@protoc_insertion_point(imports)



DESCRIPTOR = descriptor.FileDescriptor(
  name='protocols.proto',
  package='protocols',
  serialized_pb='\n\x0fprotocols.proto\x12\tprotocols\"\xfd\x02\n\x07Request\x12%\n\x04type\x18\x01 \x02(\x0e\x32\x17.protocols.Request.Type\x12\r\n\x02id\x18\x02 \x02(\x05:\x01\x30\x12\x0f\n\x04size\x18\x03 \x02(\x05:\x01\x31\x12\x0c\n\x04\x64\x61ta\x18\x04 \x03(\t\"\x9c\x02\n\x04Type\x12\x0c\n\x08\x41RP_SCAN\x10\x11\x12\x0c\n\x08\x41RP_SYNC\x10\x12\x12\x0e\n\nARP_STATUS\x10\x13\x12\x10\n\x0c\x44HCPD_STATUS\x10!\x12\x0f\n\x0b\x44HCPD_START\x10\"\x12\x0e\n\nDHCPD_STOP\x10#\x12\x0e\n\nDHCPD_SAVE\x10$\x12\x10\n\x0cNAMED_STATUS\x10\x31\x12\x0f\n\x0bNAMED_START\x10\x32\x12\x0e\n\nNAMED_STOP\x10\x33\x12\x0e\n\nNAMED_SAVE\x10\x34\x12\r\n\tFF_STATUS\x10\x61\x12\x0c\n\x08\x46\x46_APPLY\x10\x62\x12\x0c\n\x08\x46\x46_CLEAR\x10\x63\x12\r\n\tTC_STATUS\x10Q\x12\x0c\n\x08TC_APPLY\x10R\x12\x0c\n\x08TC_CLEAR\x10S\x12\x0c\n\x07UNKNOWN\x10\xff\x01\"\x9c\x01\n\x08Response\x12&\n\x04type\x18\x01 \x02(\x0e\x32\x18.protocols.Response.Type\x12\n\n\x02id\x18\x02 \x02(\x05\x12\x0c\n\x04size\x18\x03 \x02(\x05\x12\x0c\n\x04\x64\x61ta\x18\x04 \x03(\t\"@\n\x04Type\x12\x0c\n\x07SUCCESS\x10\xfc\x01\x12\x08\n\x04\x46\x41IL\x10\x01\x12\x0f\n\x0b\x42\x41\x44_PACKAGE\x10\x02\x12\x0f\n\x0b\x42\x41\x44_REQUEST\x10\x03')



_REQUEST_TYPE = descriptor.EnumDescriptor(
  name='Type',
  full_name='protocols.Request.Type',
  filename=None,
  file=DESCRIPTOR,
  values=[
    descriptor.EnumValueDescriptor(
      name='ARP_SCAN', index=0, number=17,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='ARP_SYNC', index=1, number=18,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='ARP_STATUS', index=2, number=19,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='DHCPD_STATUS', index=3, number=33,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='DHCPD_START', index=4, number=34,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='DHCPD_STOP', index=5, number=35,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='DHCPD_SAVE', index=6, number=36,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='NAMED_STATUS', index=7, number=49,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='NAMED_START', index=8, number=50,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='NAMED_STOP', index=9, number=51,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='NAMED_SAVE', index=10, number=52,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='FF_STATUS', index=11, number=97,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='FF_APPLY', index=12, number=98,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='FF_CLEAR', index=13, number=99,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='TC_STATUS', index=14, number=81,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='TC_APPLY', index=15, number=82,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='TC_CLEAR', index=16, number=83,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='UNKNOWN', index=17, number=255,
      options=None,
      type=None),
  ],
  containing_type=None,
  options=None,
  serialized_start=128,
  serialized_end=412,
)

_RESPONSE_TYPE = descriptor.EnumDescriptor(
  name='Type',
  full_name='protocols.Response.Type',
  filename=None,
  file=DESCRIPTOR,
  values=[
    descriptor.EnumValueDescriptor(
      name='SUCCESS', index=0, number=252,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='FAIL', index=1, number=1,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='BAD_PACKAGE', index=2, number=2,
      options=None,
      type=None),
    descriptor.EnumValueDescriptor(
      name='BAD_REQUEST', index=3, number=3,
      options=None,
      type=None),
  ],
  containing_type=None,
  options=None,
  serialized_start=507,
  serialized_end=571,
)


_REQUEST = descriptor.Descriptor(
  name='Request',
  full_name='protocols.Request',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    descriptor.FieldDescriptor(
      name='type', full_name='protocols.Request.type', index=0,
      number=1, type=14, cpp_type=8, label=2,
      has_default_value=False, default_value=17,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    descriptor.FieldDescriptor(
      name='id', full_name='protocols.Request.id', index=1,
      number=2, type=5, cpp_type=1, label=2,
      has_default_value=True, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    descriptor.FieldDescriptor(
      name='size', full_name='protocols.Request.size', index=2,
      number=3, type=5, cpp_type=1, label=2,
      has_default_value=True, default_value=1,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    descriptor.FieldDescriptor(
      name='data', full_name='protocols.Request.data', index=3,
      number=4, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
    _REQUEST_TYPE,
  ],
  options=None,
  is_extendable=False,
  extension_ranges=[],
  serialized_start=31,
  serialized_end=412,
)


_RESPONSE = descriptor.Descriptor(
  name='Response',
  full_name='protocols.Response',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    descriptor.FieldDescriptor(
      name='type', full_name='protocols.Response.type', index=0,
      number=1, type=14, cpp_type=8, label=2,
      has_default_value=False, default_value=252,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    descriptor.FieldDescriptor(
      name='id', full_name='protocols.Response.id', index=1,
      number=2, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    descriptor.FieldDescriptor(
      name='size', full_name='protocols.Response.size', index=2,
      number=3, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    descriptor.FieldDescriptor(
      name='data', full_name='protocols.Response.data', index=3,
      number=4, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
    _RESPONSE_TYPE,
  ],
  options=None,
  is_extendable=False,
  extension_ranges=[],
  serialized_start=415,
  serialized_end=571,
)

_REQUEST.fields_by_name['type'].enum_type = _REQUEST_TYPE
_REQUEST_TYPE.containing_type = _REQUEST;
_RESPONSE.fields_by_name['type'].enum_type = _RESPONSE_TYPE
_RESPONSE_TYPE.containing_type = _RESPONSE;
DESCRIPTOR.message_types_by_name['Request'] = _REQUEST
DESCRIPTOR.message_types_by_name['Response'] = _RESPONSE

class Request(message.Message):
  __metaclass__ = reflection.GeneratedProtocolMessageType
  DESCRIPTOR = _REQUEST
  
  # @@protoc_insertion_point(class_scope:protocols.Request)

class Response(message.Message):
  __metaclass__ = reflection.GeneratedProtocolMessageType
  DESCRIPTOR = _RESPONSE
  
  # @@protoc_insertion_point(class_scope:protocols.Response)

# @@protoc_insertion_point(module_scope)
