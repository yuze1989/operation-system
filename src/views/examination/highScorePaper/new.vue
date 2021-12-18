<template>
    <div class="paper-new-container">
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <div class="title">添加高分试卷</div>
                <div class="paper-new-condition">
                    <el-row :gutter="20">
                        <el-col :span="10" :offset="8">
                            考试科目：
                            <el-select v-model="examId" clearable
                                @change="changeSelector($event, 'subject')" placeholder="请选择考试科目">
                                <el-option
                                    v-for="(item, index) in subjectList"
                                    :key="index"
                                    :label="item.subjectName"
                                    :value="item.subjectId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="10" :offset="8">
                            考试题目：
                            <el-select v-model="params.questionId" clearable
                                name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                <el-option
                                    v-for="(item, index) in problems"
                                    :key="index"
                                    :label="item.content"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="10" :offset="8">
                            每张试卷价格：
                            <el-input type="text" v-model="params.price" placeholder="每张试卷价格"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="10" :offset="8">
                            版权信息：
                            <el-input type="text" v-model="params.copyright" placeholder="版权信息"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18" :offset="6">
                            试卷图片：
                            <div class="item-img-box">
                                <div class="file-list">
                                    <div class="img" v-for="(item, index) in params.imgs" :key="index">
                                        <img :src="item.hdImg" @click="previewImg(item)" alt="">
                                        <el-input type="text" placeholder="描述" v-model="item.description"></el-input>
                                    </div>
                                    <el-upload
                                        action="https://test-ykh.msjsol.com/sys/file/imageUpload"                                    
                                        :headers="header" multiple :limit="limitPictureNumber"
                                        list-type="picture-card"
                                        :on-success="handleSuccess"
                                        :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                                <el-dialog v-model="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="button-box center">
                    <el-button type="primary" @click="savePaper">保存</el-button>
                </div>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import {createPaper, getSubjectSelectors, questionList, paperDetail} from '@/api/exam'
export default {
    name: "newpaper",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let router = useRouter();
        let token   = localStorage.getItem("token");
        let header = ref({
            SYS_TOKEN: token
        })
        let limitPictureNumber = ref(50)
        let params = reactive({
            copyright: '',
            imgs: [],
            // "description": "图片描述",
            // "hdImg": "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
            price: 0,
            questionId: ''
        })
        let examId = ref('')
        let subjectList = ref([])
        let problems = ref([])
        let dialog = reactive({
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        })
        onMounted(() => {
            let query = router.currentRoute.value.query,
                { id, pid } = query
            if(id) {
                questions(query.id)
            } else if(pid) {
                getPaperDetail(pid)
            }
        })
        let questions = (id) => {
            questionList(id).then(res => {
                console.log(res)
                let {code, data, msg} = res
                if(code === 200) {
                    subjectList.value = data.subjects
                }
            })
        }
        // 获取详情
        let getPaperDetail = (id) => {
            paperDetail(id).then(res => {
                console.log(res)
            })
        }

        return {
            name,
            router,
            header,
            params,
            examId,
            subjectList,
            problems,
            limitPictureNumber,
            ...toRefs(dialog)
        };
    },
    methods: {
        changeValue(e) {
            console.log('changevalue', this.params) 
        },
        changeSelector(e, name) {
            let subject = this.subjectList
            console.log(e)
            console.log('changeSelector', this.params)
            if(name === 'subject'){
                subject.forEach((item, index) => {
                    if(item.subjectId = e) this.problems = item.questions
                })
            };
        },
        // questionId
        getQuestionList() {
            console.log(this.examId)
            questionList(this.examId).then(res => {
                console.log(res)
            })
        },
        //预览图片
        previewImg(file) {
            console.log(file)
            this.dialogImageUrl = file.hdImg;
            this.dialogVisible = true;
        },
        // 图片上传成功
        handleSuccess(response, file, fileList) {
            console.log('handleSuccess', response, file, fileList)
            this.params.imgs.push({
                description: '',
                uid: file.uid,
                hdImg: response.data
            })
        },
        // 图片上传失败
        handleFail(err, file, fileList) {
            console.log('err, file, fileList', err, file, fileList)
        },
        // 删除图片
        handleRemove(file, fileList) {
            console.log('handleRemove', file, fileList)
            this.params.imgs.forEach((item, index, array) => {
                if(file.uid === item.uid) {
                    array.splice(index, 1)
                }
            })
            console.log(this.params.imgs)
        },
        handleLimit(file, fileList) {
            console.log('handleLimit', file, fileList)
        },
        // 保存
        savePaper() {
            console.log(this.params)
            createPaper(this.params).then(res => {
                console.log(res)
                let {code} = res
                if(code === 200) {
                    this.$message({ type: 'success', message: '添加成功!' });
                    this.router.push('/examination/highScorePaper');
                } 
            })
        }
    }
};
</script>

<style>
.paper-new-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.paper-new-container .el-row {
    margin: 20px 0;
}

.paper-new-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.paper-new-container .el-table{
    text-align: center;
}
.paper-new-container .el-table .el-link{
    margin: 0 5px;
}
.paper-new-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.paper-new-condition .el-col{
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
}
.paper-new-condition .el-col .el-input{
    width: 200px;
}
.paper-new-condition .el-col .el-date-editor.el-input{
    width: 200px;
}

.paper-new-condition.paper-subject{
    position: relative;
    margin-top: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    border: 1px solid #EEE;
    border-radius: 10px;
}
.paper-subject .delete-button{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(120%, -50%);
}
.paper-subject .subject-item{
    margin: 10px 0;
}
/* .paper-subject .subject-item:first-child{
    margin-top: 0;
} */
.button-box{
    margin: 20px 0;
}
.button-box.center{
    text-align: center;
}

.item-img-box{
    flex: 1;
}

.item-img-box .file-list{
    display: flex;
    flex-wrap: wrap
}
.item-img-box .file-list .img{
    padding:0 5px;
    box-sizing: border-box;
    width: 164px;
    border-radius: 5px;
}
.item-img-box .file-list .img .el-input{
    width: 100%;
}
.item-img-box .file-list .img img{
    width: 100%;
    height: 146px;
    border-radius: 5px;
}
.item-img-box .el-upload-list,
.item-img-box .el-upload-list.el-upload-list--picture-card {
    display: none;
}
.el-dialog .el-dialog__body img{
    width: 100%;
}
</style>
