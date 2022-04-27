<template>
<!-- 子数据集管理 -->
  <Card>
     <div>
      <Row style="margin-top:20px" >
        <Form ref="search" :model="search">
          <Col span="4">
            <FormItem prop="infoNode">
              <span style="display: inline-block;width:70px">选择节点:</span>
              <Select v-model="search.infoNode" style="width:170px" placeholder="请选择节点">
                <Option value="1">节点1</Option>
                <Option value="2">节点2</Option>
                <Option value="3">节点3</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem prop="id">
              <span style="display: inline-block;width:80px">数据集编号:</span>
              <Input v-model="search.id" style="width:170px" placeholder="请输入数据集编号" clearable/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem prop="datasetName">
              <span style="display: inline-block;width:80px;">数据集名称:</span>
              <Input v-model="search.datasetName" style="width:170px" placeholder="请输入创建人" clearable/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem prop="creatorName">
              <span style="display: inline-block;width:50px;">创建人:</span>
              <Input v-model="search.creatorName" style="width:170px" placeholder="请输入创建人" clearable/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <Button style="margin-left: 50px;" @click="reset">重置</Button>
              <Button type="primary" style="margin-left: 15px;" @click="handleGetList">搜索</Button>
              <Button type="primary" style="margin-left: 15px;" @click="OpenMlNew">创建</Button>
              <Button type="primary" style="margin-left: 15px;" @click="toCenter">中央数据集管理 <Icon type="ios-arrow-forward"></Icon></Button>
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row >
        <Table :columns="columns" :data="dataList" style="width:100%" border></Table>
      </Row>
      <Row style="margin-top: 8px;" type="flex" justify="end">
        <Page :current="currentPageIndex + 1"
        :total="dataTotal"
        :page-size="pageSize"
        @on-change="handlePageChange"
        show-elevator
        show-total
        style="padding: 10px;"></Page>
      </Row>
      <!-- 数据集创建弹窗 -->
      <Modal
        v-model="mlNew"
        title= '数据集创建'
        :loading="loading"
        :mask-closable="false"
        @on-ok="okNew"
        @on-cancel="cancelNew"
        class-name="vertical-center-modal">
        <Form ref="fmNew" :model="fmNew" :rules="ruleFmNew" :label-width="100">
          <FormItem label="数据集名称:" prop="name">
            <Input v-model="fmNew.name" style="width:250px" placeholder="请输入数据集名称"  clearable />
          </FormItem>
          <FormItem label="公开程度:" prop="openness">
            <Select v-model="fmNew.openness" style="width:250px" placeholder="请选择公开程度" clearable>
              <Option  value=1>公开</Option>
              <Option value=0>不公开</Option>
              <!-- <Option value='仅自己可见'>仅自己可见</Option> -->
            </Select>
          </FormItem>
          <FormItem label="数据集描述:" prop="desc">
            <Input v-model="fmNew.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入数据集描述"></Input>
          </FormItem>
        </Form>
      </Modal>
      <!-- 页面跳转弹窗 -->
      <Modal
        v-model="mlToCenter"
        class-name="vertical-center-modal">
        <div>
          <p slot="header" style="text-indent:10px;font-size:20px;margin:10px 0">
            <Icon type="ios-alert" size="26" color="#FF9900" style="margin:0 5px"></Icon>
            <span style="font-weight: 500;">跳转中央数据集管理页面</span>
          </p>
        </div>
        <div style="padding-left:30px;padding-top:10px;padding-bottom:10px">
          <span style="text-indent:4em;text-align:left">中央数据集管理只对元数据进行查看与授权，不能对元数据进行修改操作。</span>
        </div>
        <div slot="footer">
          <Button type="text" @click="toCenterCancel" style="margin-right:5px">取消</Button>
          <Button  type="primary" @click="toCenterOk" >确认</Button>
        </div>
      </Modal>
       <!-- 详情弹窗 -->
      <Modal
        v-model="mlDeatils"
        width='800px'
        :loading="loading"
        :mask-closable="false"
        class-name="vertical-center-modal">
        <div slot="header" >
            <div v-if="this.detailBox.jobClassName=='无权限'">数据集详情</div>
            <div v-if="this.detailBox.jobClassName=='有权限'">数据集编辑</div>
        </div>
        <Form ref="fmDetails" :model="fmDetails" :label-width="100">
          <Row type="flex" justify="center">
            <Col span="10" >
              <FormItem label="数据集ID：">
                <span>{{this.detailBox.jobClassName}}</span>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="数据集名称：">
                <span v-if="this.detailBox.jobClassName=='无权限'">{{this.detailBox.jobClassName}}</span>
                <Input v-if="this.detailBox.jobClassName=='有权限'" v-model="fmDetails.name" placeholder="请输入数据集名称"  clearable />
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="10" >
              <FormItem label="创建人:">
                <span>{{this.detailBox.jobClassName}}</span>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="联系电话:">
                <span v-if="this.detailBox.jobClassName=='无权限'">{{this.detailBox.jobClassName}}</span>
                <Input v-if="this.detailBox.jobClassName=='有权限'" v-model="fmDetails.tel" placeholder="请输入联系人电话"  clearable />
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="10" >
              <FormItem label="数据源类型:">
                <span>{{this.detailBox.jobClassName}}</span>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="公开程度:">
                <span v-if="this.detailBox.jobClassName=='无权限'">{{this.detailBox.jobClassName}}</span>
                  <Select v-if="this.detailBox.jobClassName=='有权限'" v-model="fmDetails.publicType"   placeholder="请选择公开程度" clearable>
                    <Option value='day'>公开程度A</Option>
                    <Option value='week'>公开程度B</Option>
                    <Option value='month'>公开程度C</Option>
                    <Option value='own'>公开程度D</Option>
                  </Select>
                </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="20">
              <FormItem label="数据集描述:" >
                <span v-if="this.detailBox.jobClassName=='无权限'">{{this.detailBox.jobClassName}}</span>
                <Input v-if="this.detailBox.jobClassName=='有权限'" v-model="fmDetails.desc" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入数据集描述"  clearable />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div v-if="this.detailBox.jobClassName=='有权限'" slot="footer">
          <Button type="text" @click="cancelDetails" style="margin-right:5px">取消</Button>
          <Button  type="primary" @click="details" >确认</Button>
        </div>
        <div v-if="this.detailBox.jobClassName=='无权限'" slot="footer">
          <Button  type="primary" @click="cancelDetails" >关闭</Button>
        </div>
      </Modal>
      <!-- 中央数据注册弹窗 -->
      <Modal
        v-model="mlCenter"
        class-name="vertical-center-modal">
        <div>
          <p slot="header" style="text-indent:10px;font-size:20px;margin:10px 0">
            <Icon type="ios-alert" size="26" color="#FF9900" style="margin:0 5px"></Icon>
            <span style="font-weight: 500;">中央数据注册</span>
          </p>
        </div>
        <div style="padding-left:30px;padding-top:10px;padding-bottom:10px">
          <span style="text-indent:4em;text-align:left">数据集描述信息以及元数据信息将上传至中央节点。仍需您授权给他人使用。您确定要注册吗？</span>
        </div>
        <div slot="footer">
          <Button type="text" @click="cancelCenter" style="margin-right:5px">取消</Button>
          <Button  type="primary" @click="registerCen" >确认</Button>
        </div>
      </Modal>
      <!-- 删除弹窗 -->
      <Modal
        v-model="mlDel"
        class-name="vertical-center-modal">
        <div>
          <p slot="header" style="text-indent:10px;font-size:20px;margin:10px 0">
            <Icon type="ios-alert" size="26" color="#FF9900" style="margin:0 5px"></Icon>
            <span style="font-weight: 500;">删除</span>
          </p>
        </div>
        <div style="padding-left:30px;padding-top:10px;padding-bottom:10px">
          <span style="text-indent:4em;text-align:left">删除之后数据不能恢复，确定删除吗？</span>
        </div>
        <div slot="footer">
          <Button type="text" @click="cancelDel" style="margin-right:5px">取消</Button>
          <Button  type="primary" @click="del" >确认</Button>
        </div>
      </Modal>
      <!-- 导入CSV弹窗 -->
      <Modal
        v-model="mlImport"
        title="导入CSV文件"
        class-name="vertical-center-modal"
        @on-ok="uploadFile"
        @on-cancel="cancelSubmit">
        <div style="width: 500px">
          <Upload
            ref="upload"
            type="drag"
            :before-upload="handleUpload"
            action="">
            <Button icon="ios-cloud-upload-outline" style="margin: 5px">上传文件</Button>
            <div>{{ fileName }}</div>
            <p>支持拖拽到此处上传</p>
          </Upload>
        </div>
      </Modal>
     </div>
   </Card>
</template>

<script>

import { CreateDataset, UploadFile, RegisterCenData, GetList } from '@/services/api/data-preparation.js'
import { handleRequestParams } from '@/common/helpers/params'
// import { Upload } from 'view-design'
export default {
    data () {
        return {
            searchBy: '',
            searchContent: '',
            search: {
                id: '',
                datasetName: '',
                creatorName: '',
                infoNode: ''
            },
            infoNode: '',
            // 分页
            dataTotal: 0,
            pageSize: 5,
            currentPageIndex: 0,
            // 表格
            tableList: [],
            dataList: [],
            columns: [
                {
                    title: '序号',
                    align: 'center',
                    width: 70,
                    render: (h, params) => {
                        return h('span', params.index + (this.currentPageIndex) * this.pageSize + 1)
                    }
                },
                {
                    key: 'id',
                    title: '编号',
                    align: 'center'
                },
                {
                    key: 'datasetName',
                    title: '数据集名称',
                    align: 'center'
                },
                {
                    key: 'datasetDesc',
                    title: '数据集描述',
                    align: 'center'
                },
                {
                    key: 'creatorName',
                    title: '数据集创建人',
                    align: 'center'
                },
                {
                    key: 'creatorPhone',
                    title: '创建人联系方式',
                    align: 'center'
                },
                {
                    key: 'openLevel',
                    title: '公开程度',
                    align: 'center'
                },
                {
                    key: 'action',
                    title: '操作',
                    width: 370,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            (params.row.openLevel == '不公开') && h('a', {
                                style: {
                                    // color:'#00509D',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.toMetaDtl(params.row)
                                    }
                                }
                            }, '元数据详情'),
                            h('a', {
                                style: {
                                    // color:'#00509D',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.toMetaConfig(params.row)
                                    }
                                }
                            }, '元数据配置'),
                            (params.row.openLevel == '公开') && h('a', {
                                style: {
                                    // color:'#00509D',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.openMlCenter(params.row)
                                    }
                                }
                            }, '中央数据注册'),
                            (params.row.openLevel == '公开') && h('a', {
                                style: {
                                    // color:'#00509D',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.openMlImport(params.row)
                                    }
                                }
                            }, '导入CSV'),
                            (params.row.openLevel === '公开') && h('a', {
                                style: {
                                    color: '#ff9900',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.handleDetails(params.row)
                                    }
                                }
                            }, '编辑'),
                            (params.row.openLevel === '不公开') && h('a', {
                                style: {
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.handleDetails(params.row)
                                    }
                                }
                            }, '详情'),
                            (params.row.openLevel == '公开') && h('a', {
                                style: {
                                    color: 'red',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.handleDel(params.row)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            // 数据集创建弹窗
            mlNew: false,
            fmNew: {
                id: '',
                name: '',
                desc: '',
                openness: ''
            },
            ruleFmNew: {
                name: [
                    { required: true, message: '请输入数据集名称', trigger: 'blur' }
                ],
                openness: [
                    { required: true, message: '请选择公开程度' }
                ]
            },
            // 页面跳转弹窗
            mlToCenter: false,
            // 详情弹窗
            detailBox: '',
            mlDeatils: false,
            loading: true,
            fmDetails: {
                id: '',
                name: '',
                creater: '',
                tel: '',
                dataType: '',
                publicType: '',
                desc: ''
            },
            // 中央数据注册弹窗
            mlCenter: false,
            // 删除弹窗
            mlDel: false,
            // 导入CSV弹窗
            mlImport: false,
            fileName: '',
            file: ''
        }
    },
    methods: {
        init () {
            this.handleGetList()
        },
        handleGetList () {
            this.searchBy = handleRequestParams(this.search).searchBy
            this.searchContent = handleRequestParams(this.search).searchContent
            this.currentPageIndex = 0
            this.getList()
        },
        getList () {
            this.tableList = []
            GetList({
                searchBy: this.searchBy,
                searchContent: this.searchContent,
                nodeId: '1',
                logic: 'and',
                page: this.currentPageIndex,
                limit: this.pageSize,
                orderBy: '',
                order: ''
            }).then((response) => {
            // console.log('aaaa',response.data.data.list)
                response.data.data.list.forEach(d => {
                    // 公开程度（0:不公开/1:公开）
                    if (d.openLevel == 0) {
                        d.openLevel = '不公开'
                    } else if (d.openLevel == 1) {
                        d.openLevel = '公开'
                    }
                    this.tableList.push(d)
                })
                this.dataList = response.data.data.list
                this.dataTotal = response.data.data.totalCount
            })
        },
        // 新建
        OpenMlNew () {
            this.$refs.fmNew.resetFields()
            this.mlNew = true
        },
        okNew () {
            this.$refs.fmNew.validate((valid) => {
                if (valid) {
                    this.mlNew = false
                    this.createDataset()
                } else {
                    this.$Message.error('Fail!')
                    this.loading = false
                    setTimeout(() => {
                        this.$nextTick(() => {
                            this.loading = true
                        })
                    }, 100)
                }
            })
        },
        cancelNew () {
            this.mlNew = false
        },
        createDataset () {
            CreateDataset({
                id: '',
                datasetName: this.fmNew.name, // 数据集名称
                datasetDesc: this.fmNew.desc, // 数据集描述
                openLevel: this.fmNew.openness, // 公开程度 0:不公开  1:公开
                nodeId: '1'// 节点标识
            }).then((response) => {
                this.$Message.success(response.data.msg)
                this.handleGetList()
            }).catch(error => {
                if (error.response) {
                    this.$Message.error(error.response.data.message)
                }
            })
        },
        // 重置
        reset () {
            // this.infoId = ''
            // this.infoName = ''
            // this.infoCreator = ''
            this.handleGetList()
        },
        // 页面跳转
        toCenter () {
            this.mlToCenter = true
        },
        toCenterOk () {
            this.mlToCenter = false
            this.$router.push({
                name: 'centralDataset'
            })
        },
        toCenterCancel () {
            this.mlToCenter = false
        },
        // 翻页
        handlePageChange (pageNum) {
            this.currentPageIndex = pageNum - 1
            this.getList()
        },
        // 详情弹窗
        handleDetails (e) {
            this.mlDeatils = true
            this.detailBox = e
        },
        details () {
            // 详情编辑提交
            this.mlDeatils = false
        },
        cancelDetails () {
            this.mlDeatils = false
            // 详情取消
        },
        // 中央数据注册弹窗
        openMlCenter (e) {
            this.mlCenter = true
            console.log(e)
        },
        registerCen () {
            RegisterCenData({
                id: '8135cf1cd08d49a59cc5cab0bd771883', // 数据集标识
                nodeId: '1'// 节点标识
            }).then((response) => {
                this.mlCenter = false
                this.$Message.success(response.data.msg)
                this.handleGetList()
            }).catch(error => {
                if (error.response) {
                    this.mlCenter = false
                    this.$Message.error(error.response.data.message)
                }
            })
        },
        cancelCenter () {
            this.mlCenter = false
        },
        center () {
            this.mlCenter = false
        },
        // 删除弹窗
        handleDel (e) {
            this.mlDel = true
        },
        cancelDel () {
            this.mlDel = false
        },
        del () {
            this.mlDel = false
        },
        // 元数据配置页面跳转
        toMetaConfig (e) {
            this.$router.push({
                name: 'metaConfig',
                params: {
                    id: e.id,
                    routeFalg: 'sub',
                    editFlag: e.jobClassName
                }
            })
        },
        // 元数据详情页面跳转
        toMetaDtl (e) {
            this.$router.push({
                name: 'metaDetails',
                params: {
                    id: e.id,
                    falg: 'sub'
                }
            })
        },
        // 导入CSV文件
        openMlImport (e) {
            console.log(e)
            this.mlImport = true
        },
        // 上传文件
        uploadFile () {
            let formData = new FormData()
            formData.append('nodeId', '1') // 节点标识
            formData.append('datasetId', 'projName-Test') // 数据集标识
            formData.append('csvFile', this.file) // csv文件
            UploadFile(formData).then((response) => {
                this.$Message.success(response.data.msg)
            }).catch(error => {
                if (error.response) {
                    this.$Message.error(error.response.data.message)
                }
            })
        },
        handleUpload (file) {
            this.fileName = file.name
            this.file = file
            return false
        },
        // handleSubmit() {
        //   this.fileName = "";
        //   const self = this;
        //   let config = {
        //     headers: { "Content-Type": "multipart/form-data" },
        //   };
        //   let param = new FormData();
        //   param.append("file", self.file);
        //   Util.http
        //     .post("api/tdcc/goip/importGoipTargets", param, config)
        //     .then((response) => {
        //       // this.handlegetList();
        //       // self.$Message.success(response.data);
        //     })
        //     .catch(function (error) {
        //       self.$Message.error(error.response.data);
        //     });
        // },
        // 取消文件上传
        cancelSubmit () {
            this.fileName = ''
        }
    },
    created () {
        this.init()
    }
}

</script>
<style scoped>
</style>
