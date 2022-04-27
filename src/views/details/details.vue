<template>
  <div class='details'>
    <div class="header">
      <Header></Header>
    </div>
    <div class="title-box">
      <div class="title w">
        <div class="title-details">
          <div class="project">
            <h2 class="project-name">{{this.projName}}</h2>
            <div class="category">{{this.projType}}</div>
          </div>
          <div class="project-info">
            <h4 class="info-name">项目所属人：{{this.projCreator}}</h4>
            <span class="name-date">|</span>
            <h4 class="info-date">创建日期：{{this.createTime}}</h4>
          </div>
          <div class="project-details">
            {{this.projDesc}}
          </div>
          <div calss="project-action">
            <Button v-if="this.joinFlag=='未加入'"  @click="join" style="width:136px;height: 42px;background-color: #ffffff;">申请加入</Button>
            <Button v-if="this.joinFlag=='已加入'"   style="width:136px;height: 42px;background-color: #ffffff;">已加入</Button>
            <Button v-if="this.joinFlag=='申请中'"   style="width:136px;height: 42px;background-color: #ffffff;">申请中</Button>
          </div>
        </div>
        <div class="project-picture">
          <img class="picture" :src="this.projPic" alt="">
        </div>
      </div>
    </div>
    <div class="logo">
      <div class="logo-area">
        <RotationChart :logoList="logoList"></RotationChart>
      </div>
    </div>
    <div class="table-title w">
      <div class='table-name'>项目模型详情</div>
    </div>
    <div class='table w'>
      <Table :columns="columns" :data="dataList"></Table>
      <Row type="flex" justify="end" style="margin-top: 40px;">
        <Page
            :current="currentPageIndex + 1"
            :total="dataTotal"
            :page-size="pageSize"
            @on-change="handlePageChange"
            show-elevator
            show-total
            >
        </Page>
      </Row>
    </div>
    <Modal
      v-model="joinModal"
      title="申请加入该项目"
      @on-ok="ok"
      @on-cancel="cancel"
      class-name="vertical-center-modal">
      <Form ref="fmJoin" :model="fmJoin" label-position="top" >
        <FormItem label="您的名字" prop="name">
            <Input v-model="fmJoin.name" clearable></Input>
        </FormItem>
        <FormItem label="备注与描述" prop="note">
            <Input v-model="fmJoin.note" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请说明"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- <Button @click='handleRotChart'>ceshi </Button> -->
  </div>
</template>
<script>
import Header from '../header/header.vue'
import RotationChart from './rotationChart.vue'
import { ProjectDetails, ModelList, RotChart, ApplyJoin } from '@/services/api/details'
import { BASE_URL } from '@/public/configs/config.js'
export default {
    components: { Header, RotationChart },
    data () {
        return {
            joinFlag: '',
            routeId: this.$route.params.id,
            projName: '', // 项目名称
            projCreator: '', // 创建人姓名
            projType: '', // 项目分类
            projDesc: '', // 项目描述
            createTime: '', // 创建时间
            projPic: '', // 项目图片
            // 弹窗
            joinModal: false,
            fmJoin: {
                name: '',
                note: ''
            },
            // 轮播图
            logoList: [],
            // 模型详情列表
            dataTotal: 0,
            pageSize: 10,
            currentPageIndex: 0,
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
                    title: '模型名称',
                    key: 'modelName'
                },
                {
                    title: '模型描述',
                    key: 'modelDesc'
                },
                {
                    title: '创建人',
                    key: 'creatorName'
                },
                {
                    title: '创建时间',
                    key: 'createTime'
                }
            ],
            dataList: []

        }
    },
    methods: {
        init () {
        // console.log('这是页面传参',this.routeId)
            this.handleDetails()
            this.handleGetList()
            this.handleRotChart()
        },
        // 获取项目详情
        handleDetails () {
            ProjectDetails({
                searchBy: 'id',
                // searchContent: '17d30da1aad70b5e858be43000001001',
                searchContent: this.routeId,
                logic: 'and'
            }).then((response) => {
                // console.log(response.data.data)
                this.projName = response.data.data.projName
                this.projType = response.data.data.projType
                this.projCreator = response.data.data.projCreator
                this.createTime = response.data.data.createTime
                this.projDesc = response.data.data.projDesc
                this.projPic = BASE_URL + response.data.data.projPic
                this.joinFlag = response.data.data.joinProject
                // console.log('图片地址',this.projPic)
            })
        },
        // 获取模型列表
        handleGetList () {
            this.currentPageIndex = 0
            this.getList()
        },
        getList () {
            ModelList({
                searchBy: 'projectId',
                searchContent: this.routeId,
                logic: 'and',
                page: this.currentPageIndex + 1,
                limit: this.pageSize,
                orderBy: 'model_id',
                order: 'desc'
            }).then((response) => {
                // console.log('这是列表信息',response.data.data)
                this.dataTotal = response.data.data.totalCount
                this.dataList = response.data.data.list
            })
        },
        // 获取轮播图信息
        handleRotChart () {
        // RotChart('17d30da1aad70b5e858be43000001001').then((response)=>{
            RotChart(this.routeId).then((response) => {
                response.data.data.forEach(d => {
                    if (d.orgPic) {
                        d.orgPic = BASE_URL + d.orgPic
                    }
                    this.logoList.push(d) // push 将数组内元素推进自己定义的空数组
                })
                console.log('轮播图信息', this.logoList)
            })
        },
        // 申请加入
        join () {
            this.$refs.fmJoin.resetFields()
            this.joinModal = true
        },
        // 分页
        handlePageChange (pageNum) {
            this.currentPageIndex = pageNum - 1
            this.getList()
        },
        // 弹窗
        ok () {
            ApplyJoin({
                itemId: this.routeId,
                // itemId:1,
                msgDesc: this.fmJoin.note,
                msgType: 1,
                userNameusernameInapplication: this.fmJoin.name,
                applyStatus: 6
            }).then((response) => {
                this.$Message.info(response.data.data)
            })
        },
        cancel () {
            this.$Message.info('Clicked cancel')
        }
    },
    created () {
        this.init()
    }
}
</script>

<style lang="less" scoped>
.details{
  width:100%;
  height: 100%;
  position: relative;
  overflow: auto;
}
.header{
  width:100%;
  height: 50px;
}
.w{
  width:1200px;
  margin:auto;
}
.title-box{
  width:100%;
  height: 420px;
  background-color: #0a1128;
}
.title{
  height: 420px;
}
.title-details{
  float:left;
  width:740px;
  height: 260px;
  margin-top:80px;
}
.project{
  height:56px ;
  // position: relative;
}
.project-name{
    float: left;
    font-size: 40px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: #ffffff;
    line-height: 56px;
  }
.category{
  float: left;
  height: 28px;
  margin-top:15px;
  margin-left:20px;
  padding:7px 8px;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.20);
  border-radius: 2px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: justify;
  color: rgba(255,255,255,0.85);
  line-height: 14px;
}
.project-info{
  margin-top:30px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: justify;
  color: #878d96;
  line-height: 20px;
  .info-name{
    float:left;
    margin-right:20px
  }
  .name-date{
    float:left;
  }
  .info-date{
    float:left;
    margin-left:20px;
  }
}
.project-details{
  height: 56px;
  margin-top:15px;
  margin-bottom: 40px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: justify;
  color: #b9bdc2;
  line-height: 28px;
}
.project-action{
  .action{
    width:136px;
    height: 42px;
    background-color: #ffffff;
  }
}
.project-picture{
  float:left;
  width:384px;
  height: 216px;
  margin-left: 76px;
  margin-top:102px;
  // overflow: hidden;
}
.picture{
  width:384px;
  height: 216px;
}
.logo{
  width:100%;
  height: 289px;
  background-color: #f1f5f9;
  padding-top: 30px;
}
.logo-area{
  height:220px;
  width:1356px;
  margin:0 auto;
}
.table-title{
  height: 122px;
  padding-top: 40px;
  .table-name{
    height: 42px;
    font-size: 30px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #373e48;
    line-height: 42px;
  }
}
.table{
  // height: 300px;
  padding-bottom: 60px;
}
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
