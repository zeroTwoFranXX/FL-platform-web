<template>
    <Modal v-model="show" :title="title" width="600">
        <Form
            :model="form"
            ref="form"
            :label-width="96"
            :rules="rules"
            :disabled="type==='query'">
<!--            <FormItem label="项目id" prop="id" >-->
<!--                <Input v-model="data_default.id" style="width: 100%;color:#888baf" placeholder="请输入项目id"></Input>-->
<!--            </FormItem>-->
            <FormItem label="项目名称" prop="projName" >
                <Input v-model="form.projName" style="width: 100%;color:#888baf" placeholder="请输入项目名称"></Input>
            </FormItem>
            <FormItem label="项目类型" prop="projTypeCode" >
<!--<Input v-model="data_default.projType" style="width: 100%;color:#888baf" placeholder="请输入项目类型"></Input>-->
            <Select  placeholder="请选择"  v-model="form.projTypeCode">
                <Option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code"></Option>
            </Select>
            </FormItem>
            <FormItem label="项目描述：" prop="projDesc">
                <Input v-model="form.projDesc" type="textarea" :autosize="{minRows: 4,maxRows: 8}" style="width: 100%;" placeholder="请输入项目描述"></Input>
            </FormItem>
            <FormItem label="上传图片:" prop="file">
                <Upload
                    ref="upload"

                    :data="form.file"
                    :show-upload-list="false"
                    :before-upload="handleBeforeUpload"
                    action="">
                    <Button icon="ios-cloud-upload-outline">图片上传</Button>
                </Upload>
            </FormItem>
            <FormItem>
                <div>
<!--                    <img style="height: 62px" :src="this.imgPath">-->
                    <img v-if="imgPath != null || imgPath != ''" style="height:62px" :src="this.imgPath">
                </div>
            </FormItem>
        </Form>
        <div slot="footer" >
            <Row justify="space-between">
                <Button v-if="type==='query'" type="primary"  @click="handleOKQuery">确定</Button>
                <template v-else>
                    <div>
                        <Button @click="handleCancel">取消</Button>
<!--                        <Button type="primary"  @click="handleOK">确认</Button>-->
                        <Button type="primary" @click="uploadFile">确认</Button>
                    </div>
                </template>
            </Row>
        </div>
    </Modal>
</template>

<script>

import {CreateProject, GetProject, UpdateProject, RemoveProject, ExitProject} from '@/services/project-management.js'
import { projUpload } from '@/services/api/uploadTest'
import { ProjectTypeList } from '../../../services/project-management'
import {BASE_URL} from "@/public/configs/config";
export default {
    name: 'FormEditor',
    data () {
        return {
            ProjectType: [],
            IS_DEV: true,
            title: '',
            type: '', // 弹窗编辑状态(query/create/update)，默认为查询
            show: false, // 弹窗开关
            imgPath:'',
            data: {}, // 表单数据
            file: [],
            dataList: {},
            form: {
                id: '',
                projName: '',
                projTypeCode: '',
                projDesc: '',
                publicFlag: ''

            },
            rules: {

                projName: [
                    { required: true, message: '名称不能为空!', trigger: 'blur' }
                ],
                projDesc: [
                    { required: true, message: '描述不能为空!', trigger: 'blur' }
                ]
            } // 表单规则
        }
    },
    mounted () {
        this.getProjectList()
    },
    methods: {
         // handleChange (file, fileList) {
         //     this.form.file = URL.createObjectURL(file.raw);
         // },
            getProjectList () {
            ProjectTypeList({ ...this.data }).then((response) => {
                if (response.data.code == 200) {
                    this.dataList = response.data.data
                }
            })
        },
        handleBeforeUpload (file) {
            // 修改了头像
            this.files = [file]
            // this.name = file.name
            // console.log(this.files[0])
            this.imgPath = window.webkitURL.createObjectURL(file)
            // return false
            return false
        },
        uploadFile () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let formData = new FormData()
                    if (this.type === 'create') {
                        // let formData = new FormData()
                        formData.append('projName', this.form.projName)
                        formData.append('projTypeCode', this.form.projTypeCode)
                        formData.append('projDesc', this.form.projDesc)
                        // 多个文件上传
                        for (let i = 0; i < this.files.length; i++) {
                            formData.append('file', this.files[i]) // 文件对象
                        }
                        projUpload(formData).then(res => {
                            if (res.data.code===409){
                                this.$Message.success({
                                    content:'项目名称已经存在，请重新创建！ '
                                })
                                console.log('uploadFile', res.data.data)
                                this.closeEditor()
                                this.refreshTable()
                                this.resetData()
                            }else if (res.data.code===200){
                                this.$Message.success({
                                    content:'项目添加成功 '
                                })
                                console.log('uploadFile', res.data)
                                this.closeEditor()
                                this.refreshTable()
                                this.resetData()
                            }

                        })
                        this.closeEditor()
                    } else if (this.type === 'update') {
                        formData.set('id', this.form.id)
                        formData.set('projName', this.form.projName)
                        formData.set('projTypeCode', this.form.projTypeCode)
                        formData.set('projDesc', this.form.projDesc)
                        // formData.set('projPic', this.form.projPic)
                        console.log(1)
                        console.log(this.files)

                        // 多个文件上传
                        for (let i = 0; i < this.files.length; i++) {
                            formData.append('file', this.files[i]) // 文件对象
                        }
                        formData.forEach((value, key) => {
                            console.log("key %s: value %s", key, value);
                        })
                        projUpload(formData).then(res => {
                            if (res.status === 200) {
                                this.$Message.success({
                                    content: '修改成功'
                                })
                                this.closeEditor()
                                this.refreshTable()
                                this.resetData()
                            }
                        })
                    }
                }
            })
        },
        // 删除项目
        RemoveProject (id) {
            this.removeProject(id)
        },
        // 退出项目
        ExitProject (id) {
            this.exitProject(id)
        },

        // 退出项目
        exitProject(id){
            ExitProject({
                    itemId:id,
                    msgType:1,
                    applyStatus:9
                }).then((response) =>{
                this.$Message.success(response.data.data)
            })
        },

        // 删除项目
        async removeProject (id) {
                console.log(id)
            let { data } = await RemoveProject([id])
            console.log('remove data: ' + data)
            if (data && data.code === 200) {
                this.$Message.success({
                    content: data.msg
                })
                this.refreshTable()
            }
        },
        // 查看项目
        QueryProject (porNumber) {
            this.type = 'query'
            this.title = '新增模型'
            this.resetData()
            this.getProject(porNumber)
            this.openEditor()
        },

        // 新增项目
        CreateProject () {
            this.type = 'create'
            this.title = '创建项目'
            this.resetData()
            this.openEditor()
        },

        // 修改项目
        UpdateProject (e) {
            this.type = 'update'
            this.title = '修改项目'
            this.resetData()
            this.getProject(e)
            this.openEditor()
        },

        // 查询项目状态
        async getProject (e) {
            this.form.id = e.id
            this.form.projName = e.projName
            this.form.projDesc = e.projDesc
            this.form.projTypeCode = e.projTypeCode
            if (e.projPic){
                this.imgPath=BASE_URL+e.projPic
            }

        },

        // 查询状态点击确定
        handleOKQuery () {
            this.closeEditor()
        },

        // 编辑修改状态时点击确定
        handleOK () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.type === 'create') {
                        // CreateProject({ ...this.data }).then((res) => {
                        //     console.log(res)
                        //     if (res.status === 200) {
                        //         this.$Message.success({
                        //             content: '创建成功'
                        //         })
                        //         this.closeEditor()
                        //         this.refreshTable()
                        //     }
                        // })
                    } else if (this.type === 'update') {
                        UpdateProject({ ...this.data }).then(res => {
                            if (res.status === 200) {
                                this.$Message.success({
                                    content: '修改成功'
                                })
                                this.closeEditor()
                                this.refreshTable()
                            }
                        })
                    }
                }
            })
        },

        // 新增修改状态时点击取消
        handleCancel () {
            this.closeEditor()
        },

        // 关闭弹窗
        closeEditor () {
            this.show = false
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
            this.imgPath='',
            this.form = {
                // id:'',
                projName: '',
                projType: '',
                projDesc: '',
                publicFlag: '',
                projPic: ''

            }
        },

        DEV_CREATE () {
            if (!this.IS_DEV) return
        }
    },
    created () {
        this.resetData()
    }
}

</script>

<style lang="less" scoped>
</style>
