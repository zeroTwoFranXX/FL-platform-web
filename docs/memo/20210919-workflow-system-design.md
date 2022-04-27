# 工作流组件系统设计

## 技术构件文档

- [jsPlumb中文基础教程](https://wdd.js.org/jsplumb-chinese-tutorial/#/)

## 组件划分

```bash
model-console
  |-- model-header // 头部
  |-- model-operators // 算子区
  |-- model-canvas  // 画布区
  |-- model-config  // 配置区
  |-- model-actions // 操作区
  |-- model-message // 消息区
```

## 撤销重做

- [掘金：Web 应用的撤销重做实现](https://juejin.cn/post/6844903921878564872) 网易云音乐前端，撤销与重做业务概念图画的比较漂亮


## 开源项目参考

1. [vue-jsplumb-editor](https://github.com/fangyang921017/vue-jsplumb-editor) 基于这个项目重构
2. [vue form making](https://github.com/GavinZhuLei/vue-form-making) 页面布局可以参考这个项目
3. [easy-flow](https://github.com/BiaoChengLiu/easy-flow) 评分卡可以参考这个模块
4. [jsplumb-vue-workFlow](https://github.com/Code-RoadFly/jsplumb-vue-workFlow) 放大缩小做的比较好
