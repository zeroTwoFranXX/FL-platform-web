<template>
<div>
    <Row :gutter="20" style="margin-top: 10px">
        <Col :span="8">
            <div>
                <Card style="width: 100%">
                    <div slot="header" class="clearfix">
                        <span>个人中心</span>
                    </div>
                    <div>
                        <span>admin- {{dataForm.nickName}}</span>
                    </div>
                    <div>
                        <span>
                            注册时间：
                            <li></li>
                            2021/4/10 9:40:33
                        </span>
                    </div>
                    <divider></divider>
                    <div>
                        <div>
                            手机号：
                            <div style="float: right; padding-right:20px;">{{dataForm.phone}}</div>
                        </div>
                        <div>
                            所属企业：
                            <div style="float: right; padding-right:20px;">北京邮电大学</div>
                        </div>
                        <div>
                            首页链接：
                            <div style="float: right; padding-right:20px;">{{dataForm.homeUrl}}</div>
                        </div>
                    </div>
                </Card>
            </div>
        </Col>
        <Col :span="16">
            <div>
                    <div class="grid-content bg-purple">
                        <Card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>基本资料</span>
                            </div>
                            <div>
                                <Form size="small" label-position="right">
                                    <FormItem label="用户昵称" prop="nickName">
                                        <Input  auto-complete="off" v-model="dataForm.nickName"></Input>
                                    </FormItem>
                                    <FormItem label="手机号" prop="phone">
                                        <Input auto-complete="off" v-model="dataForm.phone"></Input>
                                    </FormItem>
                                    <FormItem label="首页链接" prop="homeUrl">
                                        <Input  maxlength="18" v-model="dataForm.homeUrl"></Input>
                                    </FormItem>
                                </Form>
                                <div slot="footer" class="dialog-footer">
                                    <Button type="primary">提交</Button>
                                    <Button type="warning" >关闭</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
            </div>
        </Col>
    </Row>
</div>
</template>

<script>
export default {
    name: 'personal-information.vue',
    data () {
        return {
            dataForm: {
                nickName: '超级管理员',
                phone: '18703615591',
                homeUrl: 'https://www.baidu.com'
            }
        }
    }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>
