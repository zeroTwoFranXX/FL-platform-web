<template>
    <div class="all">
        <div>
            <navigation-bar></navigation-bar>
        </div>
        <div class="content">
            <div class="icon"><Icon size="88" color="#27B162" class="iconStyle" type="md-checkmark-circle" /></div>
            <div class="title">恭喜您，注册成功</div>
            <div class="button"><Button style="width:250px" size='large' type="primary" to="/login">立即登录</Button></div>
        </div>
    </div>
</template>

<script>
import navigationBar from '../../header/header.vue'
export default {
    components: { navigationBar },
    data () {
        return {
        }
    }
}
</script>
<style  lang="less" scoped>
.all{
    width: 100%;
    height: 100%;
    .content{
        height: 100%;
        margin: 0;
        padding: 0;
        margin:auto;
        text-align: center;
        .icon{
            padding-top: 200px;
        }
    }
    .title{
        margin: 10px 0;
        height: 32px;
        font-size: 28px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        color: #373e48;
        line-height: 32px;
    }
    .button{
        margin-top:40px;
    }
    .to-login{
        margin-top:10px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        line-height: 20px;
    }
}

</style>
