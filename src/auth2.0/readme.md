OAuth： OAuth（开放授权）是一个开放标准，允许用户授权第三方网站访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方网站或分享他们数据的所有内容。

对于用户相关的OpenAPI（例如获取用户信息等），为了保护用户数据的安全和隐私，第三方网站访问用户数据前都需要显式的向用户征求授权。

```
+--------+                               +---------------+
|        |--(A)- Authorization Request ->|   Resource    |
|        |                               |     Owner     |
|        |<-(B)-- Authorization Grant ---|               |
|        |                               +---------------+
|        |
|        |                               +---------------+
|        |--(C)-- Authorization Grant -->| Authorization |
| Client |                               |     Server    |
|        |<-(D)----- Access Token -------|               |
|        |                               +---------------+
|        |
|        |                               +---------------+
|        |--(E)----- Access Token ------>|    Resource   |
|        |                               |     Server    |
|        |<-(F)--- Protected Resource ---|               |
+--------+                               +---------------+

```

简化模式（implicit grant type）不通过第三方应用程序的服务器，直接在浏览器中向认证服务器申请令牌，跳过了"授权码"这个步骤


![RUNOOB 图标](https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/OAuth_guide_V2_1.png)


1 第一步：用户同意授权，获取code

2 第二步：通过code换取网页授权access_token 返回refresh_token

3 第三步：刷新access_token（如果需要）

4 第四步：拉取用户信息(需scope为 snsapi_userinfo)

5 附：检验授权凭证（access_token）是否有效


https://ihealth-test.zhongan.com/policy/authorize?appid=12345&redirect_uri=https://baidu.com&channelCode=c20208620580001