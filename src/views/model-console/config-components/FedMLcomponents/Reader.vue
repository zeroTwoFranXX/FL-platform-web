<template>
    <div>
        <div style="height:36px; line-height:36px">Reader</div>
        <Form ref="form" :model="formData" label-position="top">
            <FormItem label="Dataset:" prop="dataset">
                <Select v-model="formData.dataSet" multiple placeholder="选择数据集">
                    <Option v-for="(item,index) in DataSet" :key="index" :value="item">{{item}}</Option>
                </Select>
            </FormItem>
            <p>lending_club_loan:借贷数据集，用于纵向联邦学习任务</p>
            <p>CIFAR:CIFAR10图像数据集</p>
            <FormItem>
                <Button type="primary" @click='handleOk'>确定</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    name: "Reader",
    data(){
        return{
            formData:{
                dataSet:[]
            },
            DataSet:['MNIST手写数据集','lending_club_loan','CIFAR']
        }
    },
    methods:{
        handleOk(){

        }
    }
}
</script>

<style scoped>

</style>
