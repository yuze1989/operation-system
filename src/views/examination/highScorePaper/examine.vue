<template>
    <div class="examine-container">
        <el-row :gutter="20">
            <el-col :span="8" :offset="6">
                <el-row class="tit-box">
                    <el-col>高分试卷审核</el-col>
                </el-row>
                <el-row class="txt-box" :gutter="20" type="flex" align="middle">
                    <el-col :span="12" class="tit">审核状态</el-col>
                    <el-col :span="12">
                        <el-select v-model="status" placeholder="请选择">
                            <el-option
                                v-for="item in statusList"
                                :key="item.type"
                                :label="item.value"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="txt-box" :gutter="20">
                    <el-col :span="12" class="tit">备注</el-col>
                    <el-col :span="12">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 4}"
                            placeholder="请输入内容"
                            v-model="remarks">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row class="txt-box" type="flex" justify="center">
                    <el-button type="primary" @click="saveStatus">保存</el-button>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { updateAuditStatus } from '@/api/exam'

export default {
    name: 'examineHighScorePaper',
    setup() {
        let router = new useRouter();
        let statusList = ref([
            // // 审核状态 0-未审核 1-通过 2-不通过
            {type: 1, value: '通过'},
            {type: 2, value: '未通过'}
        ])
        let disabled = ref(true)
        let params = reactive({
            id: '',
            status: '',
            remarks: ''
        })

        onMounted(() => {
            let {query} = router.currentRoute.value
            params.id = query.id
        })

        return {
            disabled,
            statusList,
            router,
            ...toRefs(params)
        }
    },
    methods: {
        saveStatus(){
            console.log(this)
            updateAuditStatus({
                id: this.id,
                auditStatus: this.status,
                // remarks: this.remarks
            }).then(res => {
                if(res.code === 200) {
                    this.$message({ type: 'success', message: '添加成功!' });
                    this.router.push('/examination/history/');
                }
            })
        },
        changeButtonStatus(){
            let {id, status, remarks} = this
            console.log(id, status, remarks)
        }
    }
}
</script>

<style scope>
.examine-container .tit-box{
    font-size: 20px;
    line-height: 30px;
    text-align: center;
}

.examine-container .tit{
    text-align: right;
}
.examine-container .txt-box{
    margin: 20px 0;
}
</style>