<style lang="less" scoped>
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="header">
          联邦学习平台
        </div>
        <login-bg-text class="slogn"></login-bg-text>
        <div class="login-con">
            <Card :bordered="false" >
                <p class="card-title">密码登录</p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <i-input
                                v-model="form.userName"
                                placeholder="请输入用户名"
                                autocomplete="off"
                                size="large"
                            >
                            </i-input>
                        </FormItem>
                        <FormItem prop="password">
                            <i-input
                                type="password"
                                v-model="form.password"
                                placeholder="请输入密码"
                                autocomplete="off"
                                size="large"
                            >
                            </i-input>
                        </FormItem>
                    </Form>
                    <Button
                        @click="handleSubmit"
                        type="primary"
                        long
                        :loading="isLogining"
                        size="large"
                    >
                        {{ loginBtnText }}
                    </Button>
                    <div class="more-tool">
                        <Checkbox
                            v-model="rememberme"
                            @on-change="setRememberMe"
                            >记住用户名</Checkbox
                        >
                        <div>
                          <Button type="text" size="small">忘记密码</Button>
                          <Divider type="vertical" />
                          <Button type="text" size="small" to="/register">免费注册</Button>
                        </div>
                    </div>
                    <div class="more">
                      <Divider plain>其他登录方式</Divider>
                      <div class="demo-avatar">
                          <Avatar icon="ios-more" />
                          <Avatar icon="ios-more" />
                          <Avatar icon="ios-more" />
                          <Avatar icon="ios-more" />
                          <Avatar icon="ios-more" />
                          <Avatar icon="ios-more" />
                      </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginBgText from '../components/login-bg-text.vue'
import { LoginByPassword } from '@/services/api/auth'
import { setToken } from '@/common/helpers/token'

export default {
    components: {
        LoginBgText
    },
    data () {
        return {
            isLogining: false,
            loginBtnText: '登录',
            rememberme: null,
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: '账号不能为空',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        min: 6,
                        message: '密码不能小于6位',
                        trigger: 'blur'
                    }
                ]
            },
            value: '',
            biyiCaptchaKey: '',
            casOrNormal: 'normal'
        }
    },
    methods: {
        setRememberMe (value) {
            if (value) {
                localStorage['rememberme'] = 1
            } else {
                localStorage['rememberme'] = 0
            }
        },
        handleSubmit () {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.isShowModal = true
                    this.isLogining = true
                    let msg = this.$Message.loading({
                        content: '正在登录中',
                        duration: 0
                    })
                    LoginByPassword({
                        username: this.form.userName,
                        password: this.form.password
                    }, {
                        biyiCaptchaKey: this.biyiCaptchaKey,
                        biyiCaptcha: JSON.stringify({
                            code: this.value
                        })
                    })
                        .then(response => {
                            msg()
                            if (response.data.code === '200') {
                                setToken('access_token', response.data.data.access_token)
                                setToken('refresh_token', response.data.data.refresh_token)
                                // localStorage.token = response.data.data.access_token
                                this.$store.commit('user/setUserInfo', response.data.data)
                                this.isLogining = false
                                this.$Message.success({
                                    content: '登录成功！',
                                    onClose: () => {
                                        this.$router.push('/home')
                                    }
                                })
                            } else {
                                this.isLogining = false
                                this.$Message.warning({
                                    content: response.data.data
                                })
                            }
                        })
                        .catch(error => {
                            msg()
                            // 验证码
                            // this.$refs.securityCode.init()
                            this.isLogining = false
                            if (error.response) {
                                switch (error.response.status) {
                                case 401:
                                    if (error.response.data.attempts) {
                                        this.$Message.error(
                                            `登录失败，您还有 ${error.response.data.attempts} 尝试机会！`
                                        )
                                    } else {
                                        const locktime = this.formatLockedTime(
                                            error.response.data.lockoutTime
                                        )
                                        this.$Message.error({
                                            content: `登录失败，您的账号已被锁定，请在<span style='font-weight: bold color: #2d8cf0'>${locktime}</span>后重试！`
                                        })
                                    }
                                    break
                                default:
                                    this.$Message.error(
                                        `登录失败，${error.response.data.message}！`
                                    )
                                    break
                                }
                            }
                        })
                }
            })
        },
        formatLockedTime (time) {
            let str = ''
            const d = parseInt(time / (3600 * 24))
            let h = parseInt((time % (3600 * 24)) / 3600)
            let m = parseInt((time % 3600) / 60)
            let s = (time % 3600) % 60
            if (d > 0) {
                str = `${str}${d}天`
            }
            if (h > 0) {
                str = `${str}${h}小时`
            }
            if (m > 0) {
                str = `${str}${m}分`
            }
            if (s > 0) {
                str = `${str}${s}秒`
            }
            return str
        }
    },
    created () {
        this.$store.commit('user/logout')
        if (!localStorage['rememberme']) {
            localStorage['rememberme'] = 0
        }
        this.rememberme = !(localStorage['rememberme'] === '0')
    }
}
</script>
