<template>
 <div class="all">
    <Card  class="card-status">
        <div class="title">
            <h3>运行状态</h3>
        </div>
        <div style="display:flex">
            <div class="state-module">
                <div class="left-pic">
                    <div class="buttonPic" @click="pushProject">
                        <img class="img-pic" src="./asset/项目.png" alt="">
                    </div>
                    <p>项目管理</p>
                </div>
                <div class="content">
                    <div class="text">
                        <p>项目数：</p>
                        <h4>{{status.projCount}}</h4>
                    </div>
                     <div class="text">
                        <p>我创建的：</p>
                        <h4>{{status.projCreateCount}}</h4>
                    </div>
                     <div class="text">
                        <p>我参与的：</p>
                        <h4 style="color:red">{{status.projJoinCount}}</h4>
                    </div>
                </div>
            </div>
            <div class="state-module">
                <div class="left-pic">
                    <div class="buttonPic" @click="pushModelManage">
                        <img class="img-pic" src="./asset/模型.png" alt="">
                    </div>
                    <p>模型管理</p>
                </div>
                  <div class="content">
                       <div class="text">
                        <p>模型数：</p>
                        <h4>{{status.modelCount}}</h4>
                    </div>
                     <div class="text">
                        <p>我创建的：</p>
                        <h4>{{status.modelCreateCount}}</h4>
                    </div>
                     <div class="text">
                        <p>我参与的：</p>
                        <h4 style="color:red">{{status.modelJoinCount}}</h4>
                    </div>
                </div>
            </div>
            <div class="state-module">
                <div class="left-pic">
                    <div class="buttonPic"  @click="pushsubDataset">
                        <img class="img-pic" src="./asset/数据.png" alt="">
                    </div>
                    <p>数据管理</p>
                </div>
                  <div class="content">
                      <div class="text">
                        <p>数据集数：</p>
                        <h4>{{status.datasetCount}}</h4>
                    </div>
                     <div class="text">
                        <p>我创建的：</p>
                        <h4>{{status.datasetCreateCount}}</h4>
                    </div>
                     <div class="text">
                        <p>我参与的：</p>
                        <h4 style="color:red">{{status.datasetJoinCount}}</h4>
                    </div>
                </div>
            </div>
             <div class="state-module">
                <div class="left-pic">
                    <div class="buttonPic" @click="pushNodeManage">
                        <img class="img-pic" src="./asset/节点.png" alt="">
                    </div>
                    <p>节点管理</p>
                </div>
                  <div class="content">
                      <div class="text">
                        <p>节点数：</p>
                        <h4>{{status.nodeCount}}</h4>
                    </div>
                     <div class="text">
                        <p>运行中：</p>
                        <h4>{{status.nodeRunningCount}}</h4>
                    </div>
                     <div class="text">
                        <p>异常：</p>
                        <h4 style="color:red">{{status.nodeAbnormalCount}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </Card>
    <Card class="card-applicate">
        <div>
            <div class="title">
                <h3>我的应用</h3>
                <p @click="pushApplicateManage">更多>></p>
            </div>
            <div>
                <div class="myApp" v-for="item in applicateData.slice(0,8)" :key="item.id">
                    <div class="content">
                        <div class="pic">
                            <img class="img-pic" src="./asset/应用.png" alt="">
                        </div>
                        <div class="content-main">
                            <div class="main-title">
                                <h3>{{item.appName}}</h3>
                            </div>
                            <div class="main-status">
                                <div v-if="item.appStatus === 1" class="block-run"></div>
                                <div v-if="item.appStatus === 0" class="block-finish"></div>
                                <p>{{item.appStatus === 0 ?'停止服务':'进行中'}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="desc">
                        <div class="data-pic">
                            <Tooltip content="访问次数" placement="bottom" theme="light">
                                <div class="logo1"></div>
                            </Tooltip>
                            <div class="number">{{item.visitCount}}</div>
                        </div>
                        <div class="data-pic">
                            <Tooltip content="授权用户" placement="bottom" theme="light">
                                <div class="logo2"></div>
                            </Tooltip>
                            <div class="number">{{item.authorizedCount}}</div>
                        </div>
                        <div class="date"><p style="margin-top:10px">{{item.createTime}}</p></div>
                    </div>
                </div>
            </div>
            <div class="clear-float"></div>
        </div>
    </Card>
 </div>
</template>

<script>

import { getRunStatus, getUserApplicate } from '@/services/api/statistics'

export default {
    data () {
        return {
            status: {
                projCount: '', // 项目总数
                projCreateCount: '', // 创建的项目数
                projJoinCount: '', // 加入的项目数
                modelCount: '', // 模型总数
                modelCreateCount: '', // 创建模型数
                modelJoinCount: '', // 加入模型数
                datasetCount: '', // 数据集总数
                datasetCreateCount: '', // 创建数据集数
                datasetJoinCount: '', // 被授权数据集数
                nodeCount: '', // 节点数
                nodeRunningCount: '', // 运行节点数
                nodeAbnormalCount: '' // 异常节点数
            },
            applicateData: []
        }
    },
    watch:{
        $route(to,from){
            if(this.$route.name === 'home'){
                this.init()
            }
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            this.getStatus()
            this.getApplicate()
        },
        getStatus () {
            getRunStatus()
                .then((response) => {
                    if (response && response.status === 200) {
                        this.status = response.data.data
                        console.log(response)
                    }
                })
                .catch((error) => {
                    this.$Message.error(error)
                })
        },
        getApplicate () {
            getUserApplicate()
                .then((response) => {
                    if (response && response.status === 200) {
                        this.applicateData = response.data.data
                    }
                })
                .catch((error) => {
                    this.$Message.error(error)
                })
        },
        // 跳转项目管理
        pushProject () {
            this.$router.push({
                name: 'project-management'
            })
        },
        // 跳转模型管理
        pushModelManage () {
            this.$router.push({
                name: 'model-management'
            })
        },
        // 跳转数据集中央节点
        pushsubDataset () {
            this.$router.push({
                name: 'centralDataset'
            })
        },
        // 跳转节点
        pushNodeManage () {
            this.$router.push({
                name: 'node-monitoring'
            })
        },
        // 跳转应用列表
        pushApplicateManage () {
            this.$router.push({
                name: 'application-management'
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .all{
        width: 100%;
        height: 100%;
        .title{
            height: 30px;
            border-bottom: solid 2px #e8eaec;
            display: flex;
            h3{
                margin-left: 10px;
                width: 95%;
            }
            p{
                font-size:15px;
                font-weight:bold;
                cursor: pointer;
            }
            p:hover{
                color: #5EB6F9;
            }
        }
        .card-status{
            height:350px;
            .state-module{
                width: 385px;
                height: 260px;
                margin: 20px 20px 20px 10px;
                background:#f8f8f9;
                border: solid 1px #e8eaec;
                border-radius: 5px;
                display: flex;
                .left-pic{
                    margin:50px 0 0 30px;
                    .buttonPic{
                        width: 130px;
                        height: 130px;
                        background: white;
                        border: solid 1px  #e8eaec;
                        border-radius: 20px;
                        display:-webkit-box; //显示成盒子模式
                        -webkit-box-align:center; //垂直居中
                        -webkit-box-pack:center; //水平居中
                        .img-pic{
                            width: 80px;
                            height: 80px;
                        }
                        .img-pic:hover{
                            transform: scale(1.07, 1.07);
                            transition-duration: 0.2s;
                        }
                    }
                    p{
                        margin-top:10px;
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .buttonPic:hover{
                            cursor: pointer;
                            box-shadow: 0px 0px 10px 5px #dcdee2;
                            transition-duration: 0.5s;
                    }
                }
                .content{
                    margin:60px 0 0 15px;
                    .text{
                        cursor: default;
                        width: 220px;
                        display: flex;
                        p{
                            width: 100%;
                            font-size: 17px;
                            margin-bottom: 25px;
                        }
                        h4{
                            width: 100%;
                            font-size: 17px;
                            text-align: left;
                        }
                    }
                }
            }
            .state-module:hover{
                box-shadow: 0px 0px 10px 5px #dcdee2;
                transition-duration: 0.2s;
            }
        }
        .card-applicate{
            width: 100%;
            margin-top:20px;
            .myApp{
                float: left;
                width: 368px;
                height: 160px;
                margin:20px;
                background:#e8eaec;
                border-radius: 5px;
                .content{
                    background: #f8f8f9;
                    border-radius: 2px;
                    display: flex;
                    height: 66%;
                    margin: 5px 5px 0 5px;
                    padding: 15px 20px;
                    border-bottom: solid 2px #e8eaec;
                    .pic{
                        width: 70px;
                        height: 70px;
                        background: #5EB6F9;
                        margin-left:20px;
                        border-radius: 50%;
                         display:-webkit-box; //显示成盒子模式
                        -webkit-box-align:center; //垂直居中
                        -webkit-box-pack:center; //水平居中
                        .img-pic{
                            width: 40px;
                            height: 40px;
                        }
                    }
                    .content-main{
                        .main-title{
                            margin: 5px 0 0 5px;
                            padding-top: 2px;
                            width: 200px;
                            height: 30px;
                            h3{
                                margin:5px 5px;
                                display: block; /* 当前元素本身是inline的，因此需要设置成block模式 */
                                white-space: nowrap; /* 因为设置了block，所以需要设置nowrap来确保不换行 */
                                overflow: hidden; /* 超出隐藏结合width使用截取采用效果*/
                                text-overflow: ellipsis; /* 本功能的主要功臣，超出部分的剪裁方式 */
                                -o-text-overflow: ellipsis; /* 特定浏览器前缀 */
                                text-decoration: none; /* 无用 */
                            }
                        }
                        .main-status{
                            display: flex;
                            margin: 10px 0 0 5px;
                            .block-run{
                                margin:5px 5px;
                                width: 10px;
                                height: 10px;
                                background: #19be6b;
                                border-radius: 2px;
                            }
                            .block-finish{
                                margin:5px 5px;
                                width: 10px;
                                height: 10px;
                                background: #808695;
                                border-radius: 2px;
                            }
                        }
                    }
                }
                .desc{
                    height: 27%;
                    background: #f8f8f9;
                    border-radius: 2px;
                    margin:0 5px 0 5px;
                    display: flex;
                    .data-pic{
                        width: 100px;
                        height: 30px;
                        margin:7px 0 0 20px;
                        display: flex;
                        .logo1{
                            width: 32px;
                            height: 32px;
                            padding: 8px;
                            background: #c5c8ce;
                            background: url(./asset/访问量.png) no-repeat;
                            background-size:80% 80% ;
                        }
                        .logo2{
                            width: 32px;
                            height: 32px;
                            padding: 8px;
                            background: #c5c8ce;
                            background: url(./asset/人数.png) no-repeat;
                            background-size:80% 80% ;
                        }
                        .number{
                            margin-top: 3px;
                            font-size: 17px;
                        }
                    }
                    .date{
                        width: 100px;
                        height: 100%;
                        margin-left:10px ;
                        p{
                            font-size: 17px;
                        }
                    }
                }
            }
            .myApp:hover{
                cursor: default;
                box-shadow: 0px 0px 5px 5px #e8eaec;
                transition-duration: 0.2s;
            }
            .clear-float {
                clear:both
            }
        }
    }

</style>
