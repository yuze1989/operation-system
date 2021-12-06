import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }, {
                path: "/logs",
                name: "logs",
                meta: {
                    title: '操作日志'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/Logs/index.vue")
            },
            {
                path: "/banner",
                name: 'banner',
                meta: {
                    title: 'banner配置'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/APP/banner.vue")
            },
            {
                path: "/school",
                name: 'school',
                meta: {
                    title: '机构配置'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/School/list.vue")
            },
            {
                path: "/appUser",
                name: 'appUser',
                meta: {
                    title: 'APP用户管理'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/User/app.vue")
            },
            {
                path: "/sysUser",
                name: 'sysUser',
                meta: {
                    title: '系统用户管理'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/User/sys.vue")
            },
            {
                path: "/OrderList",
                name: 'OrderList',
                meta: {
                    title: '订单管理'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/Order/list.vue")
            },
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login/index.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 易考绘`;
    const role = localStorage.getItem('nickName');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        // role === 'admin'
        //     ? next()
        //     : next('/403');
    } else {
        next();
    }
});

export default router;