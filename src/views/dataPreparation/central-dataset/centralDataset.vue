<template>
<!-- 中央数据集管理 -->
<Card>
  <div>
    <Tabs v-model="search.relativeType" :animated="false" @on-click="getList" style="margin-top:20px">
        <TabPane label="全部数据集" name="0" ></TabPane>
        <TabPane label="被授权的数据集" name="2"></TabPane>
        <TabPane label="我创建的数据集" name="1"></TabPane>
    </Tabs>
    <Form ref="search" :model="search" inline style="margin-top:10px">
      <Row>
        <Col span="5">
          <FormItem>
            <span style="display: inline-block;width:80px">数据集名称:</span>
            <Input v-model="search.datasetName" style="width:200px"  placeholder="请输入数据集名称" clearable/>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem>
            <span style="display: inline-block;width:50px;">创建人:</span>
            <Input v-model="search.name" style="width:200px"  placeholder="请输入创建人" clearable/>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem>
            <span style="display: inline-block;width:80px">数据源类型:</span>
            <Select v-model="search.dataSourceType" style="width:170px" placeholder="请选择节点">
                 <!-- 1 是csv 2是mysql  3.是hive -->
                <Option :value=1>csv</Option>
                <Option :value=2>mysql</Option>
                <Option :value=3>hive</Option>
            </Select>
          </FormItem>
        </Col>
      <FormItem>
        <Button type="primary" @click="getList">搜索</Button>
        <Button style="margin-left: 16px;" @click="reset">重置</Button>
      </FormItem>
      </Row>
    </Form>
    <Row >
      <Table :columns="columns" :data="tableList" style="margin-top:20px;width:100%" border></Table>
    </Row>
    <Row style="margin-top: 8px;" type="flex" justify="end">
      <Page :current="currentPageIndex+1"
      :total="dataTotal"
      :page-size="pageSize"
      @on-change="handlePageChange"
      show-elevator
      show-total
      style="padding: 10px;"></Page>
    </Row>
    <!-- 详情弹窗 -->
    <Modal
      v-model="modalImg"
      title= '上传图片'
      @on-ok="handleUpload"
      @on-cancel="cancelImg"
      :loading="loading"
      :mask-closable="false"
      class-name="vertical-center-modal">
      <!-- <Form :label-width="100">
        <FormItem label='应用图片：'> -->
          <!-- <span>应用图片：</span> -->
          <Upload
              :before-upload="handleBeforeUpload"
              action=""
          >
              <Button icon="ios-cloud-upload-outline">数据集图片</Button>
          </Upload>
            <div class="photo">
              <img v-if="this.imgPath != ''" style="height:200px;width:300px" :src="this.imgPath">
            </div>
        <!-- </FormItem>
      </Form> -->
    </Modal>
    <!-- 授权 -->
    <Modal
      v-model="modalEm"
      title= '授权'
      width=900px
      class-name="vertical-center-modal">
      <div slot="header">
          <div v-if="this.isEmpower ==='未授权'">未授权用户</div>
          <div v-if="this.isEmpower ==='已授权'">已授权用户</div>
      </div>
      <Form ref="searchEm" :model="searchEm"  label-position="left" :lebel-width="100">
        <Row style="margin-top:17px">
          <Col span="7">
            <FormItem label="用户名:">
              <Input v-model="searchEm.username" style="width:170px" placeholder="请输入创建人" clearable/>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="真实姓名:">
              <Input v-model="searchEm.name" style="width:170px"  placeholder="请输入创建人" clearable/>
            </FormItem>
          </Col>
          <Col span="7">
            <Button v-if="this.isEmpower ==='未授权'" @click = "getListEm" type="primary" style="margin-right:10px">搜索</Button>
            <Button v-if="this.isEmpower ==='未授权'" @click="resetEm" style="margin-right:15px">重置</Button>
            <Button v-if="this.isEmpower ==='已授权'" @click = "getListUnEm" type="primary" style="margin-right:10px">搜索</Button>
            <Button v-if="this.isEmpower ==='已授权'" @click="resetUnEm" style="margin-right:15px">重置</Button>
          </Col>
        </Row>
      </Form>
      <Row >
        <Table ref="selection" :columns="columnsE" :data="tableListE" style="margin-top:20px;width:100%" border></Table>
      </Row>
      <Row style="margin-top: 8px;" type="flex" justify="end">
        <Page :current="currentPageIndexE+1"
        :total="dataTotalE"
        :page-size="pageSizeE"
        @on-change="handlePageChangeE"
        show-elevator
        show-total
        style="padding: 10px;"></Page>
      </Row>
      <div slot="footer">
        <Button type='text' @click="closeModalEm" style="margin-right:10px">取消</Button>
        <Button type="primary" v-if="this.isEmpower ==='未授权'" @click="empower">授权</Button>
        <Button type="primary" v-if="this.isEmpower ==='已授权'" @click="cancelEm">取消授权</Button>
      </div>
    </Modal>
 </div>
</Card>
</template>

<script>
import { GetListData, UploadImg,UnauthorizedList,AuthorizedList,Empower,CancelEmpower} from '@/services/api/data-preparation.js'
import { handleRequestParams } from '@/common/helpers/params'
import { BASE_URL } from '@/public/configs/config.js'
export default {
    data () {
        return {
            // 筛选条件
            searchBy: '',
            searchContent: '',
            search: {
                id: '',
                datasetName: '',
                name: '',
                relativeType: '0'
            },
            // 表格
            dataList: [],
            tableList: [],
            columns: [
                {
                    title: '序号',
                    align: 'center',
                    width: 70,
                    render: (h, params) => {
                        return h('span', params.index + (this.currentPageIndex) * this.pageSize + 1)
                    }
                },
                // {
                //     key: 'id',
                //     title: '编号',
                //     align: 'center'
                // },
                {
                    key: 'datasetName',
                    title: '数据集名称',
                    align: 'center'
                },
                // {
                //     key: 'datasetDesc',
                //     title: '数据集描述',
                //     align: 'center'
                // },
                {
                    key: 'name',
                    title: '数据集创建人',
                    align: 'center'
                },
                {
                    key: 'mobile',
                    title: '创建人联系方式',
                    align: 'center'
                },
                {
                    key: 'dataSourceType',
                    title: '数据源类型',
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
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            (params.row.isOrNot === true) && h('a', {
                                style: {
                                    // color:'#00509D',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.openImg(params.row)
                                    }
                                }
                            }, '上传图片'),
                            h('a', {
                                style: {
                                    // color:'#00509D',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.toMeta(params.row.id)
                                    }
                                }
                            }, '元数据详情'),
                            (params.row.isOrNot === true) && h('a', {
                                style: {
                                     color:'#00C267',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.openModalEm(params.row)
                                    }
                                }
                            }, '授权'),
                            (params.row.isOrNot === true) && h('a', {
                                style: {
                                    color:'#ff9900',
                                    marginRight: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.cancelMpdalEm(params.row)
                                    }
                                }
                            }, '取消授权')
                        ])
                    }
                }
            ],
            // 分页
            dataTotal: 0,
            pageSize: 10,
            currentPageIndex: 0,
            // 弹窗
            // 上传图片弹窗
            datasetFile: '',
            paramsId: '',
            loading: true,
            modalImg: false,
            imgPath: '',
            // 授权
            isEmpower:'', //是否授权标识
            searchByEm: '',
            searchContentEm: '',
            searchEm: {
                id: '',
                username: '', //用户名
                name: '', //真实名字
            },
            typeFlag:2, //数据集标识
            emId:'', //打开弹窗传递的数据集id
            selectFlag:false, //标记是否选择了授权/取消授权的用户
            selectList:[], //选择的内容
             

            infoId: '',
            infoName: '',
            modalEm: false,
            searchInfo: '',
            dataTotalE: 0,
            pageSizeE: 5,
            currentPageIndexE: 0,
            columnsE: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                  title:'序号',
                  align:'center',
                  render:(h,params) => {
                    return h('span', params.index + (this.currentPageIndexE) * this.pageSizeE + 1)
                  }
                },
                {
                    key: 'username',
                    title: '用户名',
                    align: 'center'
                },
                {
                    key: 'name',
                    title: '真实姓名',
                    align: 'center'
                },
                {
                    key: 'mobile',
                    title: '电话',
                    align: 'center'
                },
                {
                    key: 'mail',
                    title: '邮箱',
                    align: 'center'
                },
                {
                    key: 'orgName',
                    title: '所属机构',
                    align: 'center'
                },
            ],
            tableListE: [
                {
                    jobClassName: '授权'
                }
            ]
        }
    },
    methods: {
        init () {
            this.getList()
        },
        // 搜索
        getList () {
            if ((this.search.relativeType != '1') && (this.search.relativeType != '2')) {
                this.search.relativeType = ''
            }
            this.searchBy = handleRequestParams(this.search).searchBy
            this.searchContent = handleRequestParams(this.search).searchContent
            this.currentPageIndex = 0
            this.getListData()
        },
        getListData () {
            this.dataList = []
            GetListData({
              searchBy: this.searchBy,
              searchContent: this.searchContent,
              logic:'and',
              page:this.currentPageIndex + 1,
              limit:this.pageSize
            }).then((response) =>{
              response.data.data.list.forEach(d => {
              // 公开程度（0:不公开/1:公开）
              if(d.openLevel === '0'){
                d.openLevel = "不公开"
              }else if(d.openLevel === '1'){
                d.openLevel = "公开"
              }
              //  1 是csv 2是mysql  3.是hive
              if(d.dataSourceType === 1){
                d.dataSourceType = 'csv'
              }else if(d.dataSourceType === 2){
                d.dataSourceType = 'mysql'
              }else if(d.dataSourceType === 3){
                d.dataSourceType = 'hive'
              }
              this.dataList.push(d)
            });
              this.tableList = this.dataList
              this.dataTotal = response.data.data.totalCount
            })
        },
        // 重置
        reset () {
            this.search.datasetName = '',
            this.search.name = '',
            this.search.dataSourceType = '',
            this.getList()
        },
        // 上传图片
        openImg (e) {
            this.paramsId = e.id
            this.modalImg = true
            if (e.datasetPic) {
                this.imgPath = BASE_URL + e.datasetPic
            }
        },
        // 上传图片（确认）
        handleUpload () {
            if (this.imgPath) {
                this.modalImg = false
                this.uploadImg()
            } else {
                this.$Message.error('请上传图片!')
                this.loading = false
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.loading = true
                    })
                }, 100)
            }
        },
        // 上传图片
        uploadImg () {
            let formData = new FormData()
            formData.append('id', this.paramsId)
            formData.append('file', this.datasetFile)
            UploadImg(formData).then((response) => {
                this.$Message.success('上传图片成功!')
                this.getListData()
            })
        },
        // 上传图片(取消)
        cancelImg () {
            this.modalImg = false
            this.getListData()
        },
        handleBeforeUpload (file) {
            this.datasetFile = file
            this.imgPath = window.webkitURL.createObjectURL(file)
            return false
        },
        // 元数据详情
        toMeta (e) {
            this.$store.commit('dataset/setCurrentId', e)
            this.$router.push({
                name: 'metaDetails'
            })
        },
        // 打开授权弹窗
        openModalEm (e) {
            this.tableListE = []
            this.emId = e.id
            this.isEmpower = '未授权'
            this.searchEm.name = '',
            this.searchEm.username = '',
            this.pageSizeE = 5
            this.currentPageIndexE = 0
            this.modalEm = true
            this.getUnEmList()
        },
        // 获取未授权用户列表
        getUnEmList(){
            this.searchByEm = handleRequestParams(this.searchEm).searchBy
            this.searchContentEm = handleRequestParams(this.searchEm).searchContent
            UnauthorizedList({
                itemId:this.emId,
                typeFlag:this.typeFlag,
                page:this.currentPageIndexE + 1,
                limit:this.pageSizeE,
                searchBy:this.searchByEm,
                searchContent:this.searchContentEm
            }).then((response) =>{
                this.tableListE = response.data.data.list
                this.dataTotalE = response.data.data.totalCount
            })
        },
        // 打开取消授权弹窗
        cancelMpdalEm(e){
            this.tableListE = []
            this.emId = e.id
            this.isEmpower = '已授权'
            this.searchEm.name = '',
            this.searchEm.username = '',
            this.pageSizeE = 5
            this.currentPageIndexE = 0
            this.modalEm = true
            this.getEmList()
        },
        // 获取已授权用户列表
        getEmList(){
            this.searchByEm = handleRequestParams(this.searchEm).searchBy
            this.searchContentEm = handleRequestParams(this.searchEm).searchContent
            AuthorizedList({
                itemId:this.emId,
                typeFlag:this.typeFlag,
                page:this.currentPageIndexE + 1,
                limit:this.pageSizeE,
                searchBy:this.searchByEm,
                searchContent:this.searchContentEm
            }).then((response) =>{
                this.tableListE = response.data.data.list
                this.dataTotalE = response.data.data.totalCount
            })
        },
        // 授权弹窗搜索
        getListEm(){
            this.getUnEmList()
        },
        // 授权弹窗重置
        resetEm(){
            this.searchEm.name = '',
            this.searchEm.username = '',
            this.currentPageIndexE = 0,
            this.getUnEmList()
        },
        // 取消授权弹窗搜索
        getListUnEm(){
            this.getEmList()
        },
        // 取消授权弹窗重置
        resetUnEm(){
            this.searchEm.name = '',
            this.searchEm.username = '',
            this.currentPageIndexE = 0,
            this.getEmList()
        },
        // 授权操作
        empower () {
            this.selectFlag = false 
            this.selectList = []
            this.$refs.selection.getSelection().forEach((response) =>{
                this.selectFlag = true
                this.selectList.push(response.id)
                Empower({
                    itemId:this.emId, //项目，传递项目的id
                    userBatchId:this.selectList, //用户id
                    msgType:this.typeFlag, //消息类型可以是项目、数据集、应用三种类型
                    applyStatus:15, //申请的状态信息
                }).then((response) =>{
                    this.$Message.success('授权成功!')
                    this.modalEm = false
                    this.getUnEmList()
                })
            })
            if(this.selectFlag === false){
                this.$Message.error('请至少选择一位要授权的用户!')
            }
            // ths.modalEm = false
        },
        // 取消授权操作
        cancelEm () { 
            this.selectList = []
            this.selectFlag = false 
            this.$refs.selection.getSelection().forEach((response) =>{
                this.selectFlag = true 
                this.selectList.push(response.id)
                CancelEmpower({
                    itemId:this.emId, //项目，传递项目的id
                    userBatchId:this.selectList //用户id
                }).then((response) =>{
                    this.$Message.success('取消授权成功!')
                    this.modalEm = false
                    this.getUnEmList()
                })
            })
            if(this.selectFlag === false){
                this.$Message.error('请至少选择一位要授权的用户!')
            }
        },
        // 关闭弹窗
        closeModalEm () {
            this.modalEm = false
        },
        // 授权翻页
        handlePageChangeE (pageNum) {
            this.currentPageIndexE = pageNum - 1
            if(this.isEmpower ==='未授权'){
                this.getUnEmList()
            }else if(this.isEmpower ==='已授权'){
                this.getEmList()
            }
        },
        // 翻页
        handlePageChange (pageNum) {
            this.currentPageIndex = pageNum - 1
            this.getListData()
        }
    },
    created () {
        this.init()
    }
}

</script>
<style lang="less" scoped>
.photo{
  width:300px;
  height: 200px;
  background: url(./assets/图片.png) no-repeat;
  background-size: 100% 100%;
  // border:1px red solid;
}
</style>
