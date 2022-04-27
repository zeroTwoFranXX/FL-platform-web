<template>
    <Modal v-model="modal">
        <p slot="header" style="text-align:center">
            <span>创建新应用</span>
        </p>
        <div>
            <Form label-position="left"
                  :label-width="100"
                  :model="data"
                  :disabled="type==='query'">
                <FormItem label='应用名称'>
                    <Input placeholder="请输入新应用名称"  v-model="data.name"/>
                </FormItem>
                <FormItem label='所选模型'>
                    <Select  v-model="data.modelName">
                        <Option v-for="item in modelChooseList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label='待评估数据集'>
                    <Select  v-model="data.estimateData">
                        <Option v-for="item in dataChooseList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label='应用创建人'>
                    <Input placeholder="请输入对应用的描述"  v-model="data.appCreator"/>
                </FormItem>
                <FormItem label='创建人电话'>
                    <Input placeholder="请输入创建人电话"  v-model="data.iphone"/>
                </FormItem>
                <FormItem label='创建人邮箱'>
                    <Input placeholder="请输入创建人邮箱"  v-model="data.email"/>
                </FormItem>
                <FormItem label='应用任务状态'>
                    <Select  v-model="data.appStatus">
                        <Option v-for="item in chooseList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label='应用所属机构'>
                    <Input placeholder="请输入应用所属机构"  v-model="data.appOrganization"/>
                </FormItem>
                <FormItem label='应用创建时间'>
                    <div>
                        <Time :time="time" type="date" v-model="data.time"/>
                    </div>
                </FormItem>
                <FormItem label='应用描述'>
                    <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入对应用的描述"  v-model="data.description"/>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button @click="reset">取消</Button>
            <Button type="primary" @click="createNewApplication()">创建</Button>
        </div>
    </Modal>
</template>

<script>
import { CreateApplication } from '@/services/application-management'

export default {
    name: 'newApplication.vue',
    data () {
        return {
            type: '', // 弹窗编辑状态(query/create/update)，默认为查询
            time: (new Date().toLocaleString().split('/').join('-').substring(0, 10)),
            title: '',
            data: {},
            modal: false, // 弹窗开关
            chooseList: [
                {
                    value: 'all',
                    label: '已完成'
                },
                {
                    value: 'unall',
                    label: '运行中'
                },
                {
                    value: 'self',
                    label: '未完成'
                }
            ],
            modelChooseList: [
                {
                    value: '1',
                    label: '瞪羚企业评估模型-SBT'
                },
                {
                    value: '2',
                    label: '高成长企业评估-LR'
                }
            ],
            dataChooseList: [
                {
                    value: '1',
                    label: '东湖区企业数据集（未评估）'
                },
                {
                    value: '2',
                    label: '昌平区企业数据集（未评估）'
                }
            ]
        }
    },
    methods: {
        // 新增模型
        CreateApplication () {
            this.type = 'create'
            this.title = '创建新应用'
            this.resetData()
            this.openEditor()
        },
        createNewApplication () {
            // let _appNumber = this.data.length > 0 ? Math.max(...this.data.map(item => item.appNumber)) + 1 : 1
            // let _time =  this.time
            // this.data.push({ ...this.formItem, appNumber: _appNumber, time: _time })
            // this.modal = false
            // this.formItem = {}
            CreateApplication({ ...this.data }).then((res) => {
                if (res.status === 201) {
                    this.$Message.success({
                        content: '创建成功'
                    })
                    this.closeEditor()
                    this.refreshTable()
                }
                console.log(this.data)
            })
        },
        // 刷新外部表格
        refreshTable () {
            this.$emit('on-ok')
        },
        // 重置搜索
        reset () {
            this.data.name = ''
            this.data.id = ''
            this.data.appCreator = ''
            this.data.modelName = ''
            this.modal = false
        },
        // 初始化表单数据
        resetData () {
            this.data = {
                name: ''
            }
        },
        // 关闭弹窗
        closeEditor () {
            this.modal = false
        },

        // 打开弹窗
        openEditor () {
            this.modal = true
        }

    },
    created () {
        this.resetData()
    }
}
</script>

<style scoped>

</style>
