# 类的种类
Entity 带有系统内唯一id，Entity又可以分为普通的跟service类型，service出现于graphql的根节点，综合考虑 Aggregate root
Value Object 传值用，没有id，不持久化。也可存于JSON类型。Value object不能有关联
Abstract 不持久化，通过继承共享属性，分为service类型跟不同的，service映射为graphql的接口
Enum 枚举

一个微服务是不是可以算一个boundary内的aggregate?

只有root实体，才有根查询接口，其它实体只能通过关联来发现。非root对象，不能被边界外对象引用