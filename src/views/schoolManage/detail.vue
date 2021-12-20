<template>
    <div class="school-container">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="title">添加高校信息</div>
                <div class="school-condition">
                    <el-row>
                        <el-col :span="4" :offset="4">
                            高校名称：
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="params.name" @input="changeValue" placeholder="请输入高校名称" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" :offset="4">
                            高校网站地址：
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="params.url" @input="changeValue" placeholder="请输入高校网址" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" :offset="4">
                            高校分类：
                        </el-col>
                        <el-col :span="10">
                            <el-select v-model="params.classifyId" clearable
                                name="type" @change="changeSelector($event, 'classifyId')" placeholder="请选择">
                                <el-option
                                    v-for="(item, index) in schoolType"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" :offset="4">
                            高校地址：
                        </el-col>
                        <el-col :span="10">
                            <el-select v-model="params.provinceId" clearable
                                name="type" @change="changeSelector($event, 'provinceId')" placeholder="请选择省">
                                <el-option
                                    v-for="(item, index) in provinceList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="params.cityId" clearable
                                name="type" @change="changeSelector($event)" placeholder="请选择市">
                                <el-option
                                    v-for="(item, index) in cityList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" :offset="4">
                            高校详细地址：
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="params.address" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" :offset="4">
                            高校简介：
                        </el-col>
                        <el-col :span="10">
                            <el-input type="textarea" v-model="params.description" @input="changeValue" :autosize="{ minRows: 4}" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" :offset="4">
                            高校LOGO：
                        </el-col>
                        <el-col :span="10">
                            <div>
                                    <!-- :disabled="uploadIsDisabled" -->
                                <el-upload :class="{'upload-display': uploadIsDisabled}" class="disUoloadSty"
                                    action="https://test-ykh.msjsol.com/sys/file/imageUpload"
                                    list-type="picture-card"
                                    :headers="header" :limit="limitPictureNumber"
                                    :on-success="handleSuccess"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" :offset="4">
                            app展示位置：
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="params.ranking" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="14" :offset="4">
                            <el-button type="primary" @click="saveHandle">保存</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { getCity, getSchoolType, createSchool, areaList } from '../../api/school.js'
export default {
    name: "logs",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let token   = localStorage.getItem("token");
        let router = useRouter()
        let header = ref({
            SYS_TOKEN: token
        })
        const params = reactive({
                address: '',
                classifyId: '',
                url: '',
                description: '',
                detail: '',
                id: 0,
                logo: '',
                name: '',
                provinceId: '',
                cityId: '',
                ranking: 0
            });
        const loading       = ref(true);
        const limitPictureNumber = ref(1);
        const schoolType    = ref([])
        const provinceList  = ref([])
        const cityList      = ref([])
        const uploadIsDisabled = ref(false)
        const fileList = ref(false)

        getSchoolType().then(res => {
            console.log('getSchoolType', res)
            let {code, data, msg} = res;
            schoolType.value = data
        })
        onMounted(() => {
            let query = router.currentRoute.value.query
            getAreaList()
        })
        // 新省市区列表
        let getAreaList = (pid, type) => {
            // let data = type ? {id: pid || 0} : {pid: pid || 0}
            areaList({pid: pid || 0}).then(res => {
                console.log('areaList', res)
                let {code, data, msg} = res;
                if(type) {
                    cityList.value = data
                } else {
                    provinceList.value = data
                }
            })
        }
        return {
            name,
            header,
            router,
            params,
            limitPictureNumber,
            schoolType,
            provinceList,
            cityList,
            loading,
            uploadIsDisabled,
            getAreaList
        };
    },
    methods: {
        changeValue() {
            console.log('changeValue', this.params)
        },
        changeSelector(id, name){
            console.log('changeSelector', id, this.params)
            if(name === 'provinceId') this.getAreaList(id, name)
        },
        // 上传logo
        handleSuccess(response, file, fileList){
            console.log(response, file, fileList)
            this.params.logo = response.data
            this.uploadIsDisabled = true
        },
        handleRemove(file){
            this.uploadIsDisabled = false
        },
        // 市区列表
        getCityList() {
            getCity(this.params.provinceId).then(res => {
                console.log('getCityList', res)
                let {code, data, msg} = res;
                this.cityList = data
                this.params.cityId = ''
                console.log(this.params)
            })
        },
        saveHandle() {
            console.log(this.params)
            createSchool({...this.params, detail: this.params.description}).then(res => {
                console.log(res)
                let {code, msg} = res
                if(code === 200) {
                    this.$message({type: 'success', message: '添加成功'})
                    this.router.push('/schoolManage')
                }
            })
        }
    }
};
</script>

<style scoped>
.school-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.school-container .el-row {
    margin-bottom: 20px;
}

.school-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.school-container .el-table{
    text-align: center;
}
.school-container .el-table .el-link{
    margin: 0 5px;
}
.school-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.school-condition .el-col{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.school-condition .text-right{
    text-align: right;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /* .disUoloadSty .el-upload.el-upload--picture-card{
      display: none;
  } */
</style>
