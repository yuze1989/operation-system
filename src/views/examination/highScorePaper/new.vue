<template>
    <div class="paper-new-container">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <div class="title">添加历年考题</div>
                <div class="paper-new-condition">
                    <el-row>
                        <el-col :span="12">
                            考试类型：
                            <div class="">
                                <el-select v-model="params.type" clearable
                                    name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                    <el-option
                                        v-for="(type, index) in typeList"
                                        :key="index"
                                        :label="type"
                                        :value="type">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            考试年份：
                            <div class="">
                                <el-date-picker
                                    v-model="params.year"
                                    type="year">
                                </el-date-picker>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            主办方：
                            <div class="">
                                <el-select v-model="params.type" clearable
                                    name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                    <el-option
                                        v-for="(type, index) in typeList"
                                        :key="index"
                                        :label="type"
                                        :value="type">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="">
                                <el-select v-model="params.type" clearable
                                    name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                    <el-option
                                        v-for="(type, index) in typeList"
                                        :key="index"
                                        :label="type"
                                        :value="type">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            专业：
                            <el-input type="text"></el-input>
                        </el-col>
                        <el-col :span="12">
                            考试名称：
                            <el-input type="text"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="button-box">
                    <el-button type="primary" @click="createSubject">添加科目</el-button>
                </div>
                <div class="paper-new-condition paper-subject" v-for="(item, index) in subjectData" :key="index">
                    <el-row>
                        <el-col class="subject-item">
                            考试科目：
                            <div class="">
                                <el-select v-model="item.subject" clearable
                                    name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                    <el-option
                                        v-for="(type, index) in typeList"
                                        :key="index"
                                        :label="type"
                                        :value="type">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col class="subject-item">
                            考试题目：
                            <div class="">
                                <el-input placeholder="请输入考试题目" v-model="item.problem"></el-input>
                            </div>
                        </el-col>
                        <el-col class="subject-item">
                            考试时间：
                            <div class="">
                                <el-date-picker
                                    v-model="item.date"
                                    type="date"
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
                    <el-button type="primary">保存</el-button>
                </div>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {getSubjectList} from '@/api/exam'
export default {
    name: "newpaper",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let router = useRouter();
        
        let params = reactive({
            firstMenu: '',
            secondMenu: '',
            type: ''
        })
        
        let subjectData = reactive([{
            subject: '',
            problem: '',
            date: '',
            content: '',
            img: '',
            remarks: ''
        }])

        let createPaper = (e) => {
            router.push('/examination/paper/new')
        }

        return {
            name,
            createPaper,
            params,
            subjectData
        };
    },
    methods: {
        changeValue(e) {
            console.log('changevalue', this.params) 
        },
        changeSelector(e) {
            console.log(e)
            this.params.type = e;
            console.log('changeSelector', this.params)
        },
        createSubject() {
            this.subjectData.push({
                subject: '',
                problem: '',
                date: '',
                content: '',
                img: '',
                remarks: ''
            })
        },
        deleteSubject(e) {
            let {index} = e.currentTarget.dataset;
            this.subjectData.splice(index, 1)
        }
    }
};
</script>

<style scoped>
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
    width: 200px !important;
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
</style>
