<template>
 <div class='app'>
    <div class="header">
      <Header></Header>
    </div>
    <div class="title-box">
      <div class="title w">
        <div class="title-details">
          <div class="project">
            <h2 class="project-name">{{this.appName}}</h2>
            <div class="category">{{this.appType}}</div>
          </div>
          <div class="project-info">
            <h4 class="info-name">项目所属人：{{this.creatorUserName}}</h4>
            <span class="name-date">|</span>
            <h4 class="info-date">创建日期：{{this.createTime}}</h4>
          </div>
          <!-- <div class="project-details">
            本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题。本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题
          </div> -->
          <div calss="project-action">
            <Button v-if="this.joinFlag=='未加入'"  @click='apply' style="width:136px;height: 42px;background-color: #ffffff;">申请加入</Button>
            <Button v-if="this.joinFlag=='已加入'"  style="width:136px;height: 42px;background-color: #ffffff;">已加入</Button>
            <Button  v-if="this.joinFlag=='申请中'" style="width:136px;height: 42px;background-color: #ffffff;">申请中</Button>
          </div>
        </div>
        <div class="project-picture">
          <img class="picture" :src="this.appImage">
        </div>
      </div>
    </div>
    <div class="app-details-area w">
      <div class="app-details">应用详情</div>
    </div>
    <div class="details w">
      <!-- <p class="details-text">本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题。本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题</p>
      <img src="./assets/详情.png">
      <p class="details-text">
        本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题。本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题。本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题。本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题。本项目是解决高成长企业信用评估问题，解决多组织机构数据不互通，不能联合评估的难题
      </p> -->
      {{this.appDesc}}
    </div>
    <div class="logo">
      <div class="dtc-participant w">主要参与机构</div>
      <div class="logo-area">
        <RotationChart :logoList="logoList"></RotationChart>
      </div>
    </div>

    <Modal
      v-model="detailsModal"
      title="申请应用"
      @on-ok="ok"
      @on-cancel="cancel"
      class-name="vertical-center-modal">
      <Form ref="fmDetails" :model="fmDetails" label-position="top">
        <FormItem label="您的名字" prop="name">
            <Input v-model="fmDetails.name" clearable></Input>
        </FormItem>
        <FormItem label="备注与描述" prop="note">
            <Input v-model="fmDetails.note" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请说明"></Input>
        </FormItem>
      </Form>
    </Modal>

 </div>
</template>

<script>
import Header from '../header/header.vue'
import RotationChart from './rotationChart.vue'
import { AppDetails, RotChart, ApplyJoin } from '@/services/api/details'
import  { BASE_URL } from '@/public/configs/config.js'
export default {
    components: { Header, RotationChart },
    data () {
        return {
            joinFlag: '',
            routeId: this.$route.params.id,
            appName: '', // 应用名称
            creatorUserName: '', // 创建人姓名
            createTime: '', // 创建时间
            appDesc: '', // 应用描述
            appType: '', // 应用分类
            appImage: '', // 应用图片
            // 弹窗
            detailsModal: false,
            fmDetails: {
                name: '',
                note: ''
            },
            logoList: []
        }
    },
    methods: {
        init () {
            this.handleDetails()
            this.handleRotChart()
        },
        // 获取应用详情
        handleDetails () {
            console.log('aa')
            AppDetails({
                searchBy: 'id',
                // searchContent: '1',
                searchContent: this.routeId,
                logic: 'and'
            }).then((response) => {
                console.log(response.data.data)
                this.appName = response.data.data.appName
                this.appType = response.data.data.appType
                this.creatorUserName = response.data.data.creatorUserName
                this.createTime = response.data.data.createTime
                this.appImage = BASE_URL + response.data.data.appImage
                this.appDesc = response.data.data.appDesc
                this.joinFlag = response.data.data.joinApp
            })
        },
        // 获取轮播图信息
        handleRotChart () {
            RotChart(this.routeId).then((response) => {
                response.data.data.forEach(d => {
                    if (d.orgPic) {
                        d.orgPic = BASE_URL + d.orgPic
                    }
                    // push 将数组内元素推进自己定义的空数组
                    this.logoList.push(d)
                })
                console.log('轮播图信息', this.logoList)
            })
        },
        // 应用申请
        apply () {
            this.$refs.fmDetails.resetFields()
            this.detailsModal = true
        },
        // 弹窗
        ok () {
            ApplyJoin({
                itemId: this.routeId,
                // itemId:1,
                msgDesc: this.fmDetails.note,
                msgType: 3,
                userNameusernameInapplication: this.fmDetails.name,
                applyStatus: 0
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
.app{
  width:100%;
  height:100%;
  position: relative;
  overflow: auto;
}
.w{
  width:1200px;
  margin:auto;
}
.header{
  width:100%;
  height: 50px;
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
  margin-bottom:76px;
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
    width:136px;
    height: 42px;
    margin-top:81px;
    background-color: #ffffff;

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
.app-details-area{
  height: 112px;
  padding-top: 40px;
}
.app-details{
  height: 42px;
  font-size: 30px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #373e48;
  line-height: 42px;
}
.details{
  height: auto;
}
.details-text{
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: justify;
  color: #686e77;
  line-height: 28px;
}
.logo{
  width:100%;
  height: 364px;
  padding-top: 40px;
  background-color: #f1f5f9;
}
.dtc-participant{
  height: 42px;
  font-size: 30px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #373e48;
  line-height: 42px;
  margin-bottom: 20px;
}
.logo-area{
  height:220px;
  width:1356px;
  margin:0 auto;
}
</style>
