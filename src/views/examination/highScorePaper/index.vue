<template>
    <div class="paper-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="title">高分试卷信息</div>
                <div class="paper-condition">
                    <el-row>
                        <el-col :span="6" :offset="4">
                            考试类型：
                            <el-select v-model="params.type" clearable
                                name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                <el-option
                                    v-for="(type, index) in typeList"
                                    :key="index"
                                    :label="type"
                                    :value="type">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            机构名称：
                            <el-input v-model="params.secondMenu" data-name="secondMenu" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" :offset="4">
                            考题年份：
                            <el-select v-model="params.type" clearable
                                name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                <el-option
                                    v-for="(type, index) in typeList"
                                    :key="index"
                                    :label="type"
                                    :value="type">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            主办方归属：
                            <el-input v-model="params.secondMenu" data-name="secondMenu" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" :offset="4">
                            考试科目：
                            <el-select v-model="params.type" clearable
                                name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                <el-option
                                    v-for="(type, index) in typeList"
                                    :key="index"
                                    :label="type"
                                    :value="type">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            考试题目：
                            <el-input v-model="params.secondMenu" data-name="secondMenu" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-button type="primary" @click="createHighPaper">新增高分试卷</el-button>
                </div>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="name" label="机构ID"></el-table-column>
                    <el-table-column prop="name" label="机构名称"></el-table-column>
                    <el-table-column prop="name" label="考试类型"></el-table-column>
                    <el-table-column prop="name" label="主办方归属"></el-table-column>
                    <el-table-column prop="name" label="考题年份"></el-table-column>
                    <el-table-column prop="name" label="考试类型"></el-table-column>
                    <el-table-column prop="name" label="考试名称"></el-table-column>
                    <el-table-column prop="name" label="考试科目"></el-table-column>
                    <el-table-column prop="name" label="考试题目"></el-table-column>
                    <el-table-column prop="name" label="审核状态"></el-table-column>
                    <el-table-column label="操作">
                        <template class="template" v-slot="scope">
                            <el-button type="text" size="mini" href="javascript:void(0);" @click="deleteSubject(scope)">修改</el-button>
                            <el-button type="text" size="mini" href="javascript:void(0);" @click="deleteSubject(scope)">删除</el-button>
                            <el-button type="text" size="mini" href="javascript:void(0);" @click="deleteSubject(scope)">审核</el-button>
                            <!-- <el-button type="primary" size="mini" href="javascript:void(0);" @click="deleteSubject(scope)">审核</el-button>
                            <el-button type="danger" size="mini" href="javascript:void(0);" @click="deleteSubject(scope)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    v-show="Number(listTotal) > 0"
                    @current-change="changeCurrent"
                    :total="Number(listTotal)">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {getSubjectList} from '@/api/exam'
export default {
    name: "highScorePaper",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let router = useRouter();
        
        let params = reactive({
            firstMenu: '',
            secondMenu: '',
            type: ''
        })
        let typeList      = reactive(['高考', '模考']) 
        let loading       = ref(true);
        let tableData     = ref([])
        let pageTotal     = ref(0)
        let listTotal     = ref(0)
        
        let createHighPaper = (e) => {
            router.push('/examination/highScorePaper/new')
        }
        getSubjectList().then(res => {
            loading.value = false
            console.log('getSubjectList', res)
            let {pages, data, total} = res
            tableData.value = data
            pageTotal.value = pages
            listTotal.value = total
        })

        return {
            name,
            tableData,
            loading,
            pageTotal,
            listTotal,
            createHighPaper,
            params,
            typeList
        };
    },
    methods: {
        changeCurrent(page){
            console.log('changeCurrent', page)
            this.getSubjectData(page)
        },
        changeValue(e) {
            console.log('changevalue', this.params) 
        },
        changeSelector(e) {
            console.log(e)
            this.params.type = e;
            console.log('changeSelector', this.params)
        },
        getSubjectData(page, size) {
            this.loading = true;
            getSubjectList().then(res => {
                this.loading = false
                console.log('getSubjectList', res)
                let {pages, records, total} = res.data
                this.tableData = records
                this.pageTotal = pages
                this.listTotal = total
            })
        },
        // 删除科目
        deleteSubject(e) {
            console.log(e)
            this.$confirm('确定要删除历年考题?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
};
</script>

<style scoped>
.paper-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.paper-container .el-row {
    margin: 20px 0;
}

.paper-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.paper-container .el-table{
    text-align: center;
}
.paper-container .el-table .el-link{
    margin: 0 5px;
}
.paper-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.paper-condition .el-col{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.paper-condition .el-col .el-input{
    width: 200px !important;
}
.paper-condition .el-col .el-date-editor.el-input{
    width: 200px;
}

.template{
    display: inline-block;
}
</style>
