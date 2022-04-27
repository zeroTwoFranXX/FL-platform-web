<template>
<div>
  <Alert v-if="isHidden" show-icon closable @on-close="toggleHidden">
    使用帮助
    <Icon type="ios-bulb-outline" slot="icon" class="cart-item"></Icon>
    <template slot="desc">
      <a href="https://help.ctbiyi.com/biyi-web-vue/4.x_SUMMARY.html" target="_blank">如何使用比翼前端模板？</a><br>
      <a href="https://help.ctbiyi.com/biyi-design/standard-detail.html" target="_blank">查看详细的比翼设计交互规范</a>
    </template>
  </Alert>
  <Tabs>
        <TabPane label="基础表单行列展示">
          <multi-rank />
        </TabPane>
        <TabPane label="表格">
          <form-table />
        </TabPane>
        <TabPane label="基础表单控件">
          <form-group />
        </TabPane>
      <TabPane label="FormData">
          <form-data />
      </TabPane>
  </Tabs>
</div>
</template>
<script>
import MultiRank from './multi-column/index.vue'
import FormTable from './table-demo/index.vue'
import FormGroup from './form-group/index.vue'
import FormData from './form-data/index.vue'
export default {
    components: { MultiRank, FormTable, FormGroup, FormData },
    data () {
        return {
            isHidden: true,
            timeout: null
        }
    },
    mounted () {
        this.goHidden()
    },
    methods: {
        toggleHidden () {
            this.$store.state.shake.isshake = true
        },
        goHidden () {
            this.timeout = setTimeout(() => {
                this.isHidden = false
                this.$store.state.shake.isshake = true
            }, 1000 * 60 * 2)
        }
    },
    beforeDestroy () {
        clearTimeout(this.timeout)
        this.$store.state.shake.isshake = false
    }
}
</script>
