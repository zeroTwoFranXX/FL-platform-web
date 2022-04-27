<template>
 <div>
    <div class="back_add">
        <div class="iconleft">
            <div v-show="isLeftFlag" @click="keyLeft">
                <i>
                    <Icon type="ios-arrow-dropleft" size='48' color='gray' />
                </i>
            </div>
        </div>
      <div class="threeImg">
        <div class="Containt">
            <!-- 'left':calleft + 'px' 是 ul 向左偏移的量 -->
          <ul :style="{'left':calleft + 'px'}">
              <li v-for="(item,index) in logoList" :key="index">
                  <img :src="item.orgPic"/>
                  <p>{{item.orgName}}</p>
              </li>
          </ul>
        </div>
      </div>
      <div class="iconright">
        <div v-show="isRightFlag" @click="keyRight">
            <i >
                <Icon type="ios-arrow-dropright" size='48' color='gray'/>
            </i>
        </div>
      </div>

    </div>
 </div>
</template>

<script>
export default {
    props: {
        logoList: {
            type: Array
        }
    },
    data () {
        return {
            // 轮播图
            isLeftFlag: false,
            isRightFlag: true,
            moveFlag: 0,
            calleft: 0
        }
    },
    watch: {
        calleft (e) {
            console.log('eeeeeeeee', e)
            this.changeFlag(e)
        }
    },
    methods: {
        init () {
            // 先获取轮播图信息,延时获取长度
            setTimeout(() => {
                this.viewFlag()
            }, 1000)
        },
        viewFlag () {
            this.moveFlag = this.logoList.length * (-200) + 1200
            if (this.logoList.length <= 6) {
                this.isLeftFlag = false
                this.isRightFlag = false
            }
        },
        changeFlag (e) {
            if (e == 0) {
                this.isRightFlag = true
                this.isLeftFlag = false
            } else if (e == this.moveFlag) {
                this.isLeftFlag = true
                this.isRightFlag = false
            } else {
                this.isLeftFlag = true
                this.isRightFlag = true
            }
        },
        // 点击按钮左移
        keyLeft () {
            this.calleft += 200
        },
        // 点击按钮右移
        keyRight () {
            this.calleft -= 200
        }
    },
    created () {
        this.init()
    }
}

</script>
<style lang='less' scoped>
/*超链接图片*/
.back_add {
  height: 220px;
  width:1356px;
  margin:0 auto;
  // background-color: #f1f5f9;
}
.threeImg {
    float:left;
    height: 220px;
    background: #f1f5f9;
    min-width: 1200px;
}
.threeImg .Containt ul {
// 整个图层
    margin: 0 auto;
    width: 1600px;
    position: absolute;
    left: 0px;
    cursor: pointer;
    height: 100%
}
.threeImg .Containt ul li {
    // 每个logo的大小
    list-style: none;
    width:200px;
    height: 220px;
    // margin-top: 30px;
    float: left;
    padding-top:40px;
}
.threeImg .Containt ul li img {
    // height: 220px;
    height:108px;
    // width: 10%;
    // left:50%;
    // transform: translateX(50%);
    width:108px;
    margin-left:46px;
}
.threeImg .Containt ul li p{
    // width: 64px;
    margin-top:20px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #373e48;
    line-height: 22px;
}
.Containt {
  // 轮播图容器
    background-color: #f1f5f9;
    position: relative;
    // width: 1000px;a
    width:1200px;
    height: 220px;
    overflow: hidden;
}
.iconleft{
  float:left;
  width:48px;
  margin-right:30px;
  margin-top:73px;
}
.iconright{
  float:left;
  width:48px;
  margin-left:30px;
  margin-top:73px;
}

</style>
