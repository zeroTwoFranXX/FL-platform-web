<style  lang="less" scoped>
.all{
    width: 100%;
    height: 100%;
    overflow: auto;
    .title{
        .title-pic{
            width:100%;
            height:300px;
            background-image: url(./assets/展示页顶部图.png) ;
            background-size: 100% 100%;
            position: relative;
            img{
                display: block;
            }
            .title-content{
                position: absolute;
                top:100px;
                left:38%;
                h1{
                    text-align: center;
                    font-size: 28px;
                    font-family: PingFangSC, PingFangSC-Medium;
                    font-weight: 500;
                    color: #ffffff;
                }
                .search{
                    padding-top: 60px;
                }
            }
        }
    }
    .content{
        .selectionbar{
            cursor:pointer;
            width: 1200px;
            margin:auto;
            display: flex;
            height: 30px;
        }
        .content-plate{
            width: 1200px;
            margin:auto;
            background: #F1F5F9;
            .title{
                padding-left:20px;
                padding-top:20px;
                font-size: 16px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: #373e48;
                line-height: 16px;
            }
            .content-pic{
                .pic{
                    cursor:pointer;
                    width: 255px;
                    height: 304px;
                    background: #ffffff;
                    margin: 20px 20px 20px 25px;
                    float: left;
                    border-radius: 3px;
                    .display-pic{
                        width: 255px;
                        height: 50%;
                        border-radius: 3px 3px 0px 0px;
                    }
                    .pic-title{
                        height: 45px;
                        width: 220px;
                        display: table-cell;
                        // vertical-align: middle;
                        padding-left: 24px;
                        position: relative;
                        font-size: 18px;
                        font-family: PingFangSC, PingFangSC-Medium;
                        font-weight:500;
                        text-align: left;
                        color: #373e48;
                        line-height: 24px;
                        display: block; /* 当前元素本身是inline的，因此需要设置成block模式 */
                        white-space: nowrap; /* 因为设置了block，所以需要设置nowrap来确保不换行 */
                        overflow: hidden; /* 超出隐藏结合width使用截取采用效果*/
                        text-overflow: ellipsis; /* 本功能的主要功臣，超出部分的剪裁方式 */
                        -o-text-overflow: ellipsis; /* 特定浏览器前缀 */
                        text-decoration: none; /* 无用 */
                        &::before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 25%;
                            bottom: auto;
                            right: auto;
                            height: 45%;
                            width: 4px;
                            background-color: #0b4eb4;
                        }
                    }
                    .jianjie{
                        padding: 0 20px;
                        height: 40px;
                        font-size: 14px;
                        font-family: PingFangSC, PingFangSC-Regular;
                        font-weight: 400;
                        text-align: justify;
                        color: #878d96;
                        line-height: 20px;
                        display: -webkit-box;
                        -webkit-line-clamp: 2; //显示行数
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .button{
                        margin: auto;
                        width: 100%;
                        text-align: center;
                        Button{
                            margin: 15px 10px;
                        }
                        .buttonJoin{
                            color:  #278ff0;
                        }
                    }
                }
                .pic:hover{
                    box-shadow:0px 10px 20px 5px rgba(9,19,34,0.15);
                    transform:translateY(-10px);
                    transition-duration:0.3s ;
                    .pic-title{
                        color: #278ff0;
                    }
                    .buttonJoin{
                        background:  #278ff0;
                        color: white;
                    }
                }
            }
            .page{
                clear: both;
                padding:20px 0 30px 0;
                padding-left: 400px;
                margin-bottom: 30px;
            }
        }
    }
}
</style>
<template>
    <div class="all">
         <div>
            <navigation-bar></navigation-bar>
        </div>
        <div class="title">
            <div  class="title-pic">
                <div class="title-content">
                    <div><h1>应用展示</h1></div>
                    <div class="search">
                        <Input v-model="applicateName" placeholder="搜索应用名称" style="width: 350px" />
                        <Button type="primary" style="margin-left:10px" @click="nameSearch">搜索</Button>
                    </div>
                    <div class="search"> </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="selectionbar">

            </div>
            <div class="content-plate">
                <div class="title">
                </div>
                <div class="content-pic">
                    <div class="pic" v-for="item in moduleData" :key="item.id">
                        <img class="display-pic" :src="item.appImage" alt="">
                        <div>
                            <div class="pic-title">
                                {{item.appName}}
                            </div>
                            <div class="jianjie">{{item.appDesc}}</div>
                            <div class="button">
                                <Button @click="viewDetails(item.id)">查看详情</Button>
                                <Button v-if="item.joinApp == '已加入'" disabled>已申请</Button>
                                <Button v-if="item.joinApp == '申请中'">申请中</Button>
                                <Button class="buttonJoin"  v-if="item.joinApp == '未申请'"  @click="handleApplyJoin(item.id,item.appName)">申请加入</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page">
                    <Page
                        :current="currentPageNum"
                        :total="dataCount"
                        :page-size="pageSize"
                        @on-change="handlePageChange"
                        show-elevator
                        show-total
                    ></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navigationBar from '../header/header.vue'
import { BASE_URL } from '@/public/configs/config.js'
import { getApplicationList, applyJoin } from '@/services/api/gateway'
export default {
    components: { navigationBar },
    data () {
        return {
            dataCount: 0,
            currentPageNum: 1,
            pageSize: 12,
            searchBy: '',
            applicateName: '',
            flagMore: true,
            isShow: false,
            allCheck: true,
            selectId: '',
            selectName: '',
            moduleData: []
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            this.getList()
        },

        // 获取项目列表
        getList () {
            getApplicationList({
                searchBy: this.searchBy,
                searchContent: this.applicateName,
                logic: 'and',
                page: this.currentPageNum,
                limit: this.pageSize,
                orderBy: null,
                order: null
            })
                .then(response => {
                    this.dataCount = response.data.data.totalCount
                    this.moduleData = response.data.data.list
                    this.moduleData.forEach((item) => {
                        item.appImage = BASE_URL + item.appImage
                    })
                })
        },
        nameSearch () {
            if (!this.applicateName) {
                this.searchBy = null
                this.applicateName = null
            } else {
                this.searchBy = 'appName'
            }
            this.currentPageNum = 1,
            this.getList()
        },
        handlePageChange (pageNum) {
            this.currentPageNum = pageNum
            this.getList()
        },
        // 跳转页面
        viewDetails (id) {
            this.$router.push({
                name: 'appDetails',
                params: { id: id }
            })
        },
        handleApplyJoin (id, name) {
            applyJoin({
                itemId: id,
                msgDesc: '',
                msgType: 3,
                applyStatus: 0,
                usernameInapplication: name
            })
                .then(response => {
                    this.$Message.success(response.data.data)
                    this.getList()
                })
        }
    }
}
</script>
