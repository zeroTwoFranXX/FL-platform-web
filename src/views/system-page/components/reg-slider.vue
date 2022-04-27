<template>
  <div id="slider" class="slider dis-select" ref="slider">
    <div ref="box" id="box" class="box">按住滑块拖动，拖到最右边</div>
    <div
      ref="handleBtn"
      class="handle"
    >
      <span v-show="!end">> ></span>
      <Icon v-show="end" type="md-checkmark-circle-outline" color="#27b162" size="22" />
    </div>
    <div ref="bg" class="bg"></div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            end: false
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            let btnOffsetWidth = this.$refs.handleBtn.clientWidth
            let sliderOffsetWidth = this.$refs.slider.clientWidth
            this.distance = sliderOffsetWidth - btnOffsetWidth

            let btn = this.$refs.handleBtn
            let bg = this.$refs.bg

            btn.onmousedown = (e) => {
                let downX = e.clientX

                btn.onmousemove = (moveE) => {
                    let moveW = moveE.clientX - downX

                    btn.style.left = moveW + 'px'
                    bg.style.width = moveW + 'px'

                    if (moveW <= 0) {
                        btn.style.left = '0'
                    }

                    if (moveW >= this.distance) {
                        btn.style.left = this.distance
                        bg.innerHTML = '验证成功'
                        btn.onmousemove = null
                        btn.onmousedown = null
                        this.end = true
                        this.$emit('pass', true)
                    }
                }

                btn.onmouseup = () => {
                    btn.onmousemove = null
                    if (!this.end) {
                        btn.style.left = '0'
                        bg.style.width = '0'
                        bg.innerHTML = ''
                    }
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.slider {
  position: relative;
  height: 36px;
  line-height: 36px;
  border: 1px solid #eaedf0;
  border-radius: 2px;
  text-align: center;
  .box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #f5f7fa;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #686e77;
    z-index: 1;
  }
  .handle {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 34px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #eaedf0;
    border-radius: 2px 0px 0px 2px;
    font-weight: bold;
    color: #ccc;
    cursor: pointer;
    z-index: 3;
  }
  .bg {
    position: absolute;
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    height: 36px;
    background: #27b162;
    border-radius: 2px;
    color: #fff;
    z-index: 2;
  }
}
.dis-select {
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select:none;
  -khtml-user-select:none;
  -webkit-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
</style>
