<template>
   <!-- 企业实名认证 -->
  <Card>
    <!-- <Button @click="getInfo">ceshi </Button> -->
    <Form ref="fmInfo" :model="fmInfo" :rules="ruleFmInfo">
      <Row>
        <Col span="12">
            <FormItem label="机构代码" prop="orgCode">
              <Input v-model="fmInfo.orgCode" style="width:300px" placeholder="请输入机构代码" clearable></Input>
            </FormItem>
        </Col>
        <Col span="12">
            <FormItem label="机构名称" prop="orgName">
              <Input v-model="fmInfo.orgName" style="width:300px" placeholder="请输入机构名称" clearable></Input>
            </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="法人姓名" prop="lawName">
            <Input v-model="fmInfo.lawName" style="width:300px" placeholder="请输入法人姓名" clearable></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="机构电话" prop="orgPhone">
            <Input v-model="fmInfo.orgPhone" style="width:300px" placeholder="请输入机构电话" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="机构描述" prop="orgDesc">
            <Input v-model="fmInfo.orgDesc" type="textarea" :autosize="{minRows: 3,maxRows: 6}" style="width:600px" placeholder="请输入机构描述" clearable></Input>
          </FormItem>
          <FormItem label="详细地址" prop="orgAddr">
            <Input v-model="fmInfo.orgAddr" type="textarea" :autosize="{minRows: 3,maxRows: 6}" style="width:600px" placeholder="请输入详细地址" clearable></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="上传企业图标：" prop="logoPortraitFile" >
            <Upload
                :before-upload="logoBeforeUpload"
                action=""
            >
                <Button icon="ios-cloud-upload-outline">上传企业图标</Button>
            </Upload>
            <div class="logo">
              <img v-if="this.imgLogo != ''" style="height:150px;width:200px" :src="this.imgLogo">
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <Button @click="handleConfirm">提交</Button>
          <Button @click="init">取消</Button>
        </Col>
      </Row>
    </Form>
  </Card>
</template>

<script>
import { GetOrgInfo, EnterCertification } from '@/services/api/certification.js'
import { BASE_URL } from '@/public/configs/config.js'
export default {
    data () {
        return {
            fmInfo: {
                id: '',
                orgCode: '',
                orgName: '',
                lawName: '',
                orgPhone: '',
                orgDesc: '',
                orgAddr: ''
            },
            logoPortraitFile: '',
            imgLogo: '',
            ruleFmInfo: {
                orgCode: [{ required: true, message: '请输入机构代码', trigger: 'blur' }],
                orgName: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
                lawName: [{ required: true, message: '请输入法人姓名', trigger: 'blur' }],
                orgPhone: [{ required: true, message: '请输入机构电话', trigger: 'blur' }],
                orgDesc: [{ required: true, message: '请输入机构描述', trigger: 'blur' }],
                orgAddr: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
            }
        }
    },
    methods: {
        init () {
            this.getInfo()
        },
        // 获取企业实名认证信息
        getInfo () {
            GetOrgInfo().then((response) => {
                this.fmInfo.id = response.data.data.id
                this.fmInfo.orgCode = response.data.data.orgCode
                this.fmInfo.orgName = response.data.data.orgName
                this.fmInfo.lawName = response.data.data.lawName
                this.fmInfo.orgPhone = response.data.data.orgPhone
                this.fmInfo.orgDesc = response.data.data.orgDesc
                this.fmInfo.orgAddr = response.data.data.orgAddr
                if (response.data.data.orgPic) {
                    this.imgLogo = BASE_URL + response.data.data.orgPic
                }
                // console.log('企业实名认证信息',response.data.data)
            })
        },
        // Logo
        logoBeforeUpload (file) {
            this.logoPortraitFile = file
            this.imgLogo = window.webkitURL.createObjectURL(file)
            return false
        },
        handleConfirm () {
            this.$refs.fmInfo.validate((valid) => {
                if (valid) {
                    if (this.imgLogo) {
                        this.confirm()
                    } else {
                        this.$Message.error('请上传企业图标')
                    }
                } else {
                    this.$Message.error('请完整地填写企业信息')
                }
            })
        },
        // 实名认证
        confirm () {
            let formData = new FormData()
            formData.append('id', this.fmInfo.id)
            formData.append('orgCode', this.fmInfo.orgCode)
            formData.append('orgName', this.fmInfo.orgName)
            formData.append('lawName', this.fmInfo.lawName)
            formData.append('orgPhone', this.fmInfo.orgPhone)
            formData.append('orgDesc', this.fmInfo.orgDesc)
            formData.append('orgAddr', this.fmInfo.orgAddr)
            formData.append('file', this.logoPortraitFile)
            EnterCertification(formData).then((response) => {
                this.$Message.success('认证成功')
            })
        }
    },
    created () {
        this.init()
    }
}

</script>
<style lang="less" scoped>
.logo{
  height:150px;
  width:200px;
  background: url(./assets/机构.png) no-repeat;
  background-size: 90% 100%;
}
</style>
