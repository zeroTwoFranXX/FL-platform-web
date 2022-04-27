# Refresh Token

采用 access_token 和 refresh_token 的方案

## Reference

- [封装 axios 拦截器实现用户无感刷新 access_token](https://juejin.cn/post/6854573219119104014)
- [What Are Refresh Tokens and How to Use Them Securely](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)

## design

登陆后做的事情

localhost
1. login -> access_token&refresh_token save login token
2. set axios request interceptor: add token config in request
3. error handler in access_token expired --> refresh token
4. error handler refresh token expired 

# Next Plan in Model Management
1. integration of web and api
2. 登陆的总体设计

getToken()
saveToken()
refreshToken()


