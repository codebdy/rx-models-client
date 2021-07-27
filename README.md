<p align="center">
  <a href="https://rxdrag.com/" target="blank"><img src="https://rxdrag.com/img/logo.png" width="200" alt="Nest Logo" /></a>
</p>

 
  <p align="center"><a href="https://rxdrag.com" target="_blank">rxModels</a> 是一个低代码后端服务，基于业务模型生成后端，提供通用查询JSON接口，本项目是前端部分</p>
    <p align="center">


演示地址：https://rxmodels-client.rxdrag.com/login

## 安装服务端
```console
#不用下面第一条命令，直接在Github网站上Download一个zip格式的代码包，然后解压也很方便

git clone https://github.com/rxdrag/rx-models.git

cd rx-models

npm install

npm run start:dev
```
在浏览器输入：http://localhost:3001/ ，看到熟悉的“Hello World!”，则说明已经成功运行了。

服务端使用了Sharp图形处理库来管理图片，这个库不设置代理，可能不容易安装成功，如果在`npm install`时没有成功，那么按照下面的命令，设置一下代理
```console
npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"

npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
```
设置完成以后再执行命令
```console
npm install

npm run start:dev
```

## 安装运行客户端
```console
#跟服务端一样，第一条命令可以通过下载并解压zip包代替

git clone https://github.com/rxdrag/rx-models-client.git

cd rx-models-client

npm install

npm run start
```
命令执行成功后，在浏览器输入：http://localhost:3001/install，显示只有两步的安装向导。在第一页输入MySql用到的数据库信息

![第一步](https://rxdrag.comhttps://rxdrag.com/img/tutorial/install1.jpg)

在第二页输入超级管理员账号账号密码。勾选“安装演示账号”选项，会添加一个用户名密码为demo/demo的演示账号，演示账号只有读权限没有写权限

![第二步](https://rxdrag.comhttps://rxdrag.com/img/tutorial/install2.jpg)

这步能够成功执行，那么rxModels就安装成功了，安装完成后会自动跳转到登录页面。

安装过程中有任何问题欢迎发issue或者联系作者。

# 业务实体模型

业务实体模型是基于ER图实现的，目前仅支持实体、关系、枚举三个特性。继承与实体嵌套计划在下一个版本中支持。

该模块主要是一些图形化的拖拽操作，用文字描述这样的操作，是一件枯燥的事情，阅读这样的文字也会相当无聊。

所以，关于如何操作，自己点点试试就好了。或许，出个操作视频是个比较不错的主意，不过要等作者有空的时候。

本文只是概要说一下其中的一些关键点。

## 包

一组实体、关系跟ER图的组合，包的概念只是给数据管理提供了方便，对数据库映射没有什么影响。

除了添加、修改删除包以及包内部所包含的实体、关系、ER图等常规操作，包还可以单独发布、导出、导入、导出模型接口类等。

### 发布
没有被发布的包，仅仅是数据库中的一条数据记录，不管怎么修改，保存多少次，都不会对系统的运行产生任何影响，更没法通过接口操作它实体的实例数据。

一旦包被发布，意味着它深度融入到我们系统里了，可以通过通用接口增、删、查、改它的数据了。

包的发布不能被撤销，除非您深度了解系统原理，到后端删除相应的发布文件。

这个文件的目录是：`\schemas`。一个包对应一个文件，文件名字是包的UUID，删除文件并重启后端，这个包就撤销发布了。但是这个包并没有因此被删除，您还可以再次发布它。

看起来相当麻烦吧？所以，请谨慎操作包的发布。

### 导出JSON
把一个整个包的内容，导出成一个JSON文件，并且这个文件还可以被其他人导入并使用。

### 导入包
就是把上面说的JSON文件，再次导入。但是重复导入不行，系统会提示错误。

### 导出模型接口类
利用IDE对TypeScript的类型识别，能够提高开发效率，减少调试Bug的时间。

导出这些接口类的目的，就是充分利用TypeScript的这个优势。

#### 导出文件样板

一个Entity，对应一个文件，以RxUser为例，它的代码是这个样子：
```typescript
import { RxRole } from './RxRole';
import { RxMedia } from './RxMedia';
import { RxMediaFolder } from './RxMediaFolder';

export const EntityRxUser = 'RxUser';

export interface RxUser {
  id?: number;
  name: string;
  loginName: string;
  email?: string;
  isSupper?: boolean;
  isDemo?: boolean;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  roles?: RxRole[];
  medias?: RxMedia[];
  mediaFolders?: RxMediaFolder[];
  avatar?: RxMedia;
}
```
创建一个新实例的时候，是没有ID的，所以id字段可以为空。其他字段，根据UI界面的设置，决定其是否可空。

如果一个字段被设置为`查询时隐藏`，那么这个字段不会出现在导出的接口文件中。

文件中还有一个常量 `EntityRxUser`，这个常量可以在操作数据时使用，避免了不容易排错的魔鬼字符串。

#### 接口使用样例
比如在React中，要查询所有的 RxUser实例，可以这样写代码：

```typescript
import { useMagicQuery, MagicQueryBuilder } from '@rxdrag/rxmodels-swr';
import { RxUser, EntityRxUser } from 'entity-interface/RxUser';

...
export function AReactComponent(){
  const {data, loading, error} = useMagicQuery<RxUser[]>(
    new MagicQueryBuilder().setEntity(EntityRxUser)
  )
}
...

```

## 实体

实体分为普通实体跟枚举两种，普通实体会映射到数据库，生成一个数据库表格。

枚举更像npm的开发时依赖，只是为了代码可读性更强，对数据库没什么影响，枚举类型的字段映射到数据库，就是一个string类型的字段。

图形界面编辑枚举值目前比较简陋，只能输入JSON字符串，后面的版本应该会优化。

### 隐藏与删除

* 删除：工具条上的删除按钮，树形列表里实体节点上的鼠标悬停时也有删除按钮，点击这两处删除，会把实体真的删除掉，包括跟实体有关的的关系也会被一并删除。
* 隐藏：在ER图里，鼠标悬停时，会显示一个隐藏实体的按钮，点击这个按钮只是把这个实体从当前ER图中移除，这个实体还是存在的，并没有被真正删除。

## 字段

字段目前支持如下类型：
* `Number`: 数字
* `Boolean`: 布尔
* `String`: 字符串
* `Date`: 日期
* `SimpleJson`: JSON数据，在接口中表现为 any
* `SimpleArray`: 数组，在接口中表现为any[]
* `Enum`: 枚举

若需要其它类型支持，发issue吧，后续版本加上。

## 关系

在数据库层，关系是被映射为外键的，在UI层，把关系放在跟实体并列的地位。

关系也归属与某个包，具体的归属规则是这样的：

* 1对1关系跟多对多关系，通过拥有者指定，关系跟拥有者一个包
* 1对多跟多对1关系中，关系归属于多头方

导出的时候，关系会随所归属的包被导出。

### 1对1

![1对1](https://rxdrag.com/img/tutorial/one-one.png)

假如一个用户只能对应一个 RxMedia 作为头像，一个 RxMedia 只能作为一个用户的头像，那么这就是个一对一的关系。

RxUser 拥有这个关系，那么映射到数据库，在 `rx_user` 表中会有一个字段 `avatarId` 对应 RxMedia 的 id。

对应到TypeORM层，相当于在 RxUser 实体的 `avatar` 字段添加 `JoinColumn`。

#### 接口代码

```typescript title="entity-interface/RxMedia"
import { RxUser } from './RxUser';

export const EntityRxMedia = 'RxMedia';

export interface RxMedia {
  id?: number;
  ...
  avatarOfUser?: RxUser;
  ...
}

```

```typescript title="entity-interface/RxUser"
import { RxMedia } from './RxMedia';

export const EntityRxUser = 'RxUser';

export interface RxUser {
  ...
  avatar?: RxMedia;
  ...
}

```

### 1对多
为了演示这个关系，新建了一个包 Blog，新建的实体 Post 跟ER图位于 Blog 包。

![1对1](https://rxdrag.com/img/tutorial/one-many.png)

1对多关系的拥有者是多方，post 的 author 关系不会影响系统包，可以利用这个特性仔细设计您的包依赖。

#### 接口代码

```typescript title="entity-interface/Post"
import { RxUser } from './RxUser';

export const EntityPost = 'Post';

export interface Post {
  id?: number;
  ...
  author?: RxUser;
  ...
}
```
如果重新导出系统包，那么RxUser的代码也会被更新，但是这个关系对系统包来说并不重要，您可以不用关注。

### 多对1

就是1对多关系的反向，添加这个关系只是为了使用方便，没有什么本质区别。

### 多对多
多对多关系中，要留意关系的拥有者是谁，这涉及到包之间的依赖关系。

这个例子中 Blog 包依赖于 System 包，就让Post拥有这个关系。相当于在 TypeORM 代码里， 给 Post的 `medias` 字段添加了 `JoinTable`。

如果项目不大，忽略这些细节，也不会影响您的使用。

![1对1](https://rxdrag.com/img/tutorial/many-many.png)

#### 接口代码

```typescript title="entity-interface/Post"
export interface Post {
  id?: number;
  ...
  medias?: RxMedia[];
  ...
}
```
对于这个例子，同样可以不关注对 RxMedia 接口的影响。

#### 多对多关系的附加信息
如果真的要做一个 Blog 项目，对 SEO 友好是最基本的要求，这就需要为每一个 Post 关联的图片添加 alt 文本。

记得 larvel 中可以使用 povit 属性，TypeORM并不提供这样的支持。可以再添加一个PostMediaPovit实体，把一个多对多关系，转化成两个1对多关系来解决这个问题。

![1对1](https://rxdrag.com/img/tutorial/many-many-povit.png)

#### 接口代码

```typescript title="entity-interface/Post"
import { PostMediaPovit } from './PostMediaPovit';
import { RxUser } from './RxUser';

export const EntityPost = 'Post';

export interface Post {
  id?: number;
  ...
  author?: RxUser;
  mediaPovits?: PostMediaPovit[];
  ...
}

```

```typescript title="entity-interface/PostMediaPovit"
import { Post } from './Post';
import { RxMedia } from './RxMedia';

export const EntityPostMediaPovit = 'PostMediaPovit';

export interface PostMediaPovit {
  id?: number;
  altText: string;
  belongsToPost?: Post;
  media?: RxMedia;
}

```

## 文档

[rxModels文档](https://rxdrag.com/docs/rx-models/install)

## Stay in touch

- Author - 悠闲的水
- Website - [https://rxdrag.com](https://rxdrag.com/)

## License

  rxModels is MIT licensed