<template>
    <div class="logs-container">
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="title">操作日志</div>
                <div class="logs-condition">
                    <el-row>
                        <el-col :span="6" :offset="4">
                            操作人：
                            <el-input v-model="params.username" @input="changeValue" placeholder="请输入内容" ></el-input>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            操作模块：
                            <el-select v-model="params.module" clearable
                                name="module" @change="changeSelector($event, name)" placeholder="请选择">
                                <el-option
                                    v-for="(module, index) in moduleList"
                                    :key="index"
                                    :label="module"
                                    :value="module">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" :offset="4">
                            操作时间：
                            <el-date-picker
                                v-model="params.createTime"
                                type="date"
                                format="YYYY 年 MM 月 DD 日"
                                value-format="YYYY-MM-DD"
                                @change="changeValue"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            操作类型：
                            <el-select v-model="params.type" clearable
                                name="type" @change="changeSelector($event)" placeholder="请选择">
                                <el-option
                                    v-for="(type, index) in typeList"
                                    :key="index"
                                    :label="type"
                                    :value="type">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column prop="createTime" label="操作时间"></el-table-column>
                    <el-table-column prop="username" label="操作账号"></el-table-column>
                    <el-table-column prop="module" label="操作模块"></el-table-column>
                    <el-table-column prop="type" label="操作类型"></el-table-column>
                    <el-table-column prop="ip" label="操作人IP"></el-table-column>
                    <el-table-column prop="content" label="操作内容">
                        <el-link type="primary">查看</el-link>
                        <el-link type="success">编辑</el-link>
                        <el-link type="danger">删除</el-link>
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
import {getModuleList, getTypeList, getLogs} from '../../api/logs'
export default {
    name: "logs",
    setup() {
        const name   = localStorage.getItem("ms_username");
        const params = reactive({
                username: '',
                module: '',
                createTime: '',
                type: ''
            });
        const loading       = ref(true);
        const moduleList    = ref([])
        const typeList      = ref([])
        const tableData     = ref([])
        const pageTotal     = ref(0)
        const listTotal     = ref(0)
        getModuleList().then(res => {
            console.log('getModuleList', res)
            let {code, data, msg} = res;
            moduleList.value = data
        })
        getTypeList().then(res => {
            console.log('typeList', res)
            let {code, data, msg} = res;
            typeList.value = data
        })

        getLogs({
            createTime: params.createTime,
            current: 1,
            module: params.module,
            size: 10,
            type: params.type,
            username: params.username
        }).then(res => {
            loading.value = false
            console.log('getLogs', res)
            let {pages, records, total} = res.data
            tableData.value = records
            pageTotal.value = pages
            listTotal.value = total
        })
        return {
            name,
            params,
            moduleList,
            typeList,
            tableData,
            loading,
            pageTotal,
            listTotal
        };
    },
    methods: {
        changeValue() {
            console.log('changeValue', this.params)
            this.getLogsData()
        },
        changeSelector(e){
            console.log('changeSelector', e, this.params)
            this.getLogsData()
        },
        changeCurrent(page){
            console.log('changeCurrent', page)
            this.getLogsData(page)
        },
        getLogsData(page, size) {
            this.loading = true;
            getLogs({
                ...this.params,
                current: page || 1,
                size: size || 10
            }).then(res => {
                this.loading = false
                console.log('getLogs', res)
                let {pages, records, total} = res.data
                this.tableData = records
                this.pageTotal = pages
                this.listTotal = total
            })
        }
    }
};
</script>

<style scoped>
.logs-container{
    padding: 20px;
    box-sizing: border-box;
    background: #FFFFFF;
}

.logs-container .el-row {
    margin-bottom: 20px;
}

.logs-container .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.logs-container .el-table{
    text-align: center;
}
.logs-container .el-table .el-link{
    margin: 0 5px;
}
.logs-container .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.logs-condition .el-col{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logs-condition .el-col .el-input{
    width: 200px !important;
}
.logs-condition .el-col .el-date-editor.el-input{
    width: 200px;
}
</style>
