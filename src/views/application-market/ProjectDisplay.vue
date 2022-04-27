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
            .all-select{
                width: 120px;
                height: 100%;
                border-bottom: 4px solid #0b4eb4;
                position: relative;
                .fenlei{
                    font-weight:bold;
                    font-size: 18px;
                    font-family: PingFangSC, PingFangSC-Medium;
                    color: #00509d;
                    line-height: 22px;
                    text-align: center;
                    padding-top:20%;
                    padding-bottom: 20%;
                }
                &::before {
                    content: '';
                    position: absolute;
                    left: auto;
                    top: 35%;
                    bottom: auto;
                    right: 0;
                    height: 35%;
                    width: 1px;
                    background-color: #eaedf0;
                }
            }
            .selectAll{
                width: 120px;
                height: 100%;
                position: relative;
                .fenlei{
                    font-weight:bold;
                    font-size: 18px;
                    font-family: PingFangSC, PingFangSC-Medium;
                    color: #373e48;
                    line-height: 22px;
                    text-align: center;
                    padding-top:20%;
                    padding-bottom: 20%;
                }
                .fenlei:hover{
                    color: #278ff0;
                }
                &::before {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 35%;
                    bottom: auto;
                    left: auto;
                    height: 35%;
                    width: 1px;
                    background-color: #eaedf0;
                }
            }
            .center{
                width: 86%;
                .center-a{
                    padding: 10px 0;
                    height: 60px;
                    .selectOne{
                        font-size: 14px;
                        font-family: PingFangSC, PingFangSC-Regular;
                        font-weight: 400;
                        line-height: 22px;
                        margin: 10px 15px;
                        float: left;
                    }
                    .selectName{
                        background:  #278ff0;
                        color: white;
                        font-size: 14px;
                        font-family: PingFangSC, PingFangSC-Regular;
                        font-weight: 400;
                        line-height: 22px;
                        margin: 10px 15px;
                        float: left;
                    }
                }
                .selectOne:hover{
                    box-shadow:0px 0px 8px 2px #dadde0;
                }
            }
            .right{
                cursor:pointer;
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: #878d96;
                line-height: 22px;
                display: flex;
                padding: 25px 0;
            }
            .right:hover{
                color: #278ff0;
            }
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
                    <div><h1>项目展示</h1></div>
                    <div class="search">
                        <Input v-model="searchName" placeholder="搜索项目名称" style="width: 350px" />
                        <Button type="primary" style="margin-left:10px" @click="nameSearch">搜索</Button>
                    </div>
                    <div class="search"> </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="selectionbar">
                <div :class="allCheck == false ? 'selectAll':'all-select'">
                    <div class="fenlei" @click="selectAll">全部分类</div>
                </div>
                <div class="center">
                    <div class="center-a">
                        <Button
                            shape="circle"
                            @click="selectData(item.code,item.name)"
                            type="text"
                            :class="selectName == item.name && selectCode == item.code ? 'selectName':'selectOne'"
                            v-for="item in ShowClassifyData"
                            :value="item.name"
                            :key="item.id"
                        >
                            {{ item.name }}
                        </Button>
                    </div>
                </div>
                <div
                    v-if="classifyData.length > 11"
                    class="right"
                    @click="spread"
                >
                    <span>{{flagMore?'更多':'收起'}}</span>
                </div>
            </div>
            <div class="content-plate">
                <div class="title">
                     <Breadcrumb>
                        <BreadcrumbItem to="/ProjectDisplay" >全部分类</BreadcrumbItem>
                        <BreadcrumbItem v-if="isShow" >{{this.selectName}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="content-pic">
                    <div class="pic" v-for="item in moduleData" :key="item.id">
                        <img class="display-pic" :src="item.projPic" alt="">
                        <div>
                            <div class="pic-title">
                                {{item.projName}}
                            </div>
                            <div class="jianjie">{{item.projDesc}}</div>
                            <div class="button">
                                <Button @click="viewDetails(item.id)">查看详情</Button>
                                <Button v-if="item.joinProject == '已加入'" disabled>已申请</Button>
                                <Button v-if="item.joinProject == '申请中'">申请中</Button>
                                <Button class="buttonJoin" v-if="item.joinProject == '未申请'" @click="handleApplyJoin(item.id,item.projName)">申请加入</Button>
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
import { getProjectList, getProjectType, applyJoin } from '@/services/api/gateway'
import { BASE_URL } from '@/public/configs/config.js'
import { handleRequestParams } from '@/common/helpers/params'

export default {
    components: { navigationBar },
    data () {
        return {
            dataCount: 0,
            currentPageNum: 1,
            pageSize: 12,

            seachTypeCode: '',
            searchName: '',

            searchParams: {
                projName: '',
                projTypeCode: ''
            },
            searchBy: '',
            searchContent: '',

            flagMore: true,
            isShow: false,
            allCheck: true,
            selectCode: '',
            selectName: '',
            classifyData: [],
            moduleData: []
        }
    },
    computed: {
        ShowClassifyData: {
            get: function () {
                if (this.flagMore) {
                    if (this.classifyData.length < 10) {
                        return this.classifyData
                    }
                    let newArr = []
                    for (var i = 0; i < 9; i++) {
                        let classifyDatas = this.classifyData[i]
                        newArr.push(classifyDatas)
                    }
                    return newArr
                }
                return this.classifyData
            },
            set: function (val) {
                this.ShowClassifyData = val
            }
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            this.getType()
            this.getList()
        },
        // 获取分类
        getType () {
            getProjectType()
                .then(response => {
                    this.classifyData = response.data.data
                })
        },
        // 获取项目列表
        getList () {
            getProjectList({
                searchBy: this.searchBy,
                searchContent: this.searchContent,
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
                        item.projPic = BASE_URL + item.projPic
                    })
                })
        },
        nameSearch () {
            // 名称为空
            if (!this.searchName) {
                if (this.allCheck) {
                    this.selectAll()
                } else {
                    this.searchParams.projName = null
                    this.searchParams.projTypeCode = this.seachTypeCode
                    this.search()
                }
            // 名称不为空
            } else {
                // 按钮为空
                if (this.allCheck) {
                    this.searchParams.projTypeCode = null
                }
                this.searchParams.projName = this.searchName
                this.search()
            }
        },
        typeSearch () {
            if (!this.searchName) {
                this.searchParams.projName = null
            }
            this.searchParams.projTypeCode = this.seachTypeCode
            this.search()
        },
        search () {
            this.searchBy = handleRequestParams(this.searchParams).searchBy
            this.searchContent = handleRequestParams(this.searchParams).searchContent
            this.currentPageNum = 1,
            this.getList()
        },
        handlePageChange (pageNum) {
            this.currentPageNum = pageNum
            this.getList()
        },
        // 点击全部分类
        selectAll () {
            // 如果展开
            this.flagMore = true
            this.isShow = false
            //  取消按钮高亮
            this.selectName = null
            // 全选样式打开
            this.allCheck = true
            this.searchBy = null,
            this.searchContent = null,
            this.currentPageNum = 1,
            this.searchName = null,
            this.getList()
        },
        // 点击分类按钮
        selectData (code, name) {
            // 未点击按钮
            if (name == null) {
                // 标签关闭
                this.isShow = false
                // 全选样式打开
                this.allCheck = true
            }
            // 点击按钮
            else {
                // 打开标签；传递标签名称与code
                this.selectCode = code
                this.selectName = name
                this.isShow = true
                // 全选样式关闭
                this.allCheck = false
            }
            this.seachTypeCode = code
            this.typeSearch()
        },
        // 更多与收起
        spread () {
            this.flagMore = !this.flagMore
            // 展开
            if (this.flagMore == false) {
                this.allCheck = false
            }
            // 收起
            else {
                // 分类按钮已经选择
                if (this.selectName) {
                    this.allCheck = false
                } else {
                    this.allCheck = true
                }
            }
        },
        viewDetails (id) {
            this.$router.push({
                name: 'details',
                params: { id: id }
            })
        },
        handleApplyJoin (id, name) {
            applyJoin({
                itemId: id,
                msgDesc: '',
                msgType: 1,
                applyStatus: 6,
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
