<template>
  <div class="configure">
    <div class="title-box">
      <div class="title">
        元数据配置
      </div>
      <div class="back">
        <Icon type="md-arrow-back" @click="back" size="28" color="#878d96" style="float:right" />
      </div>
    </div>
    <div class="info-box">
      <div class="base-info">
        <Card class="bace" title="基本信息">
          <Row style="height:40px">
            <Col span="10"><span class="text">数据集名：</span></Col>
            <Col span="14"><span class="text-info">banbenbanbenben：</span></Col>
          </Row>
          <Row style="height:40px">
            <Col span="10"><span class="text">系统命名空间：</span></Col>
            <Col span="14"><span class="text-info">banbenbanbenben：</span></Col>
          </Row>
          <Row style="height:40px">
            <Col span="10"><span class="text">数据库名：</span></Col>
            <Col span="14"><span class="text-info">banbenbanbenben：</span></Col>
          </Row>
          <Row style="height:40px">
            <Col span="10"><span class="text">系统表名：</span></Col>
            <Col span="14"><span class="text-info">banbenbanbenben：</span></Col>
          </Row>
          <Row style="height:40px">
            <Col span="10"><span class="text">数据源类型：</span></Col>
            <Col span="14"><span class="text-info">banbenbanbenben：</span></Col>
          </Row>
          <Row style="height:40px">
            <Col span="10"><span class="text">数据源版本：</span></Col>
            <Col span="14"><span class="text-info">banbenbanbenben：</span></Col>
          </Row>
        </Card>
        <Card class="attribute" title="属性信息">
          <Row style="height:40px">
            <Col span="10"><span class="text">表名：</span></Col>
            <Col span="14"><span class="text-info">banbenbanbenben：</span></Col>
          </Row>
          <Row style="height:40px">
            <Col span="10"><span class="text">表描述：</span></Col>
            <Col span="14"><span class="text-info">banbenbanbenben：</span></Col>
          </Row>
          <Row style="height:40px">
            <Col span="10"><span class="text">表类型：</span></Col>
            <Col span="14"><span class="text-info">banbenbanbenben：</span></Col>
          </Row>
        </Card>
      </div>
      <div class="table-info">
        <Card class="table">
          <Row >
            <Table :columns="columns" :data="tableList" style="margin-top:20px;width:100%"  border></Table>
          </Row>
          <Row style="margin-top: 8px;" type="flex" justify="end">
            <Page :current="currentPageIndex+1"
            :total="dataTotal"
            :page-size="pageSize"
            @on-change="handlePageChange"
            show-elevator
            show-total
            style="padding: 10px;"></Page>
          </Row>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            updateNote: '',
            editFlag: '',
            // 分页
            dataTotal: 0,
            pageSize: 20,
            currentPageIndex: 0,
            // 表格
            tableList: [
                {
                    jobClassName: '测试'
                },
                {
                    jobClassName: 'test'
                }
            ],
            columns: [
                {
                    title: '序号',
                    align: 'center',
                    width: 70,
                    render: (h, params) => {
                        return h('span', params.index + (this.currentPageIndex) * this.pageSize + 1)
                    }
                },
                {
                    key: 'jobClassName',
                    title: '表字段',
                    align: 'center'
                },
                {
                    key: 'jobClassName',
                    title: '中文名称',
                    align: 'center'
                },
                {
                    key: 'jobClassName',
                    title: '数据类型',
                    align: 'center'
                },
                {
                    key: 'jobClassName',
                    title: '备注说明',
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.$isEdit) {
                            return h('Input', {
                                props: {
                                    value: params.row.jobClassName
                                },
                                on: {
                                    'on-blur': (event) => {
                                        this.$set(params.row, '$isEdit', false)
                                        this.updateNote = event.target.value
                                        // this.data[params.index].jobClassName=event.target.value
                                        this.tableList.jobClassName = event.target.value

                                        // this.updateId=this.data[params.index].id
                                        // this.update()
                                        console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
                                    }
                                }
                            })
                        } else {
                            return h('div', {
                                on: {
                                }
                            }, params.row.jobClassName)
                        }
                    }
                },
                {
                    key: 'jobClassName',
                    title: '创建时间',
                    align: 'center'
                },
                {
                    key: 'updateTime',
                    title: '更新时间',
                    align: 'center'
                },
                {
                    key: 'action',
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            (this.$route.params.editFlag === '有权限') && h('a', {
                                on: {
                                    click: () => {
                                        this.$set(params.row, '$isEdit', true)
                                        console.log(this.$route.params.editFlag)
                                    }
                                }
                            }, '可修改备注'),
                            (this.$route.params.editFlag === '无权限') && h('a', {
                                style: {
                                    color: '#CCCCCC'
                                },
                                on: {
                                    click: () => {
                                        // this.$set(params.row, '$isEdit', true);
                                        console.log(this.$route.params.editFlag)
                                    }
                                }
                            }, '不可修改')
                        ])
                    }
                }
            ]

        }
    },
    methods: {
    // 翻页
        handlePageChange (pageNum) {
            this.currentPageIndex = pageNum - 1
        // this.getList()
        },
        back () {
            this.$router.push({
                name: 'subDataset'
            })
        }
    }
}

</script>
<style lang="less" scoped>
.configure{
  position: relative;
  height: 100%;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  padding-left: 15px;
  background-color: rgba(245, 247, 250, 1);
  .title-box{
    height:58px;
    padding-top: 20px;
  }
  .info-box{
    height: calc(100% - 58px);
  }
}
.title{
  float:left;
  width: 90px;
  height: 18px;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #373e48;
  line-height: 18px;
}
.back{
  float:right;
  margin-right:15px
}
.base-info{
  float: left;
  height: 100%;
  width:20%;
  // border:1px solid red;
  .bace{
    height:55%;
    width:100%;
    // border:1px solid yellow
  }
  .attribute{
    height: 43%;
    width:100%;
    margin-top:10px;
  }
}
.table-info{
  float: left;
  height:100%;
  width:79%;
  margin-left: 12px;
  // border:1px solid green;
  .table{
    height: 99%;
    width:100%
  }
}
.text{
    margin-bottom: 20px;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #686e77;
    line-height: 20px;
  }
  .text-info{
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #373e48;
    line-height: 20px;
  }
</style>
