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
            }, 
            {
                path: "/logs",
                name: "logs",
                meta: {
                    title: '操作日志'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/Logs/index.vue")
            },
            {
                path: "/examination/subjectTabConfigure",
                name: "subjectTabConfigure",
                meta: {
                    title: '科目tab配置'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/subjectTabConfigure/index.vue")
            },
            {
                path: "/examination/subjectTabConfigure/new",
                name: "newSubjectTabConfigure",
                meta: {
                    title: '新增科目'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/subjectTabConfigure/new.vue")
            },
            {
                path: "/examination/sideConfigure",
                name: "sideConfigure",
                meta: {
                    title: '历年考题菜单配置'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/sideConfigure/index.vue")
            },
            {
                path: "/examination/sideConfigure/new",
                name: "newSideConfigure",
                meta: {
                    title: '历年考题菜单配置'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/sideConfigure/new.vue")
            },
            {
                path: "/examination/sideConfigure/detail",
                name: "editSideConfigure",
                meta: {
                    title: '修改历年考题菜单配置'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/sideConfigure/detail.vue")
            },
            {
                path: "/examination/history",
                name: "history",
                meta: {
                    title: '历年考题'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/history/index.vue")
            },
            {
                path: "/examination/history/new",
                name: "newHistory",
                meta: {
                    title: '新增历年考题'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/history/new.vue")
            },
            {
                path: "/examination/history/examine",
                name: "examineHistory",
                meta: {
                    title: '审核历年考题'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/history/examine.vue")
            },
            {
                path: "/examination/history/detail",
                name: "examineHistoryDetail",
                meta: {
                    title: '编辑历年考题'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/history/detail.vue")
            },
            {
                path: "/examination/highScorePaper",
                name: "highScorePaper",
                meta: {
                    title: '高分试卷'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/highScorePaper/index.vue")
            },
            {
                path: "/examination/highScorePaper/new",
                name: "newHighScorePaper",
                meta: {
                    title: '高分试卷'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/highScorePaper/new.vue")
            },
            {
                path: "/examination/highScorePaper/detail",
                name: "detailHighScorePaper",
                meta: {
                    title: '修改高分试卷'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/highScorePaper/detail.vue")
            },
            {
                path: "/examination/highScorePaper/examine",
                name: "examineHighScorePaper",
                meta: {
                    title: '高分试卷-审核'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/examination/highScorePaper/examine.vue")
            },
            {
                path: "/settings/update",
                name: "update",
                meta: {
                    title: 'app版本更新'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/settings/update/index.vue")
            },
            {
                path: "/settings/update/new",
                name: "newUpdate",
                meta: {
                    title: '新增版本'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/settings/update/new.vue")
            },
            {
                path: "/schoolManage",
                name: "schoolManage",
                meta: {
                    title: '高校管理'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/schoolManage/index.vue")
            },
            {
                path: "/schoolManage/new",
                name: "newSchoolManage",
                meta: {
                    title: '新增高校'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/schoolManage/new.vue")
            },
            {
                path: "/schoolManage/detail",
                name: "editSchoolManage",
                meta: {
                    title: '修改高校'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/schoolManage/detail.vue")
            },
            {
                path: "/schoolManage/category",
                name: "SchoolCategory",
                meta: {
                    title: '高校分类'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/schoolManage/category.vue")
            },
            {
                path: "/schoolManage/createCategory",
                name: "newSchoolCategory",
                meta: {
                    title: '新增高校分类'
                },
                component: () => import ( /* webpackChunkName: "logs" */ "../views/schoolManage/createCategory.vue")
            },
            // {
            //     path: "/banner",
            //     name: 'banner',
            //     meta: {
            //         title: 'banner配置'
            //     },
            //     component: () => import ( /* webpackChunkName: "logs" */ "../views/APP/banner.vue")
            // },
            // {
            //     path: "/school",
            //     name: 'school',
            //     meta: {
            //         title: '机构配置'
            //     },
            //     component: () => import ( /* webpackChunkName: "logs" */ "../views/School/list.vue")
            // },
            // {
            //     path: "/appUser",
            //     name: 'appUser',
            //     meta: {
            //         title: 'APP用户管理'
            //     },
            //     component: () => import ( /* webpackChunkName: "logs" */ "../views/User/app.vue")
            // },
            // {
            //     path: "/sysUser",
            //     name: 'sysUser',
            //     meta: {
            //         title: '系统用户管理'
            //     },
            //     component: () => import ( /* webpackChunkName: "logs" */ "../views/User/sys.vue")
            // },
            // {
            //     path: "/OrderList",
            //     name: 'OrderList',
            //     meta: {
            //         title: '订单管理'
            //     },
            //     component: () => import ( /* webpackChunkName: "logs" */ "../views/Order/list.vue")
            // },
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