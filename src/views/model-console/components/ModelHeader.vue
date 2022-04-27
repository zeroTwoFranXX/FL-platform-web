<template>
    <div class="header">
        <div class="header-left title">
            算子区
        </div>
        <div class="header-center">
            <Row>
                <Col span="8" class="title">DAG 工作区</Col>
                <Col span="16">
                    <Row>
                        <Col style="text-align:right" span="24">
                            <Icon type="ios-remove" class="icon icon-big"/>
                            <span class="icon-text">100%</span>
                            <Icon type="ios-add" class="icon icon-big"/>
                            <Divider type="vertical" />
                            <Icon type="ios-resize" class="icon" />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        <div class="header-right title">
            参数配置区
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModelHeader'
}
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 100%;
    display: flex;
    line-height:40px;
    margin: -8px 0 0 0;
    padding: 2px 0 0 0;
    z-index:1000;
    background: #ffffff;

    .title {
        font-weight: bold;
    }
    .icon {
        margin: 0 12px;
        font-weight: 600;
        line-height: 40px;
        height:40px;
        transition: all 0.4s;
    }
    .icon-big {
        font-size: 140%;
    }
    .icon:hover {
        cursor: pointer;
        color: #2b85e4;
        transform: scale(1.1)
    }
    .icon-text {
        font-weight: 500;
    }

    .header-left {
        flex: 0 0 200px
    }

    .header-right {
        flex: 0 0 300px
    }

    .header-center {
        flex: 1;
    }
}

</style>
