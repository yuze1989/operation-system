<template>
    <div class="history-new-container">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="title">添加历年考题</div>
                <div class="history-new-condition">
                    <el-row>
                        <el-col :span="12">
                            考试类型：
                            <div class="">
                                <el-select v-model="params.type" clearable
                                    @change="changeSelector($event, 'type')" placeholder="请选择考题类型">
                                    <el-option
                                        v-for="item in typeList"
                                        :key="item.type"
                                        :label="item.value"
                                        :value="item.type">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            考试年份：
                            <div class="">
                                <el-date-picker
                                    v-model="params.year"
                                    value-format="YYYY"
                                    type="year">
                                </el-date-picker>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            主办方：
                            <div class="">
                                <el-select v-model="params.parent" clearable
                                    @change="changeSelector($event, 'parent')" placeholder="请选择考题类型">
                                    <el-option
                                        v-for="(item, index) in parentMenus"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="">
                                <el-select v-model="params.children" clearable
                                    @change="changeSelector($event, 'children')" placeholder="请选择考题类型">
                                    <el-option
                                        v-for="(item, index) in childrenMenus"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            专业：
                            <el-input type="text" v-model="params.specialty"></el-input>
                        </el-col>
                        <el-col :span="12">
                            考试名称：
                            <el-input type="text" v-model="params.name"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="button-box">
                    <el-button type="primary" @click="createSubject">添加科目</el-button>
                </div>
                <div class="history-new-condition history-subject" v-for="(item, index) in subjectData" :key="index">
                    <el-row>
                        <el-col class="subject-item">
                            考试科目：
                            <div class="">
                                <el-select v-model="item.subjectId" clearable
                                    @change="changeSelector($event)" placeholder="请选择考题类型">
                                    <el-option
                                        v-for="(item, index) in subjectSelectors"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col class="subject-item">
                            考试题目：
                            <div class="">
                                <el-input placeholder="请输入考试题目" v-model="item.title"></el-input>
                            </div>
                        </el-col>
                        <el-col class="subject-item">
                            考试时间：
                            <div class="">
                                <el-date-picker
                                    v-model="item.examDate"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-col>
                        <el-col class="subject-item">
                            考试内容与简介：
                            <div class="">
                                <el-input
                                    type="textarea"
                                    autosize
                                    placeholder="请输入内容"
                                    v-model="item.content">
                                </el-input>
                            </div>
                        </el-col>
                        <el-col class="subject-item">
                            考试图片：
                            <div class="item-img-box">
                                <el-upload
                                    action="https://test-ykh.msjsol.com/sys/file/imageUpload"                                    
                                    :headers="header" multiple :limit="limitPictureNumber"
                                    list-type="picture-card"
                                    :on-success="(response, file, fileList) => handleSuccess(response, file, fileList, index)"
                                    :on-remove="(file, fileList) => handleRemove(file, fileList, index)">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </div>
                        </el-col>
                        <el-col class="subject-item">
                            备注：
                            <div class="">
                                <el-input
                                    type="textarea"
                                    autosize
                                    placeholder="请输入内容"
                                    v-model="item.remarks">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-button type="danger" class="delete-button" size="mini" v-if="index !== 0" :data-index="index" @click="deleteSubject">删除</el-button>
                </div>
                <div class="button-box center">
                    <el-button type="primary" @click="save">保存</el-button>
                </div>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getSponsorList, getSubjectSelectors, createHistoryExam, historyExamDetail } from '@/api/exam'
export default {
    name: "examineHistoryDetail",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let token   = localStorage.getItem("token");
        let router = useRouter();
        let header = ref({
            SYS_TOKEN: token
        })
        let typeList = ref([
            {type: '0', value: '高考'},
            {type: '1', value: '模考'},
        ])
        let limitPictureNumber = ref(50)
        let pictureList = ref([])
        let params = reactive({
            parent: '',
            children: '',
            year: '',
            type: '', 
            specialty: '', //专业
            name: ''       //考试名称
        })
        
        let parentMenus = ref([])
        let childrenMenus = ref([])
        let subjectSelectors = ref([])

        let subjectData = reactive([{
            subjectId: '',
            title: '',
            examDate: '',
            content: '',
            imgs: [],
            remarks: ''
        }])

        onMounted(() => {
            console.log(router)
            let query = router.currentRoute.value.query
            examDetail(query.id)
        })
        // 获取详情
        let examDetail = (id) => {
            historyExamDetail(id).then(res => {
                console.log(res)
            })
        }
        // 获取科目列表
        getSubjectSelectors().then(res => {
            console.log('getSubjectSelectors', res)
            let {code, data, msg} = res
            if(code === 200) subjectSelectors.value = data
        })

        return {
            name,
            header,
            router,
            params,
            subjectData,
            typeList,
            parentMenus,
            childrenMenus,
            subjectSelectors,
            pictureList,
            limitPictureNumber,
            historyExamDetail 
        };
    },
    methods: {
        changeValue(e) {
            console.log('changevalue', e, this.params) 
        },
        changeSelector(value, type) {
            console.log(value, type)
            if(type === 'type') {
                this.params.type = value;
                this.getTagList(value)
            } else if(type === 'parent') {
                this.params.parent = value
                this.getTagList(this.params.type, value)
            }
            console.log('changeSelector', this.params)
        },
        getTagList(type, parentId) {
            getSponsorList({
                type: type, //考试类型 0-模考，1-高考
                level: parentId ? 1 : 0 , //级别 0-一级，1-二级
                parentId: parentId || 0
            }).then(res => {
                console.log('getSponsorList', res)
                let {code, data, msg} = res
                if(type && !parentId) {
                    this.parentMenus = data
                    console.log(this.parentMenus)
                } else if(type && parentId) {
                    this.childrenMenus = data
                }
            })
        },
        createSubject() {
            this.subjectData.push({
                subjectId: '',
                title: '',
                examDate: '',
                content: '',
                imgs: [],
                remarks: ''
            })
        },
        deleteSubject(e) {
            let {index} = e.currentTarget.dataset;
            this.subjectData.splice(index, 1)
        },
        // 图片上传成功
        handleSuccess(response, file, fileList, index) {
            console.log('handleSuccess', response, file, fileList, index)
            this.subjectData[index]['imgs'].push({
                // name: file.name,
                // uid: file.uid,
                // url: response.data,
                description: file.name,
                hdImg: response.data,
                id: file.uid
            })
            console.log('this.pictureList', this.subjectData)
        },
        // 图片上传失败
        handleFail(err, file, fileList) {
            console.log('err, file, fileList', err, file, fileList)
        },
        // 删除图片
        handleRemove(file, fileList, index) {
            console.log('handleRemove', file, fileList, index)
            let { name, uid } = file,
                { subjectData } = this,
                _data = subjectData[index]['imgs'];
            _data.forEach((item, index, array) => {
                if(item.id === uid) 
                    array.splice(index, 1);
                    return 
            })
            // pictureList.forEach((item, index) => {
            //     if(item.uid === uid) {
            //         this.pictureList.splice(index, 1);
            //         return 
            //     }
            // })
            console.log('object', this.subjectData)
        },
        handleLimit(file, fileList) {
            console.log('handleLimit', file, fileList)
        },
        // 保存
        save(){
            console.log(this.params)
            console.log(this.subjectData)
            let { parent, children, year, type, specialty, name } = this.params
            let imgs = this.subjectData[0]['imgs']
            this.pictureList.forEach((item, index) => {
                imgs.push({
                    description: item.name,
                    hdImg: item.url,
                    id: index
                })
            })
            let data = {
                menuId: children, 
                id: parent, 
                year, 
                type, 
                specialty, 
                name,
                questions: this.subjectData
            }
            createHistoryExam(data).then(res => {
                console.log(res)
                let {code} = res
                if(code === 200) {
                    this.$message({ type: 'success', message: '添加成功!' });
                    this.router.push('/examination/history/');
                }
            })
        }
    }
};
</script>

<style scoped>
.history-new-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.history-new-container .el-row {
    margin: 20px 0;
}

.history-new-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.history-new-container .el-table{
    text-align: center;
}
.history-new-container .el-table .el-link{
    margin: 0 5px;
}
.history-new-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.history-new-condition .el-col{
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
}
.history-new-condition .el-col .el-input{
    width: 200px !important;
}
.history-new-condition .el-col .el-date-editor.el-input{
    width: 200px;
}

.history-new-condition.history-subject{
    position: relative;
    margin-top: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    border: 1px solid #EEE;
    border-radius: 10px;
}
.history-subject .delete-button{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(120%, -50%);
}
.history-subject .subject-item{
    margin: 10px 0;
}
.history-subject .subject-item .item-img-box{
    flex: 1;

}
/* .history-subject .subject-item:first-child{
    margin-top: 0;
} */
.button-box{
    margin: 20px 0;
}
.button-box.center{
    text-align: center;
}

/* 上传图片样式 */
.item-img-box .el-upload-list--picture-card .el-upload-list__item {
    height: 178px;
}
</style>
