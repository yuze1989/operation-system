<template>
    <div class="side-container">
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="create-title">新增侧边栏菜单配置</div>
                <div class="create-content">
                    <div class="content-item">
                        考试类型：
                        <el-select v-model="selectType" placeholder="请选择">
                            <el-option
                                v-for="item in typeLists"
                                :key="item.type"
                                :label="item.value"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-for="(item, index) in createSideMenu" :key="index" class="content-item">
                        <span class="tit">一级菜单</span>
                        <input type="text" placeholder="请输入一级菜单名称" v-model="item.name">
                        <el-button size="mini" @click="removeMenu(index)" :data-index="index" v-if="index !== 0">移除</el-button>
                        <el-button size="mini" @click="addSecondMenu" :data-index="index">添加二级菜单</el-button>
                        <div class="children-content" v-if="item.levelTwo.length">
                            <div class="sub-item" v-for="(child, i) in item.levelTwo" :key="i">
                                <span class="c-tit">二级菜单</span>
                                <input type="text" placeholder="请输入二级菜单名称" v-model="child.name">
                                <el-button size="mini" @click="removeMenu(index, i, 'second')" :data-index="i">移除</el-button>
                                <el-button size="mini" @click="addSecondMenu" :data-index="index">添加</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="content-new">
                        <el-button type="primary" size="mini" @click="addFirstMenu">添加一级菜单</el-button>
                    </div>
                    <div class="content-save">
                        <el-button type="primary" @click="saveMenus">保存</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { createMenu, createBatchMenu, menuDetail } from '@/api/exam'
export default {
    name: "newSideConfigure",
    setup() {
        let createSideMenu = ref([{name: '', levelTwo: []}])
        let router         = useRouter();
        let selectType     = ref('')
        let typeLists      = ref([
            { type: 0, value: '模考'},
            { type: 1, value: '高考'},
            { type: 2, value: 'Top美考'}
        ])
        
        return {
            router,
            createSideMenu,
            typeLists,
            selectType
        }
    },
    methods: {
        addFirstMenu() {
            this.createSideMenu.push({name: '', levelTwo: []})
        },
        addSecondMenu(e) {
            let { index } = e.currentTarget.dataset,
                _data     = this.createSideMenu;
            console.log(e, index, _data[index])
            _data[index]['levelTwo']['push']({name: ''})
            this.createSideMenu.value = _data
        },
        removeMenu(index, i, type) {
            console.log(index, i, type)
            if(type) {
                // 删除二级菜单
                let { levelTwo } = this.createSideMenu[index]
                console.log('object', levelTwo)
                levelTwo.splice(i, 1)
                this.createSideMenu[index]['levelTwo'] = levelTwo
            } else {
                // 删除一级菜单
                this.createSideMenu.splice(index, 1)
            }
        },
        // 保存菜单
        saveMenus() {
            console.log(this.createSideMenu, this.selectType)
            this.createSideMenu.forEach((menu, index, array) => array[index]['type'] = this.selectType )
            let params = {
                levelOne: this.createSideMenu
            }
            console.log(params)
            createBatchMenu(params).then(res => {
                console.log(res)
                if(res.code === 200) {
                    this.router.push('/examination/sideConfigure')
                    this.$message({ type: 'success', message: '保存成功!' })
                }
            })
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
    margin-bottom: 20px;
}

.side-container .create-title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
}

.side-container .create-content {
    text-align: center;
}
.side-container .create-content .content-item{
    /* display: flex; */
    /* justify-content: center; */
    /* align-content: center; */
    margin: 20px auto;
    width: 600px;
    text-align: left;
}
.side-container .create-content .content-item .txt{
    display: inline-block;
}
.side-container .create-content .content-item input{
    display: inline-block;
    margin: 0 20px;
    padding: 0 10px;
    height: 30px;
    /* outline: none; */
    border: 1px solid #EEEEEE;
    border-radius: 5px;
}
.side-container .create-content .content-item el-button{

}
.side-container .create-content .content-new{
    margin: 20px auto;
    width: 600px;
    text-align: left;
}
.create-content .children-content{
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #eeeeee;
}
.create-content .children-content .sub-item{
    margin-bottom: 20px;
}
.create-content .children-content .sub-item:last-of-type{
    margin-bottom: 0;
}
</style>
