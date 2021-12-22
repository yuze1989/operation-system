<template>
    <div style="border: 1px solid #ccc">
        <!-- 工具栏 -->
        <Toolbar
            :editorId="editorId"
            style="border-bottom: 1px solid #ccc"
        />
        <!-- 编辑器 -->
        <!-- 注意，这里引入的是 computed 返回值 -->
        <Editor
            :editorId="editorId"
            :defaultConfig="editorConfig"
            :defaultContent="getDefaultContent" 
            @onChange="handleChange"
            style="height: 500px"
        />
    </div>
</template>


<script setup>
import { computed, onBeforeUnmount } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import { cloneDeep } from 'lodash.clonedeep'

// 定义一个编辑器 id ，要求：全局唯一且不变！！！
const editorId = 'wangeEditor-1'

// 编辑将默认显示的内容
const defaultContent = [ /* 内容为空 */ ]
const getDefaultContent = computed(() => cloneDeep(defaultContent)) // 注意，深拷贝

// 编辑器配置
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: { /* 菜单配置，下文解释 */ }
}

// 回调函数
const handleChange = (editor) => {
    console.log('change:', JSON.stringify(editor.children))
}

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
    const editor = getEditor(editorId)
    if (editor == null) return

    // 销毁，并移除 editor
    editor.destroy()
    removeEditor(editorId)
})
</script>

<!-- 别忘了引入样式 -->
<style src="@wangeditor/editor/dist/css/style.css"></style>
