# 开发记录

## 2020/12/11

重新复习了一下JPA的用法，搭了个简单的Spring Boot项目。
遇到的问题：
- 跨域问题

## 2020/12/15
在后端进行了配置，解决了跨域的问题。
遇到了新问题：

- 在用户已经登录后，访问其他接口时，Spring Security依然告诉我未登录。

初步判定是请求的header问题，或者是后端Security的配置问题。

## 2020/12/19

经过了两天两页的Google折磨，仍然解决不了Security的问题，因此放弃Security，自己配一个破烂版的登录控制。

## 2020/12/20 深夜

我基本初步摸索出了之前的问题所在，其实是因为**跨域访问导致session丢失**，只要用nginx做反向代理后，Spring Security依然可以完美使用。**但我已经放弃它了**，所以我依然不使用。

我基本写完了我所设想的功能，功能如下：

- [x] 用户的登录和注册
- [x] 用户可以通过演出时间、演出名称以及演出类型来检索门票
- [x] 用户可以查看门票详情，并购买，用户一次只能购买一张票。同一张可以多买几次
- [x] 用户可以查看自己的订单，并且退票

你会发现，这也许和我们一开始设想的功能相比，简单了亿点。事实确实是这样，因为我真的好累。。

## 2021/01/03-04 

新增Julia后端（Genie.jl框架）

由于需要预编译，前几次操作可能会很慢

运行方式为：

- 启动`backend-jl/bin/repl`

- ```
  julia> using SearchLight
  
  julia> SearchLight.Migrations.all_up!!() #迁移数据表
  
  julia> up(8080) #在8080端口运行服务
  ```

- ```shell
  mysql < spider/data2.sql #插入数据
  ```

- 至此，服务启动成功

将这些操作替代下边的后端部分，就可以用Julia做后端了

## 2021/01/10

增加详情页中的评论功能，但只写了用Julia后端做了实现，因此spring后端无法显示和创建评论。



# 如何在你的本机上运行这个web服务？

## 后端部分

**`db`文件夹中的是后端代码。**

后端使用了Spring Boot，因此你需要：

1. MySQL 5.7 **注意，我用的JPA不支持MySQL8.0**
2. Redis 需要配置一个密码，我默认放在了6379端口，如果你更改了端口，你需要更改`application.properties`文件中的`redis.port`
3. Java环境，我用的是jdk8.0

当你都配置好以上内容后，查看后端`resources`文件夹中的`application.properties`文件

```yaml
...
spring.datasource.url=jdbc:mysql://localhost:3306/dbTicket?
...
spring.datasource.username=root
spring.datasource.password=123456
...
spring.redis.port=6379
spring.redis.password=123456
...
```

以上的一些信息需要你根据自己本机环境更改数据。更改之后runApplication就可以启动后端了。

## 前端

**`ticket`文件夹中的是前端代码。**

传统的前后端分离是一定会产生跨域问题的，我为此折腾了将近一个礼拜，我现在找到了一个一劳永逸的方法，就是使用nginx。

首先pull前端代码，前端是用npm包管理的，运行命令：`npm run build`，你会发现目录下多了一个`build`文件夹。

把`build`文件夹下所有文件拷贝到你的nginx的html目录，并在`nginx.conf`中增加一条代理：

```yaml
...
http {
	...
	...
	server {
        listen       你喜欢的端口;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html目录;
            try_files $uri /index.html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
        
        location /api/ {          # /api 代理到下面 地址  就是修改成你后台的uri
            proxy_pass http://localhost:后端的端口/;
        }
        
    }
}
```

一般，Spring Boot 的默认端口为8080。

配置好之后保存，重新启动一下nginx，就可以愉快的访问网页了。