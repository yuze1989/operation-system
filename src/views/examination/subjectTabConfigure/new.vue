<template>
    <div class="subject-container">
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="create-title">新增科目</div>
                <div class="create-content">
                    <div v-for="(subject, index) in createSubjectData" :key="index" class="content-item">
                        <span class="tit">科目名称</span>
                        <input type="text" placeholder="请输入科目名称" v-model="subject.txt">
                        <el-button size="mini" @click="removeSubject" :data-index="index" v-show="index !== 0">移除</el-button>
                    </div>
                    <div class="content-new">
                        <el-button type="primary" size="mini" @click="AddNewSubject">添加</el-button>
                    </div>
                    <div class="content-save">
                        <el-button type="primary" @click="saveSubject">保存</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { createSubject } from '@/api/exam'
export default {
    name: "newSubjectTabConfigure",
    setup() {
        let createSubjectData = ref([{txt: ''}])
        let router = useRouter()

        return {
            router,
            createSubjectData
        }
    },
    methods: {
        AddNewSubject() {
            this.createSubjectData.push({txt: ''})
        },
        removeSubject(e) {
            let {index} = e.currentTarget.dataset,
                _data   = this.createSubjectData;
            console.log(e.currentTarget, index)
            _data.splice(Number(index), 1)
            this.createSubjectData = _data;
        },
        saveSubject() {
            let _data = this.createSubjectData,
                _txtArray = []
            console.log('saveSubject', this)
            _data.forEach(item => {
                _txtArray.push(item.txt)
            })
            console.log('_txtArray', _txtArray, _txtArray.join(','))
            createSubject({
                name: _txtArray.join(',')
            }).then(res => {
                console.log('object', res)
                let {code, data, msg} = res
                if(code === 200) {
                    this.$message('添加成功');
                    this.createSubjectData = [{txt: ''}]
                    this.router.push('/examination/subjectTabConfigure')
                }
            })
        }
    }
};
</script>

<style scoped>
.subject-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.subject-container .el-row {
    margin-bottom: 20px;
}

.subject-container .create-title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.subject-container .create-content {
    text-align: center;
}
.subject-container .create-content .content-item{
    display: flex;
    /* justify-content: center; */
    align-content: center;
    margin: 20px auto;
    width: 400px;
}
.subject-container .create-content .content-item .txt{
    display: inline-block;
}
.subject-container .create-content .content-item input{
    margin: 0 20px;
    padding: 0 10px;
    height: 30px;
    /* outline: none; */
    border: 1px solid #EEEEEE;
    border-radius: 5px;
}
.subject-container .create-content .content-item el-button{

}
.subject-container .create-content .content-new{
    margin: 20px auto;
    width: 400px;
    text-align: left;
}
</style>
