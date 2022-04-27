<template>

<div style="width:20%">
    <h1  style="color: #ff9900">使用帮助</h1>
    <Row style="background:#eee;padding:50px">
    <Col span="4">
        <Card class="card">
            <Card>
                <div style="text-align:center">
                    <Button type="text" @click="useHelp">
                    <h1>法律说明</h1>
                    </Button>
                </div>
            </Card>
            <Card>
                <div style="text-align:center">
                    <Button type="text" @click="useHelp">
                    <h1>
                        使用帮助
                    </h1>
                    </Button>
                </div>
            </Card>
            <Card>
                <div style="text-align:center">
                    <Button type="text" @click="useHelp">
                   <h1>
                       联系我们
                   </h1>
                </Button>
                </div>
            </Card>
        </Card>
    </Col>
    </Row>
</div>
</template>

<script>
export default {
    name: 'use-help.vue',
    data: function () {
        return {}
    },
    methods: {
        useHelp () {
            this.$router.push('/model-management/')
        }
    }
}
</script>

<style scoped>
.card{
    overflow:hidden;
    width: 600%;
    height: 250px;
    padding-bottom:30% ;
}
/*style="width:100%;height: 200px"*/
</style>
