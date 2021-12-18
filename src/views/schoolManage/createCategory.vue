<template>
    <div class="school-container">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="title">新增高校分类</div>
                <div class="school-condition">
                    <el-row>
                        <el-col :span="4" :offset="4">
                            高校分类：
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="params.name" placeholder="请输入高校分类名称" ></el-input>
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
import { onActivated, onDeactivated, reactive, ref, toRefs } from "vue";
import { useRouter } from 'vue-router';
import { createSchoolCategory } from '../../api/school.js'
export default {
    name: "newSchoolCategory",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let router = useRouter()
        const params = reactive({
                name: '',
                priority: 1
            });
        onDeactivated(() => {
            params.name = ''
            params.priority = ''
        })
        return {
            name,
            router,
            params
        };
    },
    methods: {
        saveHandle() {
            createSchoolCategory(this.params).then(res => {
                let {code} = res
                if(code === 200){
                    this.$message({type: 'success', message: '保存成功'});
                    this.router.push('/schoolManage/category')
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
