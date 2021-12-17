<template>
    <div class="side-container">
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <div class="title">历年考题菜单配置</div>
                <div class="side-condition">
                    <el-row>
                        <el-col :span="5" :offset="4">
                            一级菜单：
                            <el-input v-model="params.levelOneName" clearable data-name="firstMenu" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            二级菜单：
                            <el-input v-model="params.levelTwoName" clearable data-name="secondMenu" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5" :offset="4">
                            操作类型：
                            <el-select v-model="params.type" clearable
                                name="type" @change="changeSelector($event)" placeholder="请选择考题类型">
                                <el-option
                                    v-for="(item, index) in typeList"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.type">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-button type="primary" @click="onSearch">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-button type="primary" @click="createMenu">新增菜单</el-button>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="levelOneName" label="一级菜单"></el-table-column>
                    <el-table-column prop="levelTwoName" label="二级菜单"></el-table-column>
                    <el-table-column label="考试类型">
                        <template class="template" v-slot="scope">
                            {{typeList[scope.row.type]['value']}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template class="template" v-slot="scope">
                            <el-link type="danger" href="javascript:void(0);" @click="deleteMenu(scope)">删除</el-link>
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
import { getMenuList, deleteMenu } from '@/api/exam'
export default {
    name: "sideConfigure",
    setup() {
        let name   = localStorage.getItem("ms_username");
        let router = useRouter();
        
        let params = reactive({
            levelOneName: '',
            levelTwoName: '',
            type: ''
        })
        let typeList      = reactive([
            { type: 0, value: '模考'},
            { type: 1, value: '高考'},
            { type: 2, value: 'Top美考'}
        ]) 
        let loading       = ref(true);
        let tableData     = ref([])
        let pageTotal     = ref(0)
        let listTotal     = ref(0)
        
        let createMenu = (e) => {
            router.push('/examination/sideConfigure/new')
        }
        
        onActivated(() => {
            console.log('onActivated')
            menuLists(params.type)
        })

        let menuLists = (type) => {
            getMenuList({
                current: 1,
                size: 10,
                levelOneName: '',
                levelTwoName: '',
                type: ''
            }).then(res => {
                loading.value = false
                console.log('getMenuList', res)
                let {pages, records, total} = res.data;
                    // _data                = []
                // records.length && records.forEach((item, index) => {
                //     let { childMenus, ...params } = item;
                //     let _children       = [];
                //     if(childMenus.length) {
                //         childMenus.forEach(itl => {
                //             let { name, ...value} = itl
                //             _children.push({ cName: name, ...value })
                //         })
                //     }
                //     _data.push({...params, childMenus: _children})
                // })
                // tableData.value = _data
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
            createMenu,
            params,
            typeList,
            menuLists
        };
    },
    methods: {
        changeCurrent(page){
            console.log('changeCurrent', page)
            this.getMenusData(page)
        },
        changeValue(e) {
            console.log('changevalue', this.params) 
        },
        changeSelector(e) {
            console.log(e)
            this.params.type = e;
            console.log('changeSelector', this.params)
        },
        // 搜索
        onSearch() {
            console.log(this)
            this.getMenusData(1)
        },
        getMenusData(page, size) {
            this.loading = true;
            getMenuList({
                ...this.params,
                current: page,
                size: size || 10
            }).then(res => {
                this.loading = false
                console.log('getSubjectList', res)
                let {pages, records, total} = res.data
                this.tableData = records
                this.pageTotal = pages
                this.listTotal = total
            })
        },
        // 删除科目
        deleteMenu(scope) {
            console.log(scope)
            let { $index, row } = scope,
                _data           = this.tableData
            this.$confirm('确定要删除菜单吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                deleteMenu({id: row.id}).then(res => {
                    let {code, data, msg} = res;
                    if(code === 200) {
                        _data.splice($index, 1)
                        this.tableData = _data;
                        this.$message({ type: 'success', message: '删除成功!' });
                    }   
                })
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
.side-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.side-container .el-row {
    margin: 20px 0;
}

.side-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.side-container .el-table{
    text-align: center;
}
.side-container .el-table .el-link{
    margin: 0 5px;
}
.side-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.side-condition .el-col{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.side-condition .el-col .el-input,
.side-condition .el-col .el-select{
    width: 200px;
}
.side-condition .el-col .el-date-editor.el-input{
    width: 200px;
}

.template{
    display: inline-block;
}
</style>
