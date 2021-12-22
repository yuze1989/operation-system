<template>
    <div class="paper-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="title">高分试卷信息</div>
                <div class="paper-condition">
                    <el-row :gutter="10">
                        <el-col :span="5" :offset="2">
                            考试类型：
                            <el-select v-model="params.type" clearable placeholder="请选择考试类型">
                                <el-option
                                    v-for="(item, index) in examType"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.type">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            机构名称：
                            <el-input type="text" v-model="params.schoolName" placeholder="机构名称"></el-input>
                        </el-col>
                        <el-col :span="5">
                            主办方归属：
                            <el-input v-model="params.firstMenuName" data-name="secondMenu" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col  :span="5" :offset="7">
                            考题年份：
                            <el-date-picker
                                v-model="params.year"
                                type="year"
                                value-format="YYYY"
                                placeholder="选择年">
                            </el-date-picker>
                        </el-col>
                        <el-col  :span="5">
                            考试科目：
                            <el-select v-model="params.subjectId" clearable
                                @change="changeSelector($event)" placeholder="请选择考试科目">
                                <el-option
                                    v-for="(item, index) in subjectList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="5" :offset="7">
                            试卷价格：
                            <el-input class="price-input" type="text" v-model="params.priceMin" placeholder="金额"></el-input>
                            至
                            <el-input class="price-input" v-model="params.priceMax" @input="changeValue" placeholder="金额" ></el-input>
                        </el-col>
                        <el-col :span="5">
                            考试题目：
                            <el-input v-model="params.title" data-name="secondMenu" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-button type="primary" @click="searchPaper">查询</el-button>
                    </el-row>
                </div>
                <div>
                    <el-button type="primary" @click="batchAuditStatus">批量审核</el-button>
                    <el-button type="primary" @click="batchAuditPrice">批量修改价格</el-button>
                    <el-button type="primary" @click="bathAuditCopyright">批量修改版权信息</el-button>
                    <el-button type="primary" @click="bathDelete">批量删除</el-button>
                </div>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    border
                    stripe
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <!-- 
                        auditStatus	integer($int32) 审核状态 0-未审核 1-通过 2-不通过
                            createTime	string($date-time) 创建时间
                            favoriteCount	integer($int64) 收藏数
                            firstMenuName	string 主办方归属
                            hdImg	string 高清图
                            id	integer($int64)
                            price	string 价格
                            schoolId	integer($int32) 机构id
                            schoolName	string 机构名称
                            secondMenuName	string 主办方名称
                            subjectName	string 科目名称
                            title	string 考试题目
                            type	integer($int32) 考试类型 0-模考 1-高考 2-top美考 
                            viewCount	integer($int64) 浏览量
                     -->
                    <el-table-column type="selection" label="序号"></el-table-column>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="schoolId" label="机构ID"></el-table-column>
                    <el-table-column prop="schoolName" label="机构名称"></el-table-column>
                    <el-table-column prop="type" label="考试类型">
                        <template v-slot="scope">
                            {{examType[scope.row.type]['name']}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="firstMenuName" label="主办方归属"></el-table-column>
                    <el-table-column prop="secondMenuName" label="主办方归属"></el-table-column>
                    <el-table-column prop="title" label="考题科目"></el-table-column>
                    <el-table-column prop="subjectName" label="考题科目"></el-table-column>
                    <el-table-column prop="price" label="试卷价格"></el-table-column>
                    <el-table-column prop="hdImg" label="试卷图片">
                        <template v-slot="scope">
                            <el-image style="width: 100px; height: 100px" :src="scope.row.hdImg" fit="fill"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="favoriteCount" label="收藏次数"></el-table-column>
                    <el-table-column prop="viewCount" label="浏览次数"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column prop="name" label="审核状态">
                        <template v-slot="scope">
                            {{auditStatus[scope.row.auditStatus]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template class="template" v-slot="scope">
                            <el-button type="text" size="mini" @click="editHandle(scope)">修改</el-button>
                            <el-button type="text" size="mini" @click="deletePaperHandle(scope)">删除</el-button>
                            <el-button type="text" size="mini" @click="auditHandle(scope)">审核</el-button>
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
import { onActivated, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { paperList, getSubjectSelectors, deletePaper, updateAuditPricePaper, updateAuditCopyrightPaper, updateDelete} from '@/api/exam'
export default {
    name: "highScorePaper",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let router = useRouter();
        
        let params = reactive({
            auditStatus: '',
            current: 1,
            size: 10,
            firstMenuName: '',
            priceMax: '',
            priceMin: '',
            schoolName: '',
            subjectId: '',
            title: '',
            year: '',
            type: ''  //20211222新添加考试类型
        })

        let examType = ref([{type: 0, name: '模考'}, {type: 1, name: '高考'}]) // 考试类型 0-模考 1-高考 2-top美考 
        let auditStatus = ref(['未审核', '通过', '不通过']) // auditStatus	integer($int32) 审核状态 0-未审核 1-通过 2-不通过
        let subjectList   = ref([])
        let loading       = ref(true);
        let tableData     = ref([])
        let pageTotal     = ref(0)
        let listTotal     = ref(0)
        let multipleSelection = ref([])

        let createHighPaper = (pid) => {
            router.push({path: '/examination/highScorePaper/new', query: {pid}})
        }
        // 考试科目
        getSubjectSelectors().then(res => {
            console.log(res)
            let {code, msg} = res
            if(code === 200) subjectList.value = res.data
        })
        onActivated(() => {
            getPaperList()
        })
        let getPaperList = () => {
            paperList(params).then(res => {
                loading.value = false
                console.log('getSubjectList', res)
                let {pages, records, total} = res.data
                tableData.value = records
                pageTotal.value = pages
                listTotal.value = total
            })
        }
        return {
            name,
            router,
            tableData,
            loading,
            pageTotal,
            listTotal,
            createHighPaper,
            params,
            subjectList,
            examType,
            auditStatus,
            multipleSelection,
            getPaperList
        };
    },
    methods: {
        changeCurrent(page){
            console.log('changeCurrent', page)
            this.params.current = page
            console.log(this.params)
            this.getPaperList()
        },
        changeValue(e) {
            console.log('changevalue', this.params) 
        },
        changeSelector(e) {
            console.log(e)
            console.log('changeSelector', this.params)
        },
        // getPaperList(page) {
        //     this.loading = true;
        //     paperList({
        //         ...this.params,
        //         current: page || 1
        //     }).then(res => {
        //         this.loading = false
        //         console.log('getSubjectList', res)
        //         let {pages, records, total} = res.data
        //         this.tableData = records
        //         this.pageTotal = pages
        //         this.listTotal = total
        //     })
        // },
        // 查询
        searchPaper(){
            this.getPaperList()
        },
        // 删除科目
        deletePaperHandle(scope) {
            let {$index, row} = scope
            console.log($index, row)
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                deletePaper(row.id).then(res => {
                    if(res?.code === 200) {
                        this.$message({ type: 'success', message: '删除成功!' });
                        this.tableData.splice($index, 1);
                    }
                })
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
        },
        // 审核
        auditHandle(scope) {
            let {$index, row} = scope
            this.router.push(`/examination/highScorePaper/examine?id=${row.id}`)
        },
        // 去批量审核
        batchAuditStatus() {
            console.log('this.multipleSelection', this.multipleSelection)
            let query = []
            this.multipleSelection.forEach(item => {
                query.push(item.id)
            })
            console.log(query, query.join(','))
            query.length && this.$router.push({path: '/examination/highScorePaper/examine', query: { id: query.join(',') }})
        },
        // 批量操作
        handleSelectionChange(value) {
            console.log(value)
            this.multipleSelection = value
        },
        // 批量修改价格
        batchAuditPrice() {
            console.log('this.multipleSelection', this.multipleSelection)
            let query = []
            this.multipleSelection.forEach(item => {
                query.push(Number(item.id))
            })
            query.length && this.$prompt('请输入最新的价格', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/,
                inputErrorMessage: '金额格式不正确'
                }).then(({ value }) => {
                    updateAuditPricePaper({
                        id: query, 
                        price: value
                    }).then(res => {
                        if( res.code === 200) {
                            this.$message({ type: 'success', message: '价格修改成功'});
                            this.getPaperList()
                        }
                    })
                }).catch(() => {
                this.$message({ type: 'info', message: '取消修改' });       
            });
        },
        // 批量修改版权信息
        bathAuditCopyright() {
            console.log('this.multipleSelection', this.multipleSelection)
            let query = []
            this.multipleSelection.forEach(item => {
                query.push(Number(item.id))
            })
            query.length && this.$prompt('请输入最新的版权信息', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    updateAuditCopyrightPaper({
                        id: query, 
                        price: value
                    }).then(res => {
                        if( res.code === 200) {
                            this.$message({ type: 'success', message: '价格修改成功'});
                            this.getPaperList()
                        }
                    })
                }).catch(() => {
                    this.$message({ type: 'info', message: '取消修改' });       
            });
        },
        // 批量删除
        bathDelete() {
            console.log('this.multipleSelection', this.multipleSelection)
            let query = []
            this.multipleSelection.forEach(item => {
                query.push(Number(item.id))
            })
            console.log(query)
            query.length && this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                updateDelete({id: query}).then(res => {
                    if(res?.code === 200) {
                        this.$message({ type: 'success', message: '删除成功!' });
                        this.getPaperList()
                    }
                })
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
        },
        // 编辑
        editHandle(scope) {
            let {$index, row} = scope
            this.router.push({path: '/examination/highScorePaper/detail', query: {pid: row.id}})
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
.paper-condition .el-col .el-input,
.paper-condition .el-col .el-select,
.paper-condition .el-col .el-date-editor
{
    width: 200px;
}
.paper-condition .el-col .price-input{
    width: 100px;
}
.paper-condition .el-col .el-date-editor.el-input{
    width: 200px;
}

.template{
    display: inline-block;
}
</style>
