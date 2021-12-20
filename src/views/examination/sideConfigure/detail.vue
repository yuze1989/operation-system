<template>
    <div class="side-container">
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="create-title">修改历年考题菜单</div>
                <div class="create-content">
                    <div class="content-item">
                        考试类型：
                        <el-select v-model="menus.type" disabled placeholder="请选择">
                            <el-option
                                v-for="item in typeLists"
                                :key="item.type"
                                :label="item.value"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="content-item">
                        {{createSideMenu.length}}
                        <span class="tit">一级菜单</span>
                        <input type="text" placeholder="请输入一级菜单名称" v-model="createSideMenu.name">
                        <el-button size="mini" @click="addSecondMenu">添加二级菜单</el-button>
                        <div class="children-content" v-if="createSideMenu.levelTwo && createSideMenu.levelTwo.length">
                            <div class="sub-item" v-for="(child, i) in createSideMenu.levelTwo" :key="i">
                                <span class="c-tit">二级菜单</span>
                                <input type="text" placeholder="请输入二级菜单名称" v-model="child.name">
                                <el-button size="mini" @click="removeMenu(i)" :data-index="i">移除</el-button>
                                <el-button size="mini" @click="addSecondMenu">添加</el-button>
                            </div>
                        </div>
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
        let createSideMenu = ref({name: '', levelTwo: []})
        let router         = useRouter();
        let selectType     = ref('')
        let menus          = ref({})
        let typeLists      = ref([
            { type: 0, value: '模考'},
            { type: 1, value: '高考'},
            { type: 2, value: 'Top美考'}
        ])
        onMounted(() => {
            let query = router.currentRoute.value.query
            getMenuDetail(query.id)
        })
        // 获取菜单详情
        let getMenuDetail = id => {
            menuDetail(id).then(res => {
                console.log(res)
                let {code, data} = res
                let {childMenus, ...args} = data
                menus.value = data
                createSideMenu.value = {...args, levelTwo: childMenus}
                console.log(createSideMenu)
            })
        }

        return {
            router,
            createSideMenu,
            typeLists,
            selectType,
            menus
        }
    },
    methods: {
        addSecondMenu(e) {
            // let { index } = e.currentTarget.dataset,
            //     _data     = this.createSideMenu;
            // console.log(e, index, _data[index])
            // _data[index]['levelTwo']['push']({name: ''})
            this.createSideMenu.levelTwo.push({name: ''})
        },
        removeMenu(index) {
            console.log(index)
                // 删除二级菜单
            let { levelTwo } = this.createSideMenu
            console.log('object', levelTwo)
            levelTwo.splice(index, 1)
            this.createSideMenu.levelTwo = levelTwo
        },
        // 保存菜单
        saveMenus() {
            console.log(this.createSideMenu, this.selectType)
            // this.createSideMenu.forEach((menu, index, array) => array[index]['type'] = this.selectType )
            let params = {
                levelOne: [this.createSideMenu]
            }
            console.log(params)
            createBatchMenu(params).then(res => {
                console.log(res)
                if(res.code === 200) {
                    this.router.push('/examination/sideConfigure')
                    this.$message({ type: 'success', message: '修改成功!' })
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
