<template>
    <Modal v-model="modal1" :title="title" width="600">
    <!--弹窗内容-->
        <Form
            :label-width="96"
            :disabled="type==='query'">
            <div v-if="this.tableData.applyStatus===0||this.tableData.applyStatus===3||this.tableData.applyStatus===6">
                <p v-if="this.msgStatus==1">
                    {{this.tableData.receiverName}}用户申请使用您的{{this.tableData.itemId}}应用，您是否同意{{this.tableData.receiverName}}的友好申请？
                </p>
                <p v-if="this.msgStatus==2">
                    {{this.tableData.receiverName}}用户的消息已经处理成功！！
                </p>

            </div>
            <div v-if="this.tableData.applyStatus===9">
                <p v-if="this.msgStatus==1">
               {{this.tableData.receiverName}}用户申请退出{{this.tableData.itemName}}项目，您是否同意{{this.tableData.receiverName}}的退出申请？
                </p>
                <p v-if="this.msgStatus==2">
                    {{this.tableData.receiverName}}用户的消息已经处理成功！！
                </p>
           </div>
           <div v-if="this.tableData.applyStatus===12">
               <p v-if="this.msgStatus==1">
               {{this.tableData.receiverName}}用户邀请您加入{{this.tableData.itemName}}项目，您是否接受{{this.tableData.receiverName}}的诚挚邀请？
               </p>
               <p v-if="this.msgStatus==2">
                   {{this.tableData.receiverName}}用户的消息已经处理成功！！
               </p>
           </div>
        </Form>
    <!--弹窗脚部-->
        <div slot="footer" >
            <Row justify="space-between" v-if="this.tableData.applyStatus===0||this.tableData.applyStatus===3||this.tableData.applyStatus===6">
                <p v-if="this.msgStatus==1">
                    <Button v-if="type==='query'" type="primary"  @click="acceptBatchMessage">同意用户申请</Button>
                    <Button v-if="type==='query'" type="primary"  @click="unacceptBatchMessage">拒绝用户申请</Button>
                </p>

            </Row>
            <Row justify="space-between"  v-if="this.tableData.applyStatus===9">
                <p v-if="this.msgStatus==1">
                <Button v-if="type==='query'" type="primary"  @click="acceptBatchMessage">同意用户退出</Button>
                <Button v-if="type==='query'" type="primary"  @click="unacceptBatchMessage">拒绝用户退出</Button>
                </p>
            </Row>
            <Row justify="space-between"  v-if="this.tableData.applyStatus===12">
                <p v-if="this.msgStatus==1">
                <Button v-if="type==='query'" type="primary"  @click="acceptBatchMessage">接受用户邀请</Button>
                <Button v-if="type==='query'" type="primary"  @click="unacceptBatchMessage">拒绝用户邀请</Button>
                </p>
            </Row>
        </div>
    </Modal>
</template>
<script>
import {RemoveMessage,AuthorizationBatchMessage,GetMessage} from "@/services/message";

export default {
    name: "FormEditor",
    data () {
    return {
        IS_DEV: false, // 开发辅助控制
        title: '',
        accept:110,
        msgStatus:'',
        acceptApplication:'1',
        unAcceptApplication:'2',
        acceptData:'4',
        unAcceptData:'5',
        acceptProject:'7',
        unAcceptProject:'8',
        flag:'',
        unFlag:'',
        type: '', // 弹窗编辑状态(query)
        modal1: false, // 弹窗开关
        Batch:[],
        // applyStatus:'',
        tableData: '' // 表单数据

    }
},
    methods: {
    // 查看模型
    QueryMessage (row) {
        this.type = 'query'
        this.title = '查看消息详情'
        this.resetData()
        this.getMessage(row.id)
        this.msgStatus=row.msgStatus
        this.modal1 = true
        // this.opeditor()
    },

    // 新增模型
    // CreateModel () {
    //     console.log('新增模型')
    //     this.type = 'create'
    //     this.title = '创建模型'
    //     this.resetData()
    //     this.openEditor()
    // },

    // 修改模型
    // UpdateModel (id) {
    //     this.type = 'update'
    //     this.title = '修改模型'
    //     this.resetData()
    //     this.getModel(id)
    //     this.openEditor()
    // },
    // 删除模型
    // RemoveModel (id) {
    //     this.removeModel(id)
    // },

    // 查询模型状态
    async getMessage (id) {
        GetMessage(id).then((response) =>{
            this.tableData=response.data.data
        })

    },

        // 删除消息
        RemoveMessage (id) {
            this.removeMessage(id)
        },
        // 删除消息
        async removeMessage (id) {
            let { data } = await RemoveMessage([id])
            console.log('remove data: ' + data)
            if (data && data.code === 200) {
                this.$Message.success({
                    content: "删除成功！！"
                })
                this.refreshTable()
            }
        },

    // 查询状态点击确定
    // handleOKQuery () {
    //     this.closeEditor()
    // },
        // 接受用户请求
        acceptBatchMessage(){
        if (this.tableData.applyStatus===0){
            this.flag=1
        }else if (this.tableData.applyStatus===3){
            this.flag=4
        }else if (this.tableData.applyStatus===6){
            this.flag=7
        }else if (this.tableData.applyStatus===9){
            this.flag=10
        }else if (this.tableData.applyStatus===12){
            this.flag=13
        }
            // this.Batch.push(this.tableData.receiverId)
            AuthorizationBatchMessage({
                itemId:this.tableData.itemId,
                msgType:this.tableData.msgType,
                applyStatus:this.flag,
                msgId:this.tableData.id,
                senderId:this.tableData.senderId
            }).then((response)=> {
                if(response.data.code === '200'){
                    this.$Message.success(response.data.msg)
                    this.closeEditor()
                    this.refreshTable()
                }
            })
        },
        // 拒绝用户请求
        unacceptBatchMessage(){

            if (this.tableData.applyStatus===0){
                this.unFlag=2
            }else if (this.tableData.applyStatus===3){
                this.unFlag=5
            }else if (this.tableData.applyStatus===6){
                this.unFlag=8
            }else if (this.tableData.applyStatus===9){
                this.unFlag=11
            }else if (this.tableData.applyStatus===12){
                this.unFlag=14
            }
            AuthorizationBatchMessage({
                itemId:this.tableData.itemId,
                msgType:this.tableData.msgType,
                applyStatus:this.unFlag,
                msgId:this.tableData.id,
                senderId:this.tableData.senderId
            }).then((response)=> {
                if(response.data.code === '200'){
                    this.$Message.success(response.data.msg)
                    this.closeEditor()
                    this.refreshTable()
                }

            })
        },
        // 同意用户退出
        // quitBatchMessage(){
        //     this.Batch.push(this.data.receiverId)
        //     AuthorizationBatchMessage({
        //         itemId:this.data.itemId,
        //         msgType:this.data.msgType,
        //         applyStatus:10,
        //         userBatchId:this.Batch
        //     }).then((response)=> {
        //         if (response.status == 200) {
        //             this.$Message.success({
        //                 content: '同意用户退出的请求！！'
        //             })
        //             this.closeEditor()
        //             this.refreshTable()
        //         }
        //     })
        // },
        // // 拒绝用户退出
        // rejectQuitBatchMessage(){
        //     this.Batch=[]
        //     this.Batch.push(this.data.receiverId)
        //     AuthorizationBatchMessage({
        //         itemId:this.data.itemId,
        //         msgType:this.data.msgType,
        //         applyStatus:11,
        //         userBatchId:this.Batch
        //     }).then((response)=> {
        //         if (response.status == 200) {
        //             this.$Message.success({
        //                 content: '拒绝用户退出的请求！！'
        //             })
        //             this.closeEditor()
        //             this.refreshTable()
        //         }
        //     })
        // },
        // // 接受用户邀请
        // invitationBatchMessage(){
        //     this.Batch.push(this.data.receiverId)
        //     AuthorizationBatchMessage({
        //         itemId:this.data.itemId,
        //         msgType:this.data.msgType,
        //         applyStatus:13,
        //         userBatchId:this.Batch
        //     }).then((response)=> {
        //         if (response.status == 200) {
        //             this.$Message.success({
        //                 content: '接受用户的邀请！！'
        //             })
        //             this.closeEditor()
        //             this.refreshTable()
        //         }
        //     })
        // },
        // // 拒绝用户邀请
        // rejectInvitationBatchMessage(){
        //     this.Batch.push(this.data.receiverId)
        //     AuthorizationBatchMessage({
        //         itemId:this.data.itemId,
        //         msgType:this.data.msgType,
        //         applyStatus:14,
        //         userBatchId:this.Batch
        //     }).then((response)=> {
        //         if (response.status == 200) {
        //             this.$Message.success({
        //                 content: '拒绝用户的邀请！！'
        //             })
        //             this.closeEditor()
        //             this.refreshTable()
        //         }
        //     })
        // },
    // 编辑修改状态时点击确定
    // handleOK () {
    //     this.$refs.form.validate((valid) => {
    //         if (valid) {
    //             this.setProjectName()
    //             if (this.type === 'create') {
    //                 CreateModel({ ...this.data }).then((res) => {
    //                     if (res.data && res.data.code === 200) {
    //                         this.$Message.success({
    //                             content: res.data.msg
    //                         })
    //                         this.closeEditor()
    //                         this.refreshTable()
    //                     }
    //                 })
    //             } else if (this.type === 'update') {
    //                 UpdateModel({ ...this.data }).then(res => {
    //                     if (res.data && res.data.code === 200) {
    //                         this.$Message.success({
    //                             content: res.data.msg
    //                         })
    //                         this.closeEditor()
    //                         this.refreshTable()
    //                     }
    //                 })
    //             }
    //         }
    //     })
    // },

    // 新增修改状态时点击取消
    handleCancel () {
        this.closeEditor()
    },

    // 关闭弹窗
    closeEditor () {
        this.modal1 = false
    },

    // 打开弹窗
    openEditor () {
        this.show = true
    },

    // 刷新外部表格
    refreshTable () {
        this.$emit('on-ok')
    },

    // 初始化表单数据
    resetData () {
        this.tableData = { ...this.tableData }
    }
},
    created () {
    this.resetData()
}
}
</script>

<style scoped>

</style>
