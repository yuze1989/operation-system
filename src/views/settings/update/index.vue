<template>
    <div class="update-container">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="title">版本更新信息</div>
                <el-button type="primary" @click="createVersions">新增版本</el-button>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    border
                    stripe
                    style="width: 100%">
                    <!-- 
                        createTime: "2021-12-03 14:40:43"
                        downloadUrl: "https://www.baidu.com/"
                        id: 2
                        isForce: true
                        type: "ios"
                        updateContent: "更新描述"
                        updateTime: "2021-12-03 14:40:46"
                        versionCode: 1
                        versionName: "1.0"
                     -->
                    <el-table-column prop="versionCode" label="版本号"></el-table-column>
                    <!-- <el-table-column prop="name" label="App类型"></el-table-column> -->
                    <el-table-column prop="type" label="手机系统类型"></el-table-column>
                    <el-table-column prop="updateContent" label="版本说明"></el-table-column>
                    <el-table-column prop="downloadUrl" label="下载地址"></el-table-column>
                    <el-table-column prop="isForce" label="强制更新"></el-table-column>
                    <!-- <el-table-column prop="name" label="发布状态"></el-table-column> -->
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column label="操作内容">
                        <template class="template" v-slot="scope">
                            <el-link type="success" href="javascript:void(0);" @click='toDetail(scope)'>修改</el-link>
                            <el-link type="danger" href="javascript:void(0);" @click="onDeleteVersion(scope)">删除</el-link>
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
import { reactive, ref, onMounted, onActivated, toRefs } from "vue";
import { useRouter } from "vue-router";
import {getUpdateList, deleteVersion} from '@/api/settings'
export default {
    name: "update",
    setup() {
        const name   = localStorage.getItem("ms_username");
        const router = useRouter();
        const loading       = ref(true);
        const tableData     = ref([])
        const pageTotal     = ref(0)
        const listTotal     = ref(0)
        const params        = reactive({
            current: 1,
            size: 10
        })
        let createVersions = (e) => {
            router.push('/settings/update/new')
        }
        onActivated(() => {
            console.log('onActivated')
            getList()
        })
        let getList = () => {
            getUpdateList({
                current: params.current, 
                size: params.size
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
            router,
            tableData,
            loading,
            pageTotal,
            listTotal,
            createVersions,
            getList,
            ...toRefs(params)
        };
    },
    methods: {
        changeCurrent(page){
            console.log('changeCurrent', page)
            this.getVersionsList(page)
        },
        getVersionsList(page) {
            let {current, size} = this
            this.loading = true;
            getUpdateList({
                current: page || current, 
                size: size
            }).then(res => {
                this.loading = false
                console.log('getSubjectList', res)
                let {pages, records, total} = res.data
                this.tableData = records
                this.pageTotal = pages
                this.listTotal = total
            })
        },
        toDetail(scope) {
            let { row } = scope
            console.log(row)
            this.router.push({path: '/settings/update/new', query: {id: row.id}})
        },
        // 删除科目
        onDeleteVersion(scope) {
            console.log(scope)
            let {$index, row} = scope;
            this.$confirm('确定要删除这个版本吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                deleteVersion({id: row.id}).then(res => {
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
                    })
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    });
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
.update-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.update-container .el-row {
    margin-bottom: 20px;
}

.update-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.update-container .el-table{
    text-align: center;
}
.update-container .el-table .el-link{
    margin: 0 5px;
}
.update-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.template{
    display: inline-block;
}
</style>
