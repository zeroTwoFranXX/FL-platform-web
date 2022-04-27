<template>
 <div class="all">
    <div class="task-content">
        <div class="title">当前任务</div>
        <div class="content">
            <div class="text">
                <p>任务ID:</p>
                <h4>2545457541245643</h4>
            </div>
            <div class="text">
                <p>创建时间:</p>
                <h4>2021-11-29 09:22:10</h4>
            </div>
        </div>
        <div class="button">
            <Button type="primary" @click="taskMonitor('http://192.168.179.185:8080')">任务监控快速入口</Button>
        </div>
    </div>
 </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {
        taskMonitor (e) {
            window.location.href = e
        }
    }

}
</script>
<style lang="less"  scoped>
     .all{
        height: 100%;
        .task-content{
            height: 100%;
            .title{
                display: flex;
                line-height: 40px;
                font-weight: bold;
                padding-left: 20px;
                border-bottom: solid 2px #F8F8F9;
            }
            .content{
                height: 70%;
                .text{
                    padding: 15px 10px 0 15px;
                    display: flex;
                    p{
                        width: 100px;
                    }
                    h4{
                        width: 100%;
                        text-align: right;
                    }
                }
            }
            .button{
                float: right;
                padding-right: 10px;
            }
        }
     }
</style>
