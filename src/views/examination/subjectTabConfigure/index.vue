<template>
    <div class="subject-container">
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <div class="title">科目信息</div>
                <el-button type="primary" @click="createSubject">新增科目</el-button>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column type="index" width="60" label="序号"></el-table-column>
                    <el-table-column prop="name" label="科目名称"></el-table-column>
                    <el-table-column prop="description" label="科目内容"></el-table-column>
                    <el-table-column label="操作内容">
                        <template class="template" v-slot="scope">
                            <el-link type="success" href="javascript:void(0);" @click='onEditSubject(scope)'>修改</el-link>
                            <el-link type="danger" href="javascript:void(0);" @click="onDeleteSubject(scope)">删除</el-link>
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
import { reactive, ref, onMounted, onActivated } from "vue";
import { useRouter } from "vue-router";
import {getSubjectList, deleteSubject, editSubject} from '@/api/exam'
export default {
    name: "subjectTabConfigure",
    setup() {
        const name   = localStorage.getItem("ms_username");
        const router = useRouter();
        const loading       = ref(true);
        const tableData     = ref([])
        const pageTotal     = ref(0)
        const listTotal     = ref(0)
        let createSubject = (e) => {
            router.push('/examination/subjectTabConfigure/new')
        }
        const current = ref(1)
        onMounted(() => {
            console.log('onMounted')
        })
        onActivated(() => {
            console.log('onActivated')
            getList(current.value)
        })
        let getList = (page) => {
            getSubjectList({
                current: page
            }).then(res => {
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
            tableData,
            loading,
            pageTotal,
            listTotal,
            createSubject,
            getList,
            current
        };
    },
    methods: {
        changeCurrent(page){
            console.log('changeCurrent', page)
            this.getSubjectData(page)
        },
        getSubjectData(page) {
            this.loading = true;
            getSubjectList({
                current: page
            }).then(res => {
                this.loading = false
                console.log('getSubjectList', res)
                let {pages, records, total} = res.data
                this.tableData = records
                this.pageTotal = pages
                this.listTotal = total
            })
        },
        toDetail(id) {
            console.log(id)
        },
        // 删除科目
        onDeleteSubject(scope) {
            console.log(scope)
            let {$index, row} = scope;
            this.$confirm('确定要删除科目吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                deleteSubject({id: row.id}).then(res => {
                    console.log('deleteSubject', res )
                    let {code, data, msg} = res
                    if(code === 200) {
                        this.$message({type: 'success', message: '删除成功!'});
                        this.tableData.splice($index, 1)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 编辑科目
        onEditSubject(scope) {
            console.log(scope)
            let {$index, row} = scope
            this.$prompt('请输入新科目名称', '编辑', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    // inputPattern: /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]/,
                    // inputErrorMessage: '输入不正确'
                }).then(({ value }) => {
                    editSubject({
                        id: row.id,
                        name: value
                    }).then(res => {
                        let {code, data, msg} = res;
                        console.log(res)
                        if(code === 200) this.tableData.splice($index, 1, data)
                        this.$message({ type: 'success', message: '修改成功'});
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
            });
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

.subject-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.subject-container .el-table{
    text-align: center;
}
.subject-container .el-table .el-link{
    margin: 0 5px;
}
.subject-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.template{
    display: inline-block;
}
</style>
