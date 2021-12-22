<template>
    <div class="paper-new-container">
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <div class="title">添加高分试卷</div>
                <div class="paper-new-condition">
                    <el-row :gutter="20">
                        <el-col :span="10" :offset="8">
                            考试科目：
                            <el-input type="text" disabled v-model="subject.name"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="10" :offset="8">
                            考试题目：
                            <el-input type="text" disabled  v-model="question.content"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="10" :offset="8">
                            每张试卷价格：
                            <el-input type="text" v-model="price" placeholder="每张试卷价格"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="10" :offset="8">
                            版权信息：
                            <el-input type="text" v-model="copyright" placeholder="版权信息"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="18" :offset="6">
                            试卷图片：
                            <div class="item-img-box">
                                <div class="file-list">
                                    <div class="img" v-for="(itl, i) in imgs" :key="i">
                                        <img :src="itl.hdImg" @click="previewImg(itl)" alt="">
                                        <span class="delete-icon" @click="removeHdImg(i)">x</span>
                                        <el-input type="text" placeholder="描述" v-model="itl.description"></el-input>
                                    </div>
                                    <el-upload v-show="!imgs.length"
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
import { onActivated, onBeforeUnmount, onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import {updatePaper, paperDetail} from '@/api/exam'
export default {
    name: "detailHighScorePaper",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let router = useRouter();
        let token   = localStorage.getItem("token");
        let header = ref({ SYS_TOKEN: token })
        let limitPictureNumber = ref(1)
        // "description": "图片描述",
        // "hdImg": "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
        let params = reactive({
            subject: {},
            question: {},
            copyright: '',
            imgs: [],
            price: 0,
            questionId: '',
            id:''
        })

        let subject = reactive({})
        let question = reactive({})

        let dialog = reactive({
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        })
        onMounted(() => {
            let query = router.currentRoute.value.query;
            getPaperDetail(query.pid)
        })
        onActivated(() => {
            let query = router.currentRoute.value.query;
            getPaperDetail(query.pid)
        })
        onBeforeUnmount(() => {
            console.log('onBeforeUnmount')
            params = {
                subject: {},
                question: {},
                copyright: '',
                imgs: [],
                price: 0,
                questionId: '',
                id: ''
            } 
        })
        // 获取详情
        let getPaperDetail = (id) => {
            params.id = id;
            paperDetail(id).then(res => {
                console.log('高分试卷详情', res)
                let {code, data, msg} = res,
                    {subject, question, paperImg} = data;
                params.subject = subject
                params.question = question
                params.copyright = paperImg.copyright
                params.price = paperImg.price
                params.questionId = paperImg.questionId
                params.imgs = [{
                    hdImg: paperImg.hdImg,
                    description: paperImg.description
                }]
            })
        }

        return {
            name,
            router,
            header,
            params,
            subject,
            question,
            getPaperDetail,
            limitPictureNumber,
            ...toRefs(dialog),
            ...toRefs(params),
        };
    },
    methods: {
        changeValue(e) {
            console.log('changevalue', this.params) 
        },
        //预览图片
        previewImg(file) {
            console.log(file)
            this.dialogImageUrl = file.hdImg;
            this.dialogVisible = true;
        },
        // 自定义删除图片
        removeHdImg(index) {
            console.log('object', index)
            this.params.imgs.splice(index, 1)
            console.log(this.params.imgs)
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
            let {copyright, questionId, price, imgs, id} = this
            console.log('copyright, questionId, price', copyright, questionId, price, imgs)
            updatePaper({
                copyright,
                description: imgs[0]['description'],
                hdImg: imgs[0]['hdImg'],
                id,
                price
            }).then(res => {
                console.log(res)
                let {code} = res
                if(code === 200) {
                    this.$message({ type: 'success', message: '修改成功!' });
                    this.router.push('/examination/highScorePaper');
                } 
            })
        }
    }
}
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
    position: relative;
    padding:0 5px;
    box-sizing: border-box;
    width: 164px;
    border-radius: 5px;
}
.item-img-box .file-list .img .delete-icon{
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(25%, -25%);
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    background: #FFFFFF;
    cursor: pointer;
    z-index: 999;
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
