<template>
    <div class="category-container">
        <el-row :gutter="20">
            <el-col :span="16" :offset="2">
                <div class="title">高校菜单配置</div>
                <div class="category-condition">
                    <el-row :gutter="0">
                        <el-col :span="8" :offset="6">
                            高校分类：
                            <el-input type="text" v-model="params.name" placeholder="请输入高校分类"></el-input>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-button type="primary" @click="createSchoolCategory">新增高校分类</el-button>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column type="index" label="序号" width="200"></el-table-column>
                    <el-table-column prop="name" label="高校分类"></el-table-column>
                    <el-table-column label="操作">
                        <template v-slot="scope">
                            <el-button type="text" size="mini" @click="modifyHandle(scope)">修改</el-button >
                            <el-button type="text" size="mini" @click="deleteHandle(scope)">删除</el-button >
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
import { onMounted, reactive, ref } from "vue";
import { schoolCategory, deleteSchoolCategory, modifySchoolCategory } from '../../api/school.js'
import { useRouter } from 'vue-router';
export default {
    name: "logs",
    setup() {
        const name   = localStorage.getItem("ms_username");
        const router = useRouter();
        const params = reactive({
                current: 1,
                size: 10,
                name: ''
            });
        
        const loading       = ref(true);
        const categoryList     = ref([])

        const tableData     = ref([])
        const pageTotal     = ref(0)
        const listTotal     = ref(0)

        onMounted(() => {
            console.log('object')
            schoolCategoryList()
        })
        const schoolCategoryList = (page) => {
            schoolCategory({
                current: page || params.current,
                size: 10,
                name: params.name
            }).then(res => {
                loading.value = false
                console.log('getLogs', res)
                let {pages, records, total} = res.data
                tableData.value = records
                pageTotal.value = pages
                listTotal.value = total
            })
        }

        // 跳转新增高校
        let createSchoolCategory = () => {
            router.push('/schoolManage/createCategory')
        }
        return {
            name,
            router,
            params,
            loading,
            tableData,
            pageTotal,
            listTotal,
            categoryList,
            createSchoolCategory,
            schoolCategoryList
        };
    },
    methods: {
        changeValue() {
            console.log('changeValue', this.params)
        },
        search(){
            this.schoolCategoryList(1);
        },
        changeSelector(e, name){
            console.log('changeSelector', e, name)
            if(name === 'province') this.getCityList()
        },
        changeCurrent(page){
            this.params.current = page
            console.log('changeCurrent', page)
            this.schoolCategoryList(page)
        },
        // 修改
        modifyHandle(scope) {
            let {$index, row} = scope
            this.$prompt('请输入邮箱', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
                }).then(({ value }) => {
                    modifySchoolCategory({
                        id: row.id,
                        name: value,
                        priority: row.priority
                    }).then(res => {
                        let {code} = res
                        if(code === 200) {
                            this.$message({ type: 'success', message: '修改成功' });
                            this.schoolCategoryList()
                        }
                    })
                }).catch(() => {
                this.$message({ type: 'info', message: '取消输入' });       
            });
        },
        
        // 删除
        deleteHandle(scope) {
            let {$index, row} = scope
            console.log($index, row)
            this.$confirm('确定要删除该高校分类?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                deleteSchoolCategory(row.id).then(res => {
                    if(res?.code === 200) {
                        this.$message({ type: 'success', message: '删除成功!' });
                        this.tableData.splice($index, 1);
                    }
                })
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
        }
    }
};
</script>

<style scoped>
.category-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.category-container .el-row {
    margin-bottom: 20px;
}

.category-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.category-container .el-table{
    text-align: center;
}
.category-container .el-table .el-link{
    margin: 0 5px;
}
.category-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.category-condition .el-col{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.category-condition .el-col .el-select{
    width: 200px;
}
.category-condition .el-col .el-input{
    width: 200px !important;
}
.category-condition .el-col .el-date-editor.el-input{
    width: 200px;
}
</style>
