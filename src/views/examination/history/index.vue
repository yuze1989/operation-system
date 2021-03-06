<template>
    <div class="history-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="title">历年考题信息</div>
                <div class="history-condition">
                    <el-row>
                        <el-col :span="5" :offset="6">
                            考试类型：
                            <el-select v-model="params.type" clearable
                                name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                <el-option
                                    v-for="(item, index) in examType"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.type">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            机构名称：
                            <el-input v-model="params.schoolName" data-name="secondMenu" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5" :offset="6">
                            考题年份：
                            <el-date-picker
                                v-model="params.year"
                                type="year"
                                value-format="YYYY"
                                placeholder="选择考题年份">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            主办方归属：
                            <el-input v-model="params.firstMenuName" data-name="secondMenu" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5" :offset="6">
                            审核状态：
                            <el-select v-model="params.auditStatus" clearable
                                name="type" @change="changeSelector($event)" placeholder="请选择状态">
                                <el-option
                                    v-for="(item, index) in statusData"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.type">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-button type="primary" @click="searchExam">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-row :gutter="20">
                    <el-col :span="3"><el-button type="primary" @click="batchAuditStatus">批量审核</el-button></el-col>
                    <el-col :span="3"><el-button type="primary" @click="createHistory">新增历年考题</el-button></el-col>
                </el-row>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    border
                    stripe
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                    <el-table-column prop="schoolId" width="80" label="机构ID"></el-table-column>
                    <el-table-column prop="schoolName" label="机构名称"></el-table-column>
                    <el-table-column prop="firstMenuName" label="主办方归属"></el-table-column>
                    <el-table-column prop="secondMenuName" label="主办方名称"></el-table-column>
                    <el-table-column prop="year" width="100" label="考题年份"></el-table-column>
                    <el-table-column prop="type" width="100" label="考试类型">
                        <template class="template" v-slot="scope">
                            {{examType[scope.row.type]['name']}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="考试名称"></el-table-column>
                    <el-table-column prop="auditStatus" width="100" label="审核状态">
                        <template class="template" v-slot="scope">
                            <!-- 审核状态 0-未审核 1-通过 2-不通过 -->
                            {{statusData[scope.row.auditStatus]['name']}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template class="template" v-slot="scope">
                            <el-button type="text" size="mini" @click="editExam(scope)">修改</el-button>
                            <el-button type="text" size="mini" @click="deleteExam(scope)">删除</el-button>
                            <el-button type="text" size="mini" @click="reviewExam(scope)">审核</el-button>
                            <el-button type="text" size="mini" @click="createPaper(scope)">新增高分试卷</el-button>
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
import {getHistoryList, deleteHistoryExam} from '@/api/exam'
export default {
    name: "newHistory",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let router = useRouter();
        let statusData = ref([{type:0, name: '未审核'},{type: 1,name: '通过'}, {type: 2, name: '不通过'}]) ;  // 审核状态 0-未审核 1-通过 2-不通过
        let examType   = ref([{type: '0', name: '模考'}, {type: '1', name: '高考'}]); // 考试类型 0-模考 1-高考
        let params = reactive({
            schoolName: '',           // 机构名称
            type: '',           // 考试类型
            year: '',           // 考题年份
            firstMenuName: '',  // 主办方归属
            auditStatus: ''          // 审核状态
        })
        let loading       = ref(true);
        let tableData     = ref([])
        let pageTotal     = ref(0)
        let listTotal     = ref(0)
        let multipleSelection  = ref([]) // 保存批量选择的数据
        let createHistory = (e) => {
            router.push('/examination/history/new')
        }
        getHistoryList({
            current: 1,
            size: 10
        }).then(res => {
            loading.value = false
            console.log('getHistoryList', res)
            let {pages, records, total} = res.data
            tableData.value = records
            pageTotal.value = pages
            listTotal.value = total
        })

        return {
            name,
            router,
            tableData,
            loading,
            pageTotal,
            listTotal,
            createHistory,
            params,
            examType,
            statusData,
            multipleSelection
        };
    },
    methods: {
        // 查询
        searchExam() {
            console.log(this.params)
            this.getExamData()
        },
        changeCurrent(page){
            console.log('changeCurrent', page)
            this.getExamData(page)
        },
        changeValue(e) {
            console.log('changevalue', this.params) 
        },
        changeSelector(e) {
            console.log(e)
            // this.params.type = e;
            // console.log('changeSelector', this.params)
        },
        handleSelectionChange(value) {
            console.log(value)
            this.multipleSelection = value
        },
        // 去批量审核
        batchAuditStatus() {
            console.log('this.multipleSelection', this.multipleSelection)
            let query = []
            this.multipleSelection.forEach(item => {
                query.push(item.id)
            })
            console.log(query, query.join(','))
            query.length && this.$router.push({path: '/examination/history/examine', query: { id: query.join(',') }})
        },
        getExamData(page) {
            this.loading = true;
            getHistoryList({
                ...this.params,
                current: page,
                size: 10
            }).then(res => {
                this.loading = false
                console.log('getHistoryList', res)
                let {pages, records, total} = res.data
                this.tableData = records
                this.pageTotal = pages
                this.listTotal = total
            })
        },
        // 删除
        deleteExam(scope) {
            let {$index, row} = scope
            console.log($index, row)
            this.$confirm('确定要删除历年考题?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                deleteHistoryExam({id: row.id}).then(res => {
                    if(res?.code === 200) {
                        this.$message({ type: 'success', message: '删除成功!' });
                        this.tableData.splice($index, 1);
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 审核
        reviewExam(scope) {
            let {$index, row} = scope
            this.router.push(`/examination/history/examine?id=${row.id}`)
        },
        // 修改
        editExam(scope) {
            let {$index, row} = scope
            this.router.push(`/examination/history/detail?id=${row.id}`)
        },
        // 去新增高分试卷
        createPaper(scope) {
            let {$index, row} = scope
            this.router.push(`/examination/highScorePaper/new?id=${row.id}`)
        }
    }
};
</script>

<style scoped>
.history-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.history-container .el-row {
    margin: 20px 0;
}

.history-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.history-container .el-table{
    text-align: center;
}
.history-container .el-table .el-link{
    margin: 0 5px;
}
.history-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.history-condition .el-col{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.history-condition .el-col .el-input{
    width: 200px !important;
}
.history-condition .el-col .el-date-editor.el-input{
    width: 200px;
}

.template{
    display: inline-block;
}
</style>
