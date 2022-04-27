<template>
    <Card onscroll="true">
        <div class="header">
            <Button class="button"  @click="handleAllMessage" type="primary">全部类型信息</Button>
            <Button class="button"  @click="handleProjectMessage(1)" type="primary">项目信息</Button>
            <Button class="button"  @click="handleDataMessage(2)" type="primary">数据集信息</Button>
            <Button class="button"  @click="handleApplicationMessage(3)" type="primary">应用信息</Button>
<!--            <Button class="back" type="primary">返回</Button>-->
        </div>
        <!--    <div class="div2" >-->
        <Card style ="margin-bottom:20px">
<!--                    所有数据列表-->
                    <Table border :columns='columns' :data='data'>
                        <template slot-scope="{ row }" slot="msgType">
                            <strong v-if="row.msgType===1">项目</strong>
                            <strong v-if="row.msgType===2">数据集</strong>
                            <strong v-if="row.msgType===3">应用</strong>
                        </template>
                        <template slot-scope="{ row }" slot="msgStatus">
                            <strong v-if="row.msgStatus==1">未读信息</strong>
                            <strong v-if="row.msgStatus==2">已读信息</strong>
<!--                            <strong v-if="row.msgStatus==3">已删除</strong>-->
                        </template>
                        <template slot-scope="{ row }" slot="action">
                            <Button type="primary" style="margin-right: 5px" @click="handleQuery(row)">查看详情</Button>
                            <Poptip
                                confirm
                                transfer
                                title="确定删除?"
                                @on-ok="handleRemove(row.id)">
                                <Button type="primary">删除</Button>
                            </Poptip>
                        </template>
                    </Table>

                    <!-- 分页区域 -->
                    <Col style='text-align: right; padding: 8px 0'>
                        <Page  show-total
                               show-elevator
                               :current="currentPageNum"
                               :total="dataCount"
                               :page-size="pageSize"
                               @on-change="handlePageChange">
                        </Page>
                    </Col>
        </Card>
        <form-editor ref="editor" @on-ok="queryMessageList"></form-editor>
    </Card>
</template>

<script>
import {QueryMessageList} from "@/services/message";
import {handleRequestParams} from "@/common/helpers/params";
import FormEditor from "@/views/message-center/components/FormEditor";

export default {
    name: "index.vue",
    components: {
        FormEditor
    },
    data () {
    return {
        data:[],
        dataCount: 0,// 分页合计
        currentPageNum: 1,// 分页页码
        pageSize: 10, // 分页页数
        searchBy:'msgType',
        searchContent:'',
        searchAllMessage:'',
        searchProjectMessage:'',
        searchDataMessage:'',
        searchApplicationMessage:'',
        queryParams: {
            allMessage:'',
            projectMessage:'',
            dataMessage:'',
            applicationMessage:''
        },
        number: 0,
        // 全部消息列表
        columns: [
            {
                title: '消息标题',
                key: 'title',
                align: 'center',
                width: 200
            },
            {
                title: '消息描述',
                key: 'msgDesc',
                align: 'center'
            },
            {
                title: '消息类型',
                key: 'msgType',
                align: 'center',
                slot:'msgType',
                width: 200
            },
            {
                title: '消息状态',
                key: 'msgStatus',
                align: 'center',
                slot: 'msgStatus',
                width: 200
            },
            {
                title: '创建时间',
                key: 'createTime',
                align: 'center',
                width: 200,
                sortable: true
            },
            {
                title: '操作',
                width: 200,
                key: 'action',
                slot: 'action',
                align: 'center'
            }
        ]
    }
},
created () {
        this.queryMessageList()
},
methods: {
    // 删除消息
    handleRemove (id) {
        this.$refs.editor.RemoveMessage(id)
    },
        // 请求消息列表
    queryMessageList(){
        QueryMessageList({
            searchBy:this.searchBy,
            searchContent:this.searchContent,
            limit:this.pageSize,
            page:this.currentPageNum
        }).then((response)=>{
            if (response){
                this.dataCount=response.data.data.totalCount
                this.data=response.data.data.list
                console.log(this.data)
                console.log(this.searchContent)
            }
        })
    },
    // 查询消息
    handleQuery (row) {
        this.$refs.editor.QueryMessage(row)


    },
    // 全部信息
    handleAllMessage(){
        this.queryParams.allMessage = this.searchAllMessage
        this.queryParams.projectMessage= this.projectMessage
        this.queryParams.dataMessage=this.searchDataMessage
        this.queryParams.applicationMessage=this.searchApplicationMessage
        this.searchContent=handleRequestParams(this.queryParams).searchContent
        this.currentPageNum = 1
        this.queryMessageList()
    },
    // 项目信息
    handleProjectMessage(index){
        this.queryParams.allMessage = this.searchAllMessage
        this.queryParams.projectMessage= index
        this.queryParams.dataMessage=this.searchDataMessage
        this.queryParams.applicationMessage=this.searchApplicationMessage
        this.searchContent=handleRequestParams(this.queryParams).searchContent
        this.currentPageNum = 1
        this.queryMessageList()
    },
    // 数据信息
    handleDataMessage(index){
        this.queryParams.allMessage = this.searchAllMessage
        this.queryParams.projectMessage= this.searchProjectMessage
        this.queryParams.dataMessage=index
        this.queryParams.applicationMessage=this.searchDataMessage
        this.searchContent=handleRequestParams(this.queryParams).searchContent
        this.currentPageNum = 1
        this.queryMessageList()
    },
    // 应用信息
    handleApplicationMessage(index){
        this.queryParams.allMessage = this.searchAllMessage
        this.queryParams.projectMessage= this.searchProjectMessage
        this.queryParams.dataMessage=this.searchDataMessage
        this.queryParams.applicationMessage=index
        this.searchContent=handleRequestParams(this.queryParams).searchContent
        this.currentPageNum = 1
        this.queryMessageList()
    },
    // 分页页码变化
    handlePageChange (pageNum) {
        this.currentPageNum = pageNum
        this.queryMessageList()
    }
}
}
</script>

<style scoped>
.header{
    margin: 50px;
}
.button{
    margin-right: 20px;
}
.back{
    float: right;
    margin: 50px;
}

</style>
