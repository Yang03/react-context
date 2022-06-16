### CAS (Central Authentication Service)

1. 访问https://hic.zhonganonline.com/console/model 首先判断是否登录，如果没有就(服务端)重定向到认证中心 https://sso.a.com/login


浏览器将Cookie中的TGC携带到服务器，服务器根据这个TGC，查找与之对应的TGT。从而判断用户是否登录过了，是否需要展示登录页面。TGT与TGC的关系就像SESSION与Cookie中SESSIONID的关系。

TGT：Ticket Granted Ticket（俗称大令牌，或者说票根，他可以签发ST）

TGC：Ticket Granted Cookie（cookie中的value），存在Cookie中，根据他可以找到TGT。

ST：Service Ticket （小令牌），是TGT生成的，默认是用一次就生效了。也就是上面数字3处的ticket值。 callback 里面的ticket



target http://hic.zhonganonline.com/nsso/callback?returnURL=L2NvbnNvbGUvbW9kZWw%3D'

2. 在认证中心输入用户名和密码



用户访问产品 a，域名是 www.a.cn。由于用户没有携带在 a 服务器上登录的 a cookie，所以 a 服务器返回 http 重定向，重定向的 url 是 SSO 服务器的地址，同时 url 的 query 中通过参数指明登录成功后，回跳到 a 页面。重定向的url 形如 sso.dxy.cn/login?service=https%3A%2F%2Fwww.a.cn。由于用户没有携带在 SSO 服务器上登录的 TGC（看上面，票据之一），所以 SSO 服务器判断用户未登录，给用户显示统一登录界面。用户在 SSO 的页面上进行登录操作。登录成功后，SSO 服务器构建用户在 SSO 登录的 TGT（又一个票据），同时返回一个 http 重定向。这里注意：重定向地址为之前写在 query 里的 a 页面。重定向地址的 query 中包含 sso 服务器派发的 ST。重定向的 http response 中包含写 cookie 的 header。这个 cookie 代表用户在 SSO 中的登录状态，它的值就是 TGC。浏览器重定向到产品 a。此时重定向的 url 中携带着 SSO 服务器生成的 ST。根据 ST，a 服务器向 SSO 服务器发送请求，SSO 服务器验证票据的有效性。验证成功后，a 服务器知道用户已经在 sso 登录了，于是 a 服务器构建用户登录 session，记为 a session。并将 cookie 写入浏览器。注意，此处的 cookie 和 session 保存的是用户在 a 服务器的登录状态，和 CAS 无关。之后用户访问产品 b，域名是 www.b.cn。 由于用户没有携带在 b 服务器上登录的 b cookie，所以 b 服务器返回 http 重定向，重定向的 url 是 SSO 服务器的地址，去询问用户在 SSO 中的登录状态。浏览器重定向到 SSO。注意，第 4 步中已经向浏览器写入了携带 TGC 的cookie，所以此时 SSO 服务器可以拿到，根据 TGC 去查找 TGT，如果找到，就判断用户已经在 sso 登录过了。SSO 服务器返回一个重定向，重定向携带 ST。注意，这里的 ST 和第4步中的 ST 是不一样的，事实上，每次生成的 ST 都是不一样的。浏览器带 ST 重定向到 b 服务器，和第 5 步一样。b 服务器根据票据向 SSO 服务器发送请求，票据验证通过后，b 服务器知道用户已经在 sso 登录了，于是生成 b session，向浏览器写入 b cookie。



其主要责任是通过发行和验证门票来验证用户并授予对CAS启用服务（通常称为CAS客户端）的访问权限。当服务器成功登录后向用户发出票务票证（TGT）时，将创建SSO会话。使用TGT作为令牌，通过浏览器重定向将服务票（ST）通过用户的请求发出服务。随后通过后通道通信在CAS服务器上验证了ST


用户向系统1发起注销请求
系统1根据用户与系统1建立的会话id拿到令牌，向SSO认证中心发起注销请求
SSO认证中心校验令牌有效，销毁全局会话，同时取出所有用此令牌注册的系统地址
SSO认证中心向所有注册系统发起注销请求
各注册系统接收SSO认证中心的注销请求，销毁局部会话
SSO认证中心引导用户至登录页面
