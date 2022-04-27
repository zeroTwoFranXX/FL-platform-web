<template>
    <div class="config-container common-scrollbar">
        <components :is="dev_component" :nodeId="getComponentId"></components>
    </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
    name: "paddlepaddleConfig",
    components:{},
    data () {
        return {
            dev_component: '',
            currentNodeId:0
        }
    },
    computed:{
        ...mapGetters('config',[
            'getComponentId',
            'getVueName'
        ])
    },

    watch:{
        getVueName(newValue,oldValue){
            if (newValue){
                this.dev_component = newValue
                console.log('newComponent:  ',this.dev_component)
            }
        }
    }
}
</script>

<style scoped>

</style>
