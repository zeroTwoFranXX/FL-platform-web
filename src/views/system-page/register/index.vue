<template>
  <div class="register">
    <div class="register-con">
      <login-bg-text class="slogn"></login-bg-text>
      <Card class="register-card" :bordered="false" dis-hover>
        <div class="form-con">
          <p class="title">欢迎注册联邦学习平台</p>
          <Form class="form" ref="registerForm" :model="form" :rules="rules">
              <FormItem prop="userName">
                  <i-input
                      v-model="form.userName"
                      placeholder="设置会员名"
                      autocomplete="off"
                      size="large"
                  >
                  </i-input>
              </FormItem>
              <FormItem prop="userSex" size="large" label="性别">
                  <RadioGroup v-model="form.userSex" style="margin-top:-1px">
                    <Radio style="margin-left:30px" label=0>男</Radio>
                    <Radio style="margin-left:30px" label=1>女</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem prop="password">
                  <i-input
                      type="password"
                      v-model="form.password"
                      placeholder="设置你的登录密码"
                      autocomplete="off"
                      size="large"
                      ref="password"
                  >
                  </i-input>
                  <Tooltip
                    content="密码不小于6位"
                    theme="light"
                    max-width="276"
                    style="position:absolute;margin-top:-10px;margin-left:5px"
                    placement="right"
                    transfer
                  >
                      <Icon type="ios-alert-outline" />
                  </Tooltip>
              </FormItem>
              <FormItem prop="passwordRepeat">
                  <i-input
                      type="password"
                      v-model="form.passwordRepeat"
                      placeholder="请再次输入你的密码"
                      autocomplete="off"
                      size="large"
                  >
                  </i-input>
              </FormItem>
              <FormItem prop="mail">
                  <i-input
                      v-model="form.mail"
                      placeholder="请输入你的邮箱"
                      autocomplete="off"
                      size="large"
                  >
                  </i-input>
              </FormItem>
              <FormItem prop="mobile">
                <Input
                  v-model="form.mobile"
                  size="large"
                >
                  <span slot="prepend">+86</span>
                </Input>
              </FormItem>
              <FormItem>
                <reg-slider @pass = "pass"></reg-slider>
              </FormItem>
          </Form>
          <div class="agreement">
              <Checkbox
                v-model="rememberme"
                @on-change = "readPolicy"
              >
              </Checkbox>
              我已阅读并接受《网站服务条款》｜《法律声明和隐私权政策》
          </div>
          <Button
              @click="handleSubmit('registerForm')"
              type="primary"
              long
              :loading="isLogining"
              size="large"
          >
            注册
          </Button>
          <div class="to-login">
            已有账号，
            <Button type="text" size="small" to="/login">马上登录</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import loginBgText from '../components/login-bg-text.vue'
import regSlider from '../components/reg-slider.vue'
import { CreateUser } from '@/services/api/register'

export default {
    components: { loginBgText, regSlider },
    data () {
        return {
            form: {},
            rules: {
                userName: [{
                    required: true,
                    message: '账号不能为空',
                    trigger: 'blur'
                }],
                userSex: [{
                    required: true,
                    message: '请选择性别',
                    trigger: 'change'
                }],
                password: [
                    {
                        required: true,
                        min: 6,
                        message: '密码不能小于6位',
                        trigger: 'blur'
                    }
                ],
                passwordRepeat: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value) {
                                if (value !== this.form.password) {
                                    callback(new Error('两次输入密码不一致'))
                                } else {
                                    callback()
                                }
                            } else {
                                callback(new Error('请重新确认密码'))
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                mail: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入邮箱'))
                            } else {
                                if (value) {
                                    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(com|edu|gov|int|mil|net|org|at|au|ca|ch|cn)$/
                                    if (!reg.test(value)) {
                                        callback(new Error('请输入有效的邮箱'))
                                    }
                                }
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入手机号码'))
                            } else {
                                if (value) {
                                    var reg = /^1[3456789]\d{9}$/
                                    if (!reg.test(value)) {
                                        callback(new Error('请输入有效的手机号码'))
                                    }
                                }
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            },
            isLogining: false,
            rememberme: null,
            readSelect: null,
            sliderValid: ''
        }
    },
    methods: {
        pass (valid) {
            this.sliderValid = valid
        },
        readPolicy (select) {
            this.readSelect = select
        },
        handleSubmit (name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.sliderValid === true && this.readSelect === true) {
                        this.createItem()
                    } else {
                        if (this.sliderValid === false || !this.sliderValid) {
                            this.$Message.error('验证失败')
                        } else if (this.readSelect === false || !this.readSelect) {
                            this.$Message.error('请勾选用户协议')
                        }
                    }
                } else {
                    this.$Message.error('注册失败！请确认后提交')
                }
            })
        },
        createItem () {
            CreateUser({
                username: this.form.userName,
                sex: this.form.userSex,
                password: this.form.password,
                mobile: this.form.mobile,
                mail: this.form.mail
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.$Message.success('注册成功！')
                        this.$router.push({
                            name: 'RegisterSuccess'
                        })
                    } else {
                        this.$Message.error(response.data.data)
                    }
                })
                .catch(error => {
                    this.$Message.error('提交失败！请重试')
                })
        }
    }

}
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  text-align: left;
  background-image: url('../../../assets/login/bg.png');
  background-size: cover;
  &-con {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
  }
  .slogn {
    margin-right: 30px;
  }
  &-card {
    height: 100%;
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #373e48;
    .title {
      font-size: 28px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      line-height: 40px;
    }
    .form {
      padding-top: 40px;
      width: 360px;
    }
    .agreement {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #686e77;
      line-height: 14px;
      margin: 40px 0 8px;
    }
    .to-login {
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #878d96;
      line-height: 20px;
      margin-top: 40px;
    }
  }
}
</style>
