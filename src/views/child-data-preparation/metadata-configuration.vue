<template>
<div onscroll="true">
    <div class="header">
<!--        <p class="header">{{data.name}}元数据配置</p>-->
        <Button class="button"  @click="change(0)" type="primary">{{data.name}}基本信息</Button>
        <Button class="button"  @click="change(2)" type="primary">{{data.name}}属性信息</Button>
        <Button class="button"  @click="change(1)" type="primary">{{data.name}}字段信息</Button>

        <Button class="back" @click="back" type="primary">返回</Button>
    </div>
<!--    <div class="div2" >-->
    <Card style ="margin-bottom:20px">
        <Form >
            <FormItem align="center">
                <Table v-show="0===number" :columns='columns' :data='data'></Table>
                <Table v-show="1===number" :columns='columnsData' :data='data'></Table>
                <Table v-show="2===number" :columns='columnsModel' :data='data'></Table>
            </FormItem>

        </Form>
    </Card>

<!--    </div>-->

</div>
</template>

<script>
import axios from 'axios'
import { GetChildData } from '@/services/child-data-management'
import { GetCenterData } from '@/services/center-data-management'
export default {
    name: 'metadata-configuration.vue',
    data () {
        return {
            // data:[],
            number: 0,
            // 列表选择
            // tableList: [
            //     {
            //         value: '成员列表',
            //         label: '成员列表'
            //     },
            //     {
            //         value: '数据集列表',
            //         label: '数据集列表'
            //     },
            //     {
            //         value: '模型列表',
            //         label: '模型列表'
            //     }
            // ],
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
            // 列表数据
            data: [
                {
                    number: '0231355',
                    projectName: '北京医联体项目',
                    projectType: '医疗类',
                    projectCreator: '张光卫',
                    projectCreatorDuty: '项目经理',
                    projectOrganization: '北京邮电大学',
                    projectIphone: '18703621498',
                    projectEmail: '1852156@qq.com',
                    openness: '仅自己可见'
                },
                {
                    number: '000001',
                    projectName: '中国医联体项目',
                    projectType: '医疗类',
                    projectCreator: '张安康',
                    projectCreatorDuty: '项目经理',
                    projectOrganization: '北京邮电大学',
                    projectIphone: '18703621498',
                    projectEmail: '1852156@qq.com',
                    openness: '仅自己可见'
                },
                {
                    number: '0231355',
                    projectName: '北京医联体项目',
                    projectType: '医疗类',
                    projectCreator: '张光卫',
                    projectCreatorDuty: '项目经理',
                    projectOrganization: '北京邮电大学',
                    projectIphone: '18703621498',
                    projectEmail: '1852156@qq.com',
                    openness: '仅自己可见'
                },
                {
                    number: '0231355',
                    projectName: '北京医联体项目',
                    projectType: '医疗类',
                    projectCreator: '张光卫',
                    projectCreatorDuty: '项目经理',
                    projectOrganization: '北京邮电大学',
                    projectIphone: '18703621498',
                    projectEmail: '1852156@qq.com',
                    openness: '仅自己可见'
                },
                {
                    number: '0231355',
                    projectName: '北京医联体项目',
                    projectType: '医疗类',
                    projectCreator: '张光卫',
                    projectCreatorDuty: '项目经理',
                    projectOrganization: '北京邮电大学',
                    projectIphone: '18703621498',
                    projectEmail: '1852156@qq.com',
                    openness: '仅自己可见'
                },
                {
                    number: '0231355',
                    projectName: '北京医联体项目',
                    projectType: '医疗类',
                    projectCreator: '张光卫',
                    projectCreatorDuty: '项目经理',
                    projectOrganization: '北京邮电大学',
                    projectIphone: '18703621498',
                    projectEmail: '1852156@qq.com',
                    openness: '仅自己可见'
                },
                {
                    number: '0231355',
                    projectName: '北京医联体项目',
                    projectType: '医疗类',
                    projectCreator: '张光卫',
                    projectCreatorDuty: '项目经理',
                    projectOrganization: '北京邮电大学',
                    projectIphone: '18703621498',
                    projectEmail: '1852156@qq.com',
                    openness: '仅自己可见'
                },
                {
                    number: '0231355',
                    projectName: '北京医联体项目',
                    projectType: '医疗类',
                    projectCreator: '张光卫',
                    projectCreatorDuty: '项目经理',
                    projectOrganization: '北京邮电大学',
                    projectIphone: '18703621498',
                    projectEmail: '1852156@qq.com',
                    openness: '仅自己可见'
                }
            ],
            // data: {}, // 表单数据
            // 数据列表
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

            ]
        }
    },
    created () {
        this.getPostsViewsData()
    },
    methods: {
        // 获得元数据配置信息
        async getPostsViewsData () {
            let { data } = await GetChildData(this.$route.query.id)
            if (data) {
                this.data = data
            }
        },
        // 列表选择
        change (index) {
            this.number = index
        },

        // // 列表选择
        // listShow (key) {
        //     switch (key) {
        //         case '项目参与成员':
        //             console.log('项目参与成员')
        //             break
        //         case '项目参与数据集':
        //             console.log('项目参与数据集')
        //             break
        //     }
        // },
        // 返回上一级
        back () {
            this.$router.push('/child-dataset-management/')
        }
    }
}
</script>

<style scoped>
.header{
    margin: 50px;
}
.button{
    margin-right: 20px;
}
.back{
    float: right;
    margin: 50px;
}
.div2{
    /*margin-top: 50px;*/
    /*margin-left:1000px;*/
    /*align-content: center;*/
}
/*.btn_anniu{
    width: 15%;
    padding: 25px 0;
    font-size: 29px;
    font-weight: bold;
    border: 0 solid #fff;
    color: #000;
    outline: none;
    background: #fff;
}
.newStyle{
    border-bottom: 2px solid #f0892e;
    color: #f0892e;
    font-size: 29px;
    font-weight: bold;
}*/

</style>
