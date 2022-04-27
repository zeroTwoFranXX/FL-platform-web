<template>
    <div>
        <h1 style="color: #ff9900">欢迎用户使用联邦机器学习平台</h1>
        <center-header></center-header>
        <h1  style="color: #ff9900">运行状况</h1>
        <run-status></run-status>
        <div style="width: 100%;color: #ff9900">
            <h1 style="color: #ff9900">我的项目
                <Button to="/project-management/" type="success" style="float: right;width: 210px;" size="large">
                    <h1>
                        >>全部项目
                    </h1>
                </Button>
            </h1>
        </div>
        <application-run-status></application-run-status>
        <use-help style="width: 100%;height: 100px"></use-help>
    </div>

</template>

<script>
import ApplicationRunStatus from './components/application-run-status'
import CenterHeader from './components/center-header'
import UseHelp from './components/use-help'
import RunStatus from './components/run-status'
export default {
    name: 'index.vue',
    components: {
        ApplicationRunStatus, CenterHeader, UseHelp, RunStatus
    }
}
</script>

<style scoped>

</style>
