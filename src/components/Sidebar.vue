<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
            },
          {
            icon: "el-icon-star-off",
            index: "2",
            title: "机构管理",
            subs: [
              {
                index: "/school",
                title: "机构管理",
              },
              {
                index: "/",
                title: "机构参数管理",
              },
            ],
          },
          {
            icon: "el-icon-lx-calendar",
            index: "3",
            title: "考试信息",
            subs: [
              {
                index: "/",
                title: "考试管理",
              },
              {
                index: "/",
                title: "考试监管",
              },
            ],
          },
          {
            icon: "el-icon-lx-calendar",
            index: "4",
            title: "物流管理",
            subs: [
              {
                index: "/",
                title: "我要寄件",
              },
            ],
          },
          {
            icon: "el-icon-apple",
            index: "5",
            title: "APP配置",
            subs: [
              {
                index: "/",
                title: "导航条配置",
              },
              {
                index: "/",
                title: "科目tab配置",
              },
              {
                index: "/banner",
                title: "banner配置",
              },
            ],
          },
          {
            icon: "el-icon-user",
            index: "6",
            title: "用户管理",
            subs: [
              {
                index: "/appUser",
                title: "APP用户管理",
              },
              {
                index: "/",
                title: "系统角色管理",
              },
              {
                index: "/sysUser",
                title: "系统用户管理",
              },
            ],
          },
          {
            icon: "el-icon-printer",
            index: "7",
            title: "订单列表",
            subs: [
              {
                index: "/OrderList",
                title: "订单管理",
              },
              {
                index: "/",
                title: "订单分析",
              },
              {
                index: "/",
                title: "退款",
              },
              {
                index: "/",
                title: "商品价格",
              },
            ],
          },
          {
            icon: "el-icon-lx-calendar",
            index: "8",
            title: "操作日志",
            subs: [
              {
                index: "/logs",
                title: "操作日志",
              },
            ],
          },
          {
            icon: "el-icon-lx-calendar",
            index: "9",
            title: "高校管理",
            subs: [
              {
                index: "/",
                title: "高校管理",
              },
            ],
          },
          {
            icon: "el-icon-lx-calendar",
            index: "10",
            title: "历年考题",
            subs: [
              {
                index: "/",
                title: "历年考题",
              },
              {
                index: "/",
                title: "高分试卷",
              },
            ],
          },
          {
            icon: "el-icon-lx-calendar",
            index: "11",
            title: "交易管理",
            subs: [
              {
                index: "/",
                title: "账号资金",
              },
              {
                index: "/",
                title: "考试费用",
              },
            ],
          },
          {
            icon: "el-icon-lx-calendar",
            index: "12",
            title: "菜单管理",
            subs: [
              {
                index: "/",
                title: "考试系统菜单",
              },
              {
                index: "/",
                title: "易考绘菜单",
              },
            ],
          },
          {
            icon: "el-icon-lx-calendar",
            index: "13",
            title: "系统管理",
            subs: [
              {
                index: "/",
                title: "APP版本更新",
              },
            ],
          },

        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
