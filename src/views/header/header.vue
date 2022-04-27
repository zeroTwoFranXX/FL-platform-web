<template>
 <div class='header'>
   <div class='left'>
     <img src="./assets/logo.png" class='logo'>
   </div>
   <div class='mid w'>
     <div class="home" @click="goApplicationHome">首页</div>
     <div class="app">
       <Dropdown class='app-menu' @on-click="display($event)">
        <a class='menu-title' href="javascript:void(0)">
            应用市场
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list" class='menu'>
            <DropdownItem class='menu-list' name='应用展示' >应用展示</DropdownItem>
            <DropdownItem class='menu-list' name='项目展示' >项目展示</DropdownItem>
            <DropdownItem class='menu-list' name='数据展示' >数据展示</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
     <div class="controls" @click="goConsoleHome()">控制台</div>
   </div>
   <div class="right">
     <div class="message" @click="toMessage">消息中心</div>
     <div v-if="this.userInfo === null" class="loginButton" @click="toLogin">登陆</div>
     <img v-if="this.userInfo != null" :src="avatorUrl" class='user-photo'>
     <div v-if="this.userInfo != null" class="user">
       <Dropdown class='user-name' @on-click="handleUserAction">
        <a class='name' href="javascript:void(0)">
            {{this.userInfo.username}}
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list" >
            <DropdownItem  name='userCenter'>个人信息</DropdownItem>
            <DropdownItem  name='logout'>退出账号</DropdownItem>
        </DropdownMenu>
      </Dropdown>
     </div>
   </div>
 </div>
</template>

<script>
import { BASE_URL } from '@/public/configs/config.js'
import { clearToken } from '@/common/helpers/token'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters('user', [
            'userInfo'
        ]),
        avatorUrl () {
            if (this.userInfo != null) {
                return BASE_URL + this.userInfo.avatar
            } else {
                return ''
            }
        }
    },
    methods: {
        message(){
            this.$router.push({
                name: 'message-center'
            })
        },
        goConsoleHome () {
            this.$router.push({ name: 'home' })
        },
        goApplicationHome () {
            this.$router.push({ name: 'ApplicationDisplay' })
        },
        display (name) {
            if (name == '应用展示') {
                this.$router.push({
                    name: 'ApplicationDisplay'
                })
            } else if (name == '项目展示') {
                this.$router.push({
                    name: 'ProjectDisplay'
                })
            } else if (name == '数据展示') {
                this.$router.push({
                    name: 'DataDisplay'
                })
            }
        },
        toLogin () {
            clearToken()
            this.$router.push('/login')
        },
        toMessage(){
          this.$router.push('/message')
        },
        handleUserAction (action) {
            switch (action) {
            case 'logout':
                clearToken()
                this.$router.push('/login')
                break
            case 'userCenter':
                this.$router.push('/personal-information')
                break
            default:
                break
            }
        }
    }
}
</script>
<style lang='less' scoped>
// 宽度1200居中
.w{
  width: calc(100% - 380px);
  margin:auto;
}
.header{
  // display: flex;
  // position: relative;
  width:100%;
  height: 50px;
  background: #00296b;
  box-shadow: 0px 0px 4px 0px;
}
// 左侧部分
.left{
  float:left;
  .logo{
    width:200px;
    height: 20px;
    margin-top:15px;
    margin-left: 10px;
      padding-right: 10px;
  }
}
// 中间部分
.mid{
  color:white;
  background-color: tomato;
}
.home{
  float:left;
  height: 14px;
  font-size: 14px;
  margin-top:18px;
  margin-right:30px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: rgba(255,255,255,0.65);
  line-height: 14px;
  cursor:pointer;
}
.app{
  float:left;
}
/deep/.app-menu{
  margin-top:15px;
  margin-right:24px;
  .ivu-select-dropdown{
    padding:0
  }
}
.menu-title{
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: rgba(255,255,255,0.65);
  line-height: 14px;
}
.menu-title:hover{
  color:#ffffff;
}
.menu{
  background-color: #00296b;
}
.menu-list{
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align:center;
  color: rgba(255,255,255,0.65);
}
.menu-list:hover{
  background-color: #00509d;
  color:#ffffff;
}
.controls{
  float:left;
  height: 14px;
  font-size: 14px;
  margin-top: 18px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: rgba(255,255,255,0.65);
  line-height: 14px;
  cursor:pointer;
}
.controls:hover{
  color:#ffffff;
}
// 右侧部分
.right{
  float:right;
  display: flex;
}
.message{
  float:left;
  width: 60px;
  margin-left:20px;
  margin-top:19px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255,255,255,0.65);
  line-height: 14px;
  cursor:pointer;
}
.message:hover{
  color:#ffffff;
}
.loginButton{
  float:left;
  width: 28px;
  margin-left:30px;
  margin-right:30px;
  margin-top:19px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255,255,255,0.65);
  line-height: 14px;
  cursor:pointer;
}
.loginButton:hover{
  color:#ffffff;
}
.avatar{
  height:32px;
  width: 32px;
  margin-left:40px;
  margin-top: 10px;
  // border-radius: 50%;
  border:1px red solid
}
.user-photo{
  height:32px;
  width: 32px;
  margin-left:20px;
  margin-top: 10px;
  border-radius: 20%;
}
.user{
  float:left;
  margin-top:17px;
  margin-right:20px
}
.user-name{
  margin-left:10px;
  justify-content: flex-end;
}
.name{
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: rgba(255,255,255,0.85);
  line-height: 20px;
}
</style>
