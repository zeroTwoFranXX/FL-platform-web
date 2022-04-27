<template>
   <!-- 个人实名认证 -->
  <Card>
    <!-- <Button @click="getInfo">ceshi </Button> -->
    <Form ref="fmInfo" :model="fmInfo" :rules="ruleFmInfo" :label-width="150" style="margin-top:30px">
      <Row>
        <Col span="12">
          <FormItem label="用户姓名：" prop="name">
            <Input v-model="fmInfo.name" style="width:300px" placeholder="请输入用户姓名" clearable></Input>
          </FormItem>
          <FormItem label="证件类型：" prop="cardType" style="margin-top:50px">
          <!-- （0:居民身份证;1:军官证;2:护照） -->
            <Select v-model="fmInfo.cardType" style="width:300px" placeholder="请选择证件类型">
                <Option :value = 0>居民身份证</Option>
                <Option :value = 1>军官证</Option>
                <Option :value = 2>护照</Option>
            </Select>
          </FormItem>
          <FormItem label="证件号码：" prop="cardNumber" style="margin-top:50px">
              <Input v-model="fmInfo.cardNumber" style="width:300px" placeholder="请输入对应的证件号码" clearable></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="身份证正面照片：" prop="idCardFrontFile" >
            <Upload
                :before-upload="frontBeforeUpload"
                action=""
            >
                <Button icon="ios-cloud-upload-outline">上传身份证正面照片</Button>
            </Upload>
            <div class="front">
              <img v-if="this.imgFront != ''" style="height:200px;width:320px" :src="this.imgFront">
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="上传头像：" prop="headPortraitFile" >
            <Upload
                :before-upload="headBeforeUpload"
                action=""
            >
                <Button icon="ios-cloud-upload-outline">上传头像</Button>
            </Upload>
            <div class="head">
              <img v-if="this.imgHead != ''" style="height:200px;width:200px" :src="this.imgHead">
            </div>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="身份证背面照片：" prop="idCardBehindFile" >
            <Upload
                :before-upload="behindBeforeUpload"
                action=""
            >
                <Button icon="ios-cloud-upload-outline">上传身份证背面照片</Button>
            </Upload>
            <div class="behind">
              <img v-if="this.imgBehind != ''" style="height:200px;width:320px" :src="this.imgBehind">
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Button @click="handleConfirm">提交</Button>
        <Button @click="init">取消</Button>
      </Row>
    </Form>
  </Card>
</template>

<script>
import { GetInfo, IdVerification } from '@/services/api/certification.js'
import { BASE_URL } from '@/public/configs/config.js'
export default {
    data () {
        return {
            fmInfo: {
                id: '',
                name: '',
                cardType: '',
                cardNumber: ''
            },
            headPortraitFile: '',
            imgHead: '',
            idCardFrontFile: '',
            imgFront: '',
            idCardBehindFile: '',
            imgBehind: '',
            ruleFmInfo: {
                name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
                cardType: [{ required: true, message: '请选择证件类型' }],
                cardNumber: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }]
            }
        }
    },
    methods: {
        init () {
            this.getInfo()
        },
        // 获取用户实名认证信息
        getInfo () {
            GetInfo().then((response) => {
                this.fmInfo.id = response.data.data.id
                if (response.data.data.name === '未实名') {
                    this.fmInfo.name = ''
                } else {
                    this.fmInfo.name = response.data.data.name
                }
                this.fmInfo.cardType = response.data.data.cardType
                this.fmInfo.cardNumber = response.data.data.cardNumber
                if (response.data.data.headPortrait && response.data.data.idCardFront && response.data.data.idCardBehind) {
                    this.imgHead = BASE_URL + response.data.data.headPortrait
                    this.imgFront = BASE_URL + response.data.data.idCardFront
                    this.imgBehind = BASE_URL + response.data.data.idCardBehind
                }

                // console.log('用户实名认证信息',response.data.data)
            })
        },
        // 头像
        headBeforeUpload (file) {
            this.headPortraitFile = file
            this.imgHead = window.webkitURL.createObjectURL(file)
            return false
        },
        // 身份证正面
        frontBeforeUpload (file) {
            this.idCardFrontFile = file
            this.imgFront = window.webkitURL.createObjectURL(file)
            return false
        },
        // 身份证背面
        behindBeforeUpload (file) {
            this.idCardBehindFile = file
            this.imgBehind = window.webkitURL.createObjectURL(file)
            return false
        },
        handleConfirm () {
            this.$refs.fmInfo.validate((valid) => {
                if (valid) {
                    if (this.imgHead && this.imgFront && this.imgBehind) {
                        this.confirm()
                    } else {
                        this.$Message.error('请上传相应的照片')
                    }
                } else {
                    this.$Message.error('请完整地填写个人信息')
                }
            })
        },
        // 实名认证
        confirm () {
            let formData = new FormData()
            formData.append('id', this.fmInfo.id)
            formData.append('name', this.fmInfo.name)
            formData.append('cardType', this.fmInfo.cardType)
            formData.append('cardNumber', this.fmInfo.cardNumber)
            formData.append('headPortraitFile', this.headPortraitFile)
            formData.append('idCardFrontFile', this.idCardFrontFile)
            formData.append('idCardBehindFile', this.idCardBehindFile)
            IdVerification(formData).then((response) => {
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
.head{
  width:200px;
  height: 200px;
  background: url(./assets/个人头像.png) no-repeat;
  background-size: 100% 100%;
  // border:1px solid red;
}
.front{
  width:320px;
  height: 200px;
  background: url(./assets/身份证正面.png) no-repeat;
  background-size: 100% 120%;
  // margin-left:-200px;
  // border:1px solid red;
}
.behind{
  width:320px;
  height: 200px;
  background: url(./assets/身份证反面.png) no-repeat;
  background-size: 100% 120%;
  // margin-left:-220px;
  // border:1px solid red;
}
</style>
