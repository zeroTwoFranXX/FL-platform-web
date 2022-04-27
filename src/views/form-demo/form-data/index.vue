<template>
    <div>
        <Upload
            :before-upload="handleBeforeUpload"
            action=""
        >
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
        <div>{{name}}</div>
        <Button type="primary" @click="uploadFile">提交</Button>
    </div>
</template>
<script>
import { uploadTest } from '@/services/api/uploadTest'
export default {
    data () {
        return {
            files: [],
            name: ''
        }
    },
    methods: {
        handleBeforeUpload (file) {
            // 修改了头像
            this.files = [file]
            this.name = file.name
            console.log(this.files[0])
            return false
        },
        uploadFile () {
            let formData = new FormData()

            formData.append('id', 123456)
            formData.append('projName', 'projName-Test')
            // 多个文件上传
            for (let i = 0; i < this.files.length; i++) {
                formData.append('file', this.files[i]) // 文件对象
            }
            uploadTest(formData).then(res => {
                console.log('uploadFile', res)
            })
        }
    }
}
</script>
