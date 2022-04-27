# 点击侧边栏路由重复

#router #menu

## bug 描述

点击侧边栏重复

## bug 

原因

## 解决方法

```javascript
// src/router/router.js

router.beforeEach(() => {
  /** ... */
  store.state.app.asyncRoutesCompleted = true
})

```
