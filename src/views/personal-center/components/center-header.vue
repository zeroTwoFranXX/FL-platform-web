<template>
<!--<div>-->
    <!--这是头部-->
<!--        <h1 style="color: #ff9900">欢迎用户使用联邦机器学习平台</h1>-->
       <Row style="background:#eee;padding:50px">
            <Col span="5">
                <Card :bordered="false" style="width:350px"  to="/central-dataset-management/" title="数据准备">
                        <img src="./img1.png" class="aa">
                </Card>
            </Col>
            <Col span="5">
                <Card :bordered="false" style="width:350px" to="/project-management/" title="项目管理">
                        <img src="./img.jpg" class="aa">
                </Card>
            </Col>
            <Col span="5">
                <Card :bordered="false" style="width:350px" to="/model-console/" title="模型创建">
                        <img src="./img1.png" class="aa">
                </Card>
            </Col>
            <Col span="5">
                <Card :bordered="false" style="width:350px"  to="/model-management/" title="模型发布">
                        <img src="./img1.png" class="aa">
                </Card>
            </Col>
            <Col span="4">
                <Card :bordered="false" style="width:350px" to="/application-management/" title="应用">
                        <img src="./img1.png" class="aa">
                </Card>
            </Col>
        </Row>
<!--</div>-->
</template>

<script>
export default {
    name: 'center-header.vue',
    data () {
        return {

        }
    },
    methods: {}
}
</script>

<style scoped>
.aa{
    height:100%;
    width:100%;
}

</style>
