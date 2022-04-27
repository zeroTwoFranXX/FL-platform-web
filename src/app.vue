<!--
 * @Author: your name
 * @Date: 2021-01-27 09:20:49
 * @LastEditTime: 2021-01-28 08:57:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \archetype-resources\src\app.vue
-->
<template>
  <div id="app">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<style lang="less">
@import './base.less';
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
}

#app {
  width: 100%;
  height: 100%;
}

.ivu-select-dropdown {
  ul {
    max-width: 120px;
    padding-top: 8px;
    li {
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;/**不换行**/
      display: inline-block;
    }
  }
}
</style>
