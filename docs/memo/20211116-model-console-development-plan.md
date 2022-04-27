# 模型工作台开发

拖拽节点生成：

1. 弄清楚 vue-jsplumb-editor 拖拽开始的事情，拖拽结束的事情
2. 在 flpw console 中设计绑定拖拽交互事件，调用接口


## Design

#### drag then add a new node in canvas
Time: 2021-11-16 12:00
- [x] Event Flow: 
  - [x] drag
  - [x] dragover
  - [x] drop

- [x] Event Id: 获取时需要 name 和 id

#### console json object of graph on click save button
Time: 2021-11-16 16:47
- [x] save handler
- [x] get data of graph

