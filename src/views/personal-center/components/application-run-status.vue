<template>
    <div style="background:#eee;padding:50px">
        <div class="wrapper">
            <swiper :options="swiperOptions">
                <swiper-slide class="swiper-img"><img src="./bg.png"></swiper-slide>
                <swiper-slide class="swiper-img"><img src="./bg.png"></swiper-slide>
                <swiper-slide class="swiper-img"><img src="./bg.png"></swiper-slide>
                <swiper-slide class="swiper-img"><img src="./bg.png"></swiper-slide>
                <swiper-slide class="swiper-img"><img src="./bg.png"></swiper-slide>
                <swiper-slide class="swiper-img"><img src="./bg.png"></swiper-slide>
                <swiper-slide class="swiper-img"><img src="./bg.png"></swiper-slide>
                <swiper-slide class="swiper-img"><img src="./bg.png"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
export default {
    name: 'application-run-status.vue',
    data () {
        return {
            swiperOptions: {
                pagination: 'swiper-pagination',
                loop: true,
                autoplay: 3000,
                effect: 'coverflow'
            }
        }
    }
}
</script>
<style scoped>
.wrapper{
    overflow:hidden;
    width: 100%;
    height: 0;
    padding-bottom:30% ;
}
.swiper-img{
    width: 80%;
}
.swiper-pagination{
    bottom: 10px;
}
</style>
