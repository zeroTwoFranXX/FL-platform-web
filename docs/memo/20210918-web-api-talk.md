# 联邦学习接口讨论问题备忘录 (WEB API)

## 讨论主题

- API 接口技术问题讨论。
- 评分卡模块接口文档评审。
- 目前 API 开发进度，后续API 开发的日程安排。
- 测试部署地址，接口联调的合作模式


RESTful
url -
method -
zhengji


## 具体问题

1. 接口基本原则 
2. GET方法入参： params vs path ?
3. POST方法入参： application/json ?
4. http or https?
5. 成功状态、错误状态、（统一格式）成功、错误提示信息（石彬可以讲一下，集成这边的通常实践方式？）
6. 图片文件？ 上传下载比翼有类似功能吗？（石彬） 
7. 比翼后端内置的提供的 API （石彬）
8. 鉴权 (jwt) ？（石彬）
9. 登陆问题？（石彬）
10. Cross Origin 跨域问题处理
11. 敏感数据加密？ 
12. 接口文档地址？飞书？
13. 如何联调？
14. 测试地址。开发部署地址。
15. 目前北邮API开发的进度。
16. 目前北邮已开发的API示例（评分卡模块）讨论其接口文档
17. 后续 API 接口开发日程安排

## 基本原则

CRUST 原则

Consistent : 一致性， 保持 名称、请求体、返回体、错误处理格式一致。
Resilient : 弹性，可选参数（List支持分页搜索过滤）。
Unambiguous : 明确的，接口准确，输入输出描述清楚，接口文档提供示例。
Simple: 简单
Tiny: 小巧

## 格式

#### 路径

1. `RESTful API`
2. `http(s)://server.com/api-name/{version}/{domain}/{rest-convention}`

需要讨论是否需要版本？基本的命名规范（英文 && - && 小写）
   
Get 请求 通常两种参数格式
```
https://www.example.com/v1/userInfo?name=‘test’&id=’xxxx’ // URL 参数 （建议）
https://www.example.com/v1.1/employees/{id} // 路径参数
```
``
Post 请求 
2. 返回体格式

 


