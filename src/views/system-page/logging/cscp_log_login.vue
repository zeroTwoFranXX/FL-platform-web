<style lang="less">
@import '../styles/common.less';
@import './table.less';
</style>

<template>
  <div>
    <div>
      <div class="btn-group">
        <Button @click="handleSearch" type="primary" icon="md-search" style="margin-right:10px"
          >查询</Button
        >
        <Button @click="handleCancel" type="default">重置</Button>
      </div>
      <Input
        v-model="searchUserName"
        placeholder="查询用户名"
        style="width: 328px"
      />
    </div>

    <Row class="margin-top-10 searchable-table-con1" style="width: 100%">
      <Table :columns="columns" :data="dataList"></Table>
      <Row type="flex" justify="end" align="middle">
        <Page
          :total="dataCount"
          :page-size="pageSize"
          @on-change="handlePageChange"
          show-elevator
          show-total
          style="padding: 10px"
          :current="currentPageNum"
        ></Page>
      </Row>
    </Row>
  </div>
</template>

<script>
export default {
    name: 'searchable-table',
    data () {
        return {
            dataCount: 0,
            currentPageNum: 1,
            pageSize: 13,
            columns: [
                {
                    key: 'id',
                    title: 'ID'
                },
                {
                    key: 'userName',
                    title: '用户名'
                },
                {
                    key: 'ip',
                    title: 'IP'
                },
                {
                    key: 'time',
                    title: '时间'
                },
                {
                    key: 'message',
                    title: '操作信息'
                },
                {
                    key: 'status',
                    title: '状态'
                }
            ],
            searchUserName: '',
            dataList: []
        }
    },
    methods: {
        init () {
            this.search({
                size: this.pageSize,
                page: this.currentPageNum - 1,
                'userName.contains': this.searchUserName,
                sort: 'time,desc'
            })
        },
        search (argumentObj) {
            this.$http
                .get('/api/system/cscpLogLoginsByCriteria', { params: argumentObj })
                .then((response) => {
                    this.dataList = response.data.data
                    this.dataCount = response.data.recordsTotal
                })
                .catch()
        },
        handleSearch () {
            this.currentPageNum = 1
            this.search({
                size: this.pageSize,
                page: this.currentPageNum - 1,
                'userName.contains': this.searchUserName,
                sort: 'time,desc'
            })
        },
        handleCancel () {
            this.searchUserName = ''
            this.init()
        },
        handlePageChange (pageNum) {
            this.currentPageNum = pageNum
            this.search({
                size: this.pageSize,
                page: this.currentPageNum - 1,
                'userName.contains': this.searchUserName,
                sort: 'time,desc'
            })
        }
    },
    created () {
        this.init()
    }
}
</script>

<style lang="less" scoped>
.btn-group {
  float: right;
}
</style>
