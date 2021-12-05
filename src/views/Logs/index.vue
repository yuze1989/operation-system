<template>
    <div class="logs-container">
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="title">操作日志</div>
                <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%">
                    <el-table-column prop="date" label="操作时间"></el-table-column>
                    <el-table-column prop="name" label="操作账号"></el-table-column>
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
                    :total="1000">
                </el-pagination>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from "vue-schart";
import { reactive } from "vue";
export default {
    name: "logs",
    components: { Schart },
    setup() {
        const tableData = reactive([
            {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                module: '考试',
                type: 1,
                ip: '192.168.0.1',
                address: '上海市普陀区金沙江路 1518 弄'
            }
        ])
        return {
            tableData
        };
    },
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
</style>
