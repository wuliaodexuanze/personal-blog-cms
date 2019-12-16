* [手里有糖个人博客CMS简介](#%E6%89%8B%E9%87%8C%E6%9C%89%E7%B3%96%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2c
ms%E7%AE%80%E4%BB%8B)
  * [线上Dome](#%E7%BA%BF%E4%B8%8Adome)
  * [环境](#%E7%8E%AF%E5%A2%83)
  * [获取项目工程](#%E8%8E%B7%E5%8F%96%E9%A1%B9%E7%9B%AE%E5%B7%A5%E7%A8%8B)
  * [安装依赖包](#%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96%E5%8C%85)
  * [启动项目](#%E5%90%AF%E5%8A%A8%E9%A1%B9%E7%9B%AE)
  * [完成登录](#%E5%AE%8C%E6%88%90%E7%99%BB%E5%BD%95)
  * [参考文档](#%E5%8F%82%E8%80%83%E6%96%87%E6%A1%A3)

## 手里有糖个人博客CMS简介
后台开发是基于 [lin-cms-vue](https://github.com/TaleLin/lin-cms-vue) ,非常感谢！
在原有的基础上进行开发，扩展。

### 线上Dome
[手里有糖个人博客CMS](http://sugar.whgjh.top)

### 环境
- 安装 `Node.js（version：8.11.0+）`
- 确保 `npm` 或者 `yarn` 可用

### 获取项目工程
```javascript
git clone https://github.com/wuliaodexuanze/personal-blog-cms.git
```
### 安装依赖包
```javascript
cd personal-blog-cms && npm install
```
### 启动项目
```javascript
npm run serve
```
> 每个人的 `node` 开发版本不尽相同，可能会遇到 `Node Sass` 兼容性问题，请尝试下面的命令（报错与`node-sass`相关）：

```javascript
npm rebuild node-sass
```
### 完成登录
1、配置 api 地址： 打开配置文件 src/config/index.js 配置 baseUrl ，本地开发阶段配置本地虚拟域名(http://localhost:5000/)，线上部署生产域名。
> 1、开发域名修改位置（目录下 `.env.development`）
> 2、线上修改域名位置（目录下 `.env.production`）

2、通过管理员账号密码登录，账号密码是通过 [手里有糖个人博客后端](https://github.com/wuliaodexuanze/personal-blog-server-koa) 中的脚本创建

到此，通过脚手架内置的 webpack 本地服务，访问http://localhost:8080，将打开 CMS 的登录页面，如果一切正常，你将通过账号密码成功登陆。

### 参考文档
[cms前端文档](http://doc.cms.7yue.pro/lin/start/koa/vue-client.html)
