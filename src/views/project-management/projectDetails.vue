<template>
<div onscroll="true">
    <!--项目详情部分-->
    <Card style ="margin-bottom:20px">
        <p slot="title">{{data.proNumber}}详情</p>
        <Form :label-width="150" inline label-colon>
            <Row :gutter="16">
                <i-col span="8">
                    <FormItem label='项目编号：'>
                        <Button >{{data.proNumber}}</Button>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem label='项目名称:'>
                        <Button >{{data.proName}}</Button>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem label='项目类型：'>
                        <Button >{{data.proType}}</Button>
                    </FormItem>
                </i-col>
            </Row>

            <Row :gutter="16">
                <i-col span="8">
                    <FormItem label='项目创建人:'>
                        <Button>{{data.proCreator}}</Button>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem label='创建人职位：'>
                        <Button>{{data.creatorPost}}</Button>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem label='项目归属单位：'>
                        <Button>{{data.proOrganization}}</Button>
                    </FormItem>
                </i-col>
            </Row>
            <Row :gutter="16">
                <i-col span="8">
                    <FormItem label='创建人邮箱：'>
                        <Button>{{postProjectEmail}}</Button>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem label='创建人电话：'>
                        <Button>{{postProjectIphone}}</Button>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem label='项目公开程度：'>
                        <Button>{{postOpenness}}</Button>
                    </FormItem>
                </i-col>
            </Row>
        </Form>
    </Card>
    <!--”项目参与成员“和”项目参与数据集“数据表通过选择器进行展示-->
    <Card style ="margin-bottom:20px">
        <!--选择器-->
        <Select v-model="model" clearable style="width:200px" placeholder="请选择需要展示的列表">
            <Option v-for="item in tableList" :value="item.value" :key="item.value" @click.native="listShow(item.label)">{{ item.label }}</Option>
        </Select>
        <!--列表区域-->
        <Form>
            <FormItem align="center">
<!--                <div>这是“{{model}}”表格，它的编号是{{postId}}</div>-->
                <Table  stripe ref='selection' height="250" v-if="model==='成员列表'" :columns='columns' :data='data'></Table>
                <Table stripe ref='selection' height="250" v-else-if="model==='数据集列表'" :columns='columnsData' :data='data'></Table>
                <Table stripe ref='selection' height="250" v-else :columns='columnsModel' :data='data'></Table>
            </FormItem>
        </Form>
    </Card>
    <!--项目参与单位-->

    <Card>
        <p slot="title">项目参与机构</p>
        <Row style="padding:20px">
            <Col span="5">
                <Card style="width:350px">
                    <div style="text-align:center">
                        <img src="./img.png">
                        <h3>北京邮电大学</h3>
                    </div>
                </Card>
            </Col>
            <Col span="5">
                <Card style="width:350px">
                    <div style="text-align:center">
                        <img src="./img.png">
                        <h3>电信集成有限公司</h3>
                    </div>
                </Card>
            </Col>
            <Col span="5">
                <Card style="width:350px">
                    <div style="text-align:center">
                        <img src="./img.png">
                        <h3>郑州大学</h3>
                    </div>
                </Card>
            </Col>
            <Col span="5">
                <Card style="width:350px">
                    <div style="text-align:center">
                        <img src="./img.png">
                        <h3>北京工业大学</h3>
                    </div>
                </Card>
            </Col>
            <Col span="4">
                <Card style="width:340px">
                    <Card>
                        <div style="text-align:center">法律说明</div>
                    </Card>
                    <Card>
                        <div style="text-align:center">
                            使用帮助
                        </div>
                    </Card>
                    <Card>
                        <div style="text-align:center">联系我们</div>
                    </Card>
<!--                    <div style="text-align:center">
                       <img src="./img.png">
                       <h3>北京工业大学</h3>
                       法律说明
                   </div>-->

                </Card>
            </Col>
        </Row>
    </Card>
</div>

</template>

<script>

import { GetProject } from '@/services/project-management'
export default {
    name: 'projectDetails.vue',
    data () {
        return {
            projectValue: [{
                postId: 0,
                postProjectName: '',
                postProjectType: '',
                postProjectCreator: '',
                postProjectCreatorDuty: '',
                postProjectOrganization: '',
                postProjectIphone: '',
                postProjectEmail: '',
                postOpenness: ''
            }],
            tableList: [
                {
                    value: '成员列表',
                    label: '成员列表'
                },
                {
                    value: '数据集列表',
                    label: '数据集列表'
                },
                {
                    value: '模型列表',
                    label: '模型列表'
                }
            ],
            // 列表标题
            columns: [
                {
                    title: '编号',
                    key: 'number',
                    align: 'center',
                    width: 200
                },
                {
                    title: '成员名称',
                    key: 'projectName',
                    align: 'center',
                    width: 200
                },
                {
                    title: '成员职务',
                    key: 'projectType',
                    align: 'center',
                    width: 200
                },
                {
                    title: '所属机构',
                    key: 'projectCreator',
                    align: 'center',
                    width: 200
                },
                {
                    title: '联系电话',
                    key: 'projectCreatorDuty',
                    align: 'center',
                    width: 200
                },
                {
                    title: '邮箱',
                    key: 'projectOrganization',
                    align: 'center',
                    width: 200
                },
                {
                    title: '加入时间',
                    key: 'projectIphone',
                    align: 'center',
                    width: 200
                },
                {
                    title: '操作',
                    width: 200,
                    // key: 'description',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                            class: ['table-action-btns']
                        }, [
                            h('div', {
                                class: ['table-action-btn'],
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            },
                            '删除'
                            )
                        ])
                    }
                }
            ],
            data: [],
            // 列表数据
            // data: [
            //     {
            //         number: '0231355',
            //         projectName: '北京医联体项目',
            //         projectType: '医疗类',
            //         projectCreator: '张光卫',
            //         projectCreatorDuty: '项目经理',
            //         projectOrganization: '北京邮电大学',
            //         projectIphone: '18703621498',
            //         projectEmail: '1852156@qq.com',
            //         openness: '仅自己可见'
            //     },
            //     {
            //         number: '000001',
            //         projectName: '中国医联体项目',
            //         projectType: '医疗类',
            //         projectCreator: '张安康',
            //         projectCreatorDuty: '项目经理',
            //         projectOrganization: '北京邮电大学',
            //         projectIphone: '18703621498',
            //         projectEmail: '1852156@qq.com',
            //         openness: '仅自己可见'
            //     },
            //     {
            //         number: '0231355',
            //         projectName: '北京医联体项目',
            //         projectType: '医疗类',
            //         projectCreator: '张光卫',
            //         projectCreatorDuty: '项目经理',
            //         projectOrganization: '北京邮电大学',
            //         projectIphone: '18703621498',
            //         projectEmail: '1852156@qq.com',
            //         openness: '仅自己可见'
            //     },
            //     {
            //         number: '0231355',
            //         projectName: '北京医联体项目',
            //         projectType: '医疗类',
            //         projectCreator: '张光卫',
            //         projectCreatorDuty: '项目经理',
            //         projectOrganization: '北京邮电大学',
            //         projectIphone: '18703621498',
            //         projectEmail: '1852156@qq.com',
            //         openness: '仅自己可见'
            //     },
            //     {
            //         number: '0231355',
            //         projectName: '北京医联体项目',
            //         projectType: '医疗类',
            //         projectCreator: '张光卫',
            //         projectCreatorDuty: '项目经理',
            //         projectOrganization: '北京邮电大学',
            //         projectIphone: '18703621498',
            //         projectEmail: '1852156@qq.com',
            //         openness: '仅自己可见'
            //     },
            //     {
            //         number: '0231355',
            //         projectName: '北京医联体项目',
            //         projectType: '医疗类',
            //         projectCreator: '张光卫',
            //         projectCreatorDuty: '项目经理',
            //         projectOrganization: '北京邮电大学',
            //         projectIphone: '18703621498',
            //         projectEmail: '1852156@qq.com',
            //         openness: '仅自己可见'
            //     },
            //     {
            //         number: '0231355',
            //         projectName: '北京医联体项目',
            //         projectType: '医疗类',
            //         projectCreator: '张光卫',
            //         projectCreatorDuty: '项目经理',
            //         projectOrganization: '北京邮电大学',
            //         projectIphone: '18703621498',
            //         projectEmail: '1852156@qq.com',
            //         openness: '仅自己可见'
            //     },
            //     {
            //         number: '0231355',
            //         projectName: '北京医联体项目',
            //         projectType: '医疗类',
            //         projectCreator: '张光卫',
            //         projectCreatorDuty: '项目经理',
            //         projectOrganization: '北京邮电大学',
            //         projectIphone: '18703621498',
            //         projectEmail: '1852156@qq.com',
            //         openness: '仅自己可见'
            //     }
            // ],
            // data: {}, // 表单数据
            // 数据列表
            columnsData: [
                {
                    title: '编号',
                    key: 'number',
                    align: 'center',
                    width: 200
                },
                {
                    title: '数据集名称',
                    key: 'dataName',
                    align: 'center',
                    width: 200
                },
                {
                    title: '数据集描述',
                    key: 'dataDescription',
                    align: 'center',
                    width: 200
                },
                {
                    title: '数据集创建人',
                    key: 'dataCreator',
                    align: 'center',
                    width: 200
                },
                {
                    title: '创建人电话',
                    key: 'dataCreatorIphone',
                    align: 'center',
                    width: 200
                },
                {
                    title: '数据源类型',
                    key: 'dataType',
                    align: 'center',
                    width: 200
                },
                {
                    title: '公开程度',
                    key: 'openness',
                    align: 'center',
                    width: 200
                },
                {
                    title: '发布时间',
                    key: 'publishedTime',
                    align: 'center',
                    width: 200
                }
            ],
            // 模型列表
            columnsModel: [
                {
                    title: '模型编号',
                    key: 'number',
                    align: 'center',
                    width: 200
                },
                {
                    title: '模型名称',
                    key: 'dataName',
                    align: 'center',
                    width: 200
                },
                {
                    title: '模型描述',
                    key: 'dataDescription',
                    align: 'center',
                    width: 200
                },
                {
                    title: '模型创建人',
                    key: 'dataCreator',
                    align: 'center',
                    width: 200
                },
                {
                    title: '创建人电话',
                    key: 'dataCreatorIphone',
                    align: 'center',
                    width: 200
                },
                {
                    title: '模型类型',
                    key: 'dataType',
                    align: 'center',
                    width: 200
                },
                {
                    title: '公开程度',
                    key: 'openness',
                    align: 'center',
                    width: 200
                },
                {
                    title: '发布时间',
                    key: 'publishedTime',
                    align: 'center',
                    width: 200
                }

            ],
            model: ''
        }
    },
    created () {
        this.getPostsViewsData()
        this.listShow()
    },
    methods: {
        // 获取头部数据
        async  getPostsViewsData () {
            this.number = this.$route.query.id
            let { data } = await GetProject(this.number)

            if (data) {
                this.data = data
            }
        },
        listShow (key) {
            switch (key) {
            case '项目参与成员':
                console.log('项目参与成员')
                break
            case '项目参与数据集':
                console.log('项目参与数据集')
                break
            }
        }
    }

}
</script>

<style scoped>
</style>
