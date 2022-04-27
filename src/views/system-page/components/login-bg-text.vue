<template>
  <div class="slogn">
    <div class="liner"></div>
    <p class="welcome">欢迎来到</p>
    <p class="en-title">DOFLAS</p>
    <p class="title">联邦学习平台</p>
    <p class="title title-reverse">联邦学习平台</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.slogn {
    color: #fff;
    .liner {
      width: 48px;
      height: 1px;
      background: #ffffff;
      margin-left: 7px;
      &::before, &::after {
        content: ' ';
        display: inline-block;
        position: relative;
        width: 7px;
        height: 7px;
        top: -11px;
        left: -7px;
        border: 1px solid #ffffff;
        border-radius: 7px;
      }
      &::after {
        right: -41px;
        left: auto;
      }
    }
    .welcome {
      height: 40px;
      margin-top: 24px;
      font-size: 28px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      line-height: 40px;
      letter-spacing: 2px;
    }
    .en-title {
      height: 50px;
      background-image: linear-gradient(360deg,#63b7ff, #e4f2ff 45%, #ffffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 36px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Bold;
      font-weight: 700;
      line-height: 50px;
      letter-spacing: 4px;
      margin-top: 80px;
      text-shadow: 0px 2px 12px 0px rgba(0,0,0,0.30);
    }
    .title, .title-reverse {
      height: 82px;
      background: linear-gradient(360deg,#63b7ff, #e4f2ff 45%, #ffffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 60px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Bold;
      font-weight: 700;
      line-height: 82px;
      letter-spacing: 2px;
      text-shadow: 0px 2px 12px 0px rgba(0,0,0,0.30);
    }
    .title-reverse {
      background-image: linear-gradient(180deg,rgba(255,255,255,0.00), #ffffff);
      opacity: 0.14;
      transform: rotateX(180deg) translateY(15px);
    }
  }
</style>
