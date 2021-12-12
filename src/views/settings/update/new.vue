<template>
    <div class="update-container" >
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <div class="title">新增版本</div>
            </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
            <el-col :span="3" :offset="6" class="is-right" >
                版本号：
            </el-col>
            <el-col :span="9">
                <el-input type="text" v-model="versionCode" placeholder="请输入版本号" @input="changeValue"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
            <el-col :span="3" :offset="6" class="is-right" >
                版本名称：
            </el-col>
            <el-col :span="9">
                <el-input type="text" v-model="versionName" placeholder="请输入版本名称" @input="changeValue"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
            <el-col :span="3" :offset="6" class="is-right">
                系统类型：
            </el-col>
            <el-col :span="9">
                <el-radio v-model="type" label="ios" @change="changeValue">IOS</el-radio>
                <el-radio v-model="type" label="android" @change="changeValue">Android</el-radio>
            </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
            <el-col :span="3" :offset="6" class="is-right">
                下载链接：
            </el-col>
            <el-col :span="9">
                <el-input type="text" v-model="downloadUrl" placeholder="下载链接" @input="changeValue"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
            <el-col :span="3" :offset="6" class="is-right">
                是否强制更新：
            </el-col>
            <el-col :span="9">
                <el-radio v-model="isForce" label="true" @change="changeValue">是</el-radio>
                <el-radio v-model="isForce" label="false" @change="changeValue">否</el-radio>
            </el-col>
        </el-row>
        <el-row :gutter="20" type="flex">
            <el-col :span="3" :offset="6" class="is-right">
                版本说明：
            </el-col>
            <el-col :span="9">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2}"
                    placeholder="请输入内容"
                    @input="changeValue"
                    v-model="updateContent">
                </el-input>
            </el-col>
        </el-row>
        <el-row type="flex" align="middle" justify="center">
            <el-button type="primary" :disabled="isDisabled" @click="saveAppVersion">保存</el-button>
        </el-row>
    </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, onActivated, onDeactivated } from "vue";
import { useRouter } from "vue-router";
import { createVersions, getVersionDetail } from '@/api/settings'
export default {
    name: "newUpdate",
    setup() {
        const name   = localStorage.getItem("ms_username");
        const router = useRouter();
        let params = reactive({
            downloadUrl: "",
            isForce: "true", // true, false
            type: "ios", // ios, android
            updateContent: "",
            versionCode: "",
            versionName: ""
        })
        const versionId = ref('')
        const isDisabled = ref(true)

        onActivated(() => {
            console.log('onActivated')
            let {query} = router.currentRoute.value
            console.log(query)
            if (query.id) {
                versionId.value = query.id
                getDetail(query)
            }
        })
        onDeactivated(() => {
            params.downloadUrl = ""
            params.isForce = "true" // true, false
            params.type = "ios" // ios, android
            params.updateContent = ""
            params.versionCode = ""
            params.versionName = ""
            versionId.value    = ''
        })
        const getDetail = (query) => {
            getVersionDetail(query).then(res => {
                console.log(res)
                let {code, data, msg} = res;
                if(code === 200) {
                    params.downloadUrl = data.downloadUrl
                    params.isForce = data.isForce.toString()
                    params.type = data.type
                    params.updateContent = data.updateContent
                    params.versionCode = data.versionCode
                    params.versionName = data.versionName
                }
            })
        }
        return {
            name,
            router,
            isDisabled,
            getDetail,
            versionId,
            ...toRefs(params)
        };
    },
    methods: {
        changeValue(value){
            console.log('changeValue', value)
            console.log(this)
            this.buttonStatus()
        },
        buttonStatus() {
            let {downloadUrl, isForce, type, updateContent, versionCode, versionName} = this
            if(downloadUrl && isForce && type && updateContent && versionCode && versionName) {
                this.isDisabled = false
            }
        },
        saveAppVersion() {
            let {downloadUrl, isForce, type, updateContent, versionCode, versionName, versionId} = this
            createVersions({
                downloadUrl, isForce, type, updateContent, versionCode, versionName, id: versionId
            }).then(res => {
                let {code, data, msg} = res
                if(code === 200) {
                    this.downloadUrl = ""
                    this.isForce     = "true"
                    this.type        = "ios"
                    this.updateContent = ""
                    this.versionCode   = ""
                    this.versionName   = ""
                    this.isDisabled    = true
                    this.$message({type: 'success', message: versionId ? '修改成功' : '添加成功!'});
                    this.router.push('/settings/update')
                }
            })
        }
    }
};
</script>

<style scoped>
.update-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.update-container .el-row {
    margin-bottom: 20px;
}

.update-container .is-right{
    text-align: right;
}

.update-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.update-container .el-table{
    text-align: center;
}
.update-container .el-table .el-link{
    margin: 0 5px;
}
.update-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.template{
    display: inline-block;
}
</style>
