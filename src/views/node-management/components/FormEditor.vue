<template>
    <Modal v-model="show" :title="title" width="600">
        <Form
            :model="form"
            ref="form"
            :label-width="96"
            :rules="rules"
            :disabled="type==='query'">
            <FormItem label="资源名称:" prop="nodeName" >
                <Input v-model="form.nodeName" style="width: 100%;color:#888baf" placeholder="请输入计算资源名称"></Input>
            </FormItem>
            <FormItem label="资源Ip:" prop="nodeIp" >
                <Input v-model="form.nodeIp" style="width: 100%;color:#888baf" placeholder="请输入计算资源IP"></Input>
            </FormItem>
            <FormItem label="资源节点:" prop="nodePort" >
                <Input v-model="form.nodePort" style="width: 100%;color:#888baf" placeholder="请输入计算资源节点"></Input>
            </FormItem>
        </Form>
        <div slot="footer" >
            <Row justify="space-between">
                <Button v-if="type==='query'" type="primary"  @click="handleOKQuery">确定</Button>
                <template v-else>
                    <div>
                        <Button @click="handleCancel">取消</Button>
                        <!--                        <Button type="primary"  @click="handleOK">确认</Button>-->
                        <Button type="primary" @click="uploadNodeOK">确认</Button>
                    </div>
                </template>
            </Row>
        </div>
    </Modal>
</template>

<script>
import { RemoveNode, GetNode, CreateNode, UpdateNode } from '@/services/node-management'

export default {
    name: 'FormEditor',
    data () {
        return {
            type: 'query',
            show: false,
            title: '',
            // data: {}, // 表单数据
            form: {
                id: '',
                nodeName: '',
                nodeIp: '',
                nodePort: '',
                nodeDesc: ''
            },
            // rules: { // 表单规则
            //     nodeName: [
            //         { required: true, message: '名称不能为空', trigger: 'blur' }
            //     ],
            //     nodeIp: [
            //         { required: true, message: '计算资源IP不能为空', trigger: 'blur' }
            //     ]
                // ,
                // nodePort: [
                //     { required: true, message: '资源节点不能为空', trigger: 'blur' }
                // ]
            // }
        }
    },
    methods: {
        // 查询状态点击确定
        handleOKQuery () {
            this.closeEditor()
        },
        // 查询状态点击确定
        uploadNodeOK () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.type === 'create') {
                        CreateNode({ ...this.form }).then((res) => {
                            if (res.data && res.data.code === 200) {
                                this.$Message.success({
                                    content: res.data.msg
                                })
                                this.closeEditor()
                                this.refreshTable()
                            }
                        })
                    } else if (this.type === 'update') {
                        UpdateNode({ ...this.form }).then(res => {
                            if (res.data && res.data.code === 200) {
                                this.$Message.success({
                                    content: res.data.msg
                                })
                                this.closeEditor()
                                this.refreshTable()
                            }
                        })
                    }
                }
            })
        },
        // 新增节点
        CreateNode () {
            this.type = 'create'
            this.title = '创建节点'
            this.resetData()
            this.openEditor()
        },
        // 查看节点
        QueryNode (id) {
            this.type = 'query'
            this.title = '查看节点'
            this.resetData()
            this.getNode(id)
            this.openEditor()
        },

        // 删除节点
        RemoveNode (id) {
            console.log(id)
            this.removeNode(id)
        },
        // 删除节点
        async removeNode (id) {
            let { data } = await RemoveNode([id])
            console.log(id)
            console.log('remove data: ' + data)
            if (data && data.code === 200) {
                this.$Message.success({
                    content: data.msg
                })
                this.refreshTable()
            }
        },
        // 修改节点
        UpdateNode (e) {
            this.type = 'update'
            this.title = '修改节点'
            this.resetData()
            this.getNode(e)
            this.openEditor()
        },
        // 查询计算资源状态
        async getNode (e) {
            console.log(e.nodePort)
            this.form.id=e.id
            this.form.nodeName = e.nodeName
            this.form.nodeIp = e.nodeIp
            this.form.nodePort = e.nodePort
        },
        // 刷新外部表格
        refreshTable () {
            this.$emit('on-ok')
        },
        // 初始化表单数据
        resetData () {
            this.form = {
                nodeName: '',
                nodeIp: '',
                nodePort: ''
            }
        },
        // 打开弹窗
        openEditor () {
            this.show = true
        },
        // 关闭弹窗
        closeEditor () {
            this.show = false
        },
        // 新增修改状态时点击取消
        handleCancel () {
            this.closeEditor()
        },
        DEV_CREATE () {
            // if (!this.IS_DEV) return
        }
    }
}
</script>

<style scoped>

</style>
