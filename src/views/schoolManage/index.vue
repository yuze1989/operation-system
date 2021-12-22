<template>
    <div class="school-container">
        <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <div class="title">高校信息</div>
                <div class="school-condition">
                    <el-row>
                        <el-col :span="6" :offset="6">
                            高校名称：
                            <el-input v-model="params.name" @input="changeValue" clearable placeholder="请输入内容" ></el-input>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            高校分类：
                            <el-select v-model="params.classifyId" clearable
                                @change="changeSelector($event, 'type')" placeholder="请选择">
                                <el-option
                                    v-for="(item, index) in schoolType"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="0">
                        <el-col :span="10" :offset="6">
                            高校地址：
                            <el-select v-model="params.province" clearable
                                @change="changeSelector($event, 'province')" placeholder="请选择省">
                                <el-option
                                    v-for="(item, index) in provinceList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="params.city" clearable
                                @change="changeSelector($event)" placeholder="请选择市区">
                                <el-option
                                    v-for="(item, index) in cityList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-button type="primary" @click="createSchool">新增高校</el-button>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column prop="id" label="高校编号"></el-table-column>
                    <el-table-column prop="name" label="高校名称"></el-table-column>
                    <el-table-column prop="classify" label="高校分类"></el-table-column>
                    <el-table-column prop="address" label="所属省份"></el-table-column>
                    <el-table-column prop="ip" label="所属地市"></el-table-column>
                    <el-table-column prop="ranking" label="app展示排序位置"></el-table-column>
                    <el-table-column label="操作">
                        <template v-slot="scope">
                            <el-button type="text" size="mini" @click="editHandle(scope)">修改</el-button >
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
import { reactive, ref, onMounted } from "vue";
import {getProvince, getCity, getSchoolType, schoolList, deleteSchool, areaList } from '../../api/school.js'
import { useRouter } from 'vue-router';
export default {
    name: "logs",
    setup() {
        const name   = localStorage.getItem("ms_username");
        const router = useRouter();
        const params = reactive({
                province: '',
                city: '',
                classifyId: '',
                name: '',
                pid: ''
            });
        const loading       = ref(true);
        const provinceList    = ref([])
        const cityList    = ref([])
        const schoolType      = ref([])
        const tableData     = ref([])
        const pageTotal     = ref(0)
        const listTotal     = ref(0)
        // getProvince().then(res => {
        //     console.log('provinceList', res)
        //     let {code, data, msg} = res;
        //     provinceList.value = data
        // })
        onMounted(() => {
            getAreaList()
        })
        // 新省市区列表
        let getAreaList = (pid, type) => {
            // let data = type ? {id: pid || 0} : {pid: pid || 0}
            areaList({pid: pid || 0}).then(res => {
                console.log('areaList', res)
                let {code, data, msg} = res;
                if(type) {
                    cityList.value = data
                } else {
                    provinceList.value = data
                }
            })
        }
        // 高校分类
        getSchoolType().then(res => {
            console.log('getSchoolType', res)
            let {code, data, msg} = res;
            schoolType.value = data;
        })
        // 高校列表
        schoolList({
            ...params
        }).then(res => {
            loading.value = false
            console.log('getLogs', res)
            let {pages, records, total} = res.data
            tableData.value = records
            pageTotal.value = pages
            listTotal.value = total
        })
        // 跳转新增高校
        let createSchool = () => {
            router.push('/schoolManage/new')
        }
        return {
            name,
            router,
            params,
            provinceList,
            cityList,
            schoolType,
            tableData,
            loading,
            createSchool,
            getAreaList,
            pageTotal,
            listTotal
        };
    },
    methods: {
        changeValue() {
            console.log('changeValue', this.params)
            // this.getSchoolList()
        },
        search(){
            this.getSchoolList();
        },
        changeSelector(id, name){
            console.log('changeSelector', id, name)
            // if(name === 'province') this.getCityList()
            if(name === 'province') this.getAreaList(id, name)

        },
        changeCurrent(page){
            console.log('changeCurrent', page)
            this.getSchoolList(page)
        },
        getSchoolList(page, size) {
            this.loading = true;
            schoolList({
                ...this.params,
                current: page || 1,
                size: size || 10
            }).then(res => {
                this.loading = false
                console.log('getSchoolList', res)
                let {pages, records, total} = res.data
                this.tableData = records
                this.pageTotal = pages
                this.listTotal = total
            })
        },
        // 市区列表
        // getCityList() {
        //     getCity(this.params.province).then(res => {
        //         console.log('getCityList', res)
        //         let {code, data, msg} = res;
        //         this.cityList = data
        //     })
        // },
        // 删除
        deleteHandle(scope) {
            let {$index, row} = scope
            console.log($index, row)
            this.$confirm('确定要删除该高校?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                deleteSchool(row.id).then(res => {
                    if(res?.code === 200) {
                        this.$message({ type: 'success', message: '删除成功!' });
                        this.tableData.splice($index, 1);
                    }
                })
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
        },
        editHandle(scope) {
            let {$index, row} = scope
            console.log(scope)
            this.router.push(`/schoolManage/detail?id=${row.id}`)
        }
    }
};
</script>

<style scoped>
.school-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.school-container .el-row {
    margin-bottom: 20px;
}

.school-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.school-container .el-table{
    text-align: center;
}
.school-container .el-table .el-link{
    margin: 0 5px;
}
.school-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.school-condition .el-col{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.school-condition .el-col .el-select{
    width: 200px;
}
.school-condition .el-col .el-input{
    width: 200px !important;
}
.school-condition .el-col .el-date-editor.el-input{
    width: 200px;
}
</style>
