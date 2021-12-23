<template>
    <div style="border: 1px solid #ccc">
        <!-- 工具栏 -->
        <Toolbar
            :editorId="editorId"
            :defaultConfig="toolbarConfig"
            :mode="mode"
            style="border-bottom: 1px solid #ccc"
        />
        <!-- 编辑器 -->
        <!-- 注意，这里引入的是 computed 返回值 -->
        <Editor
            :editorId="editorId"
            :defaultConfig="editorConfig"
            :defaultContent="getDefaultContent" 
            @onCreated="handleCreated"
            @onChange="handleChange"
            style="height: 500px"
        />
    </div>
</template>


<script>
import { computed, onBeforeUnmount, onMounted, nextTick, ref } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import {cloneDeep} from 'lodash'

export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
  components: { Editor, Toolbar },
  setup(props,context) {
    const token   = localStorage.getItem("token");

    // 定义一个编辑器 id ，要求：全局唯一且不变！！！
    const editorId = 'wangeEditor-1'

    console.log('===================', props, context)
    // 编辑将默认显示的内容
    // const defaultContent = [ /* 内容为空 */ ]
    // nextTick();
    const defaultContent = props.data
    const getDefaultContent = computed(() => cloneDeep(defaultContent)) // 注意，深拷贝

    const toolbarConfig = {
        toolbarKeys: [
            // 菜单 key
            'headerSelect',
            // 分割线
            '|',
            'bold', 'italic', 'through', 'clearStyle',
            'fontSize', // 字号
            'blockquote',
            '|',
            'indent',
            'underline', // 下划线
            '|',
            'uploadImage',
            '|',
            'insertLink', 'editLink', 'unLink',
            '|',
            'undo', // 撤销
            'redo', // 重复
        ]
    } 
    // 编辑器配置
    const editorConfig = {
        placeholder: '请输入内容...',
        MENU_CONF: { /* 菜单配置，下文解释 */ }
    }

    console.log(editorConfig)

    // 配置图片
    editorConfig.MENU_CONF['uploadImage'] = {
        server: 'https://test-ykh.msjsol.com/sys/file/imageUpload',
        fieldName: 'file',
        // 自定义增加 http  header
        headers: {
            SYS_TOKEN: token
        },
        // 跨域是否传递 cookie ，默认为 false
        withCredentials: true,

        customInsert(res, insertImage) {
            // res 即服务端的返回结果

            // 从 res 中找到 url alt href ，然后插图图片
            insertImage(res.data)
        },
    }

    const insertImage = (data) => {
        console.log(data)
    }

    // 编辑器回调函数
    const handleCreated = (editor) => {
      console.log('created', editor);
    }
    const handleDestroyed = (editor) => {
      console.log('destroyed', editor)
    }
    const handleFocus = (editor) => {
        console.log('focus', editor)
    }
    const handleBlur = (editor) => {
        console.log('blur', editor)
    }
    const customAlert = (info, type) => {
        alert(`【自定义提示】${type} - ${info}`)
    }
    const customPaste = (editor, event, callback) => {
        console.log('ClipboardEvent 粘贴事件对象', event)

        // 自定义插入内容
        editor.insertText('xxx')

        // 返回值（注意，vue 事件的返回值，不能用 return）
        callback(false) // 返回 false ，阻止默认粘贴行为
        // callback(true) // 返回 true ，继续默认的粘贴行为
    }

    const insertText = () => {
        const editor = getEditor(editorId)
        if (editor == null) return

        editor.insertText('')
    }

    // 组件销毁时，及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = getEditor(editorId)
        if (editor == null) return

        // 销毁，并移除 editor
        editor.destroy()
        removeEditor(editorId)
    })
    return {
      editorId,
      mode: 'default',
      defaultContent,
      getDefaultContent,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      insertText,
      insertImage
    };
  },
  methods: {
      handleCreated(editor){
          console.log('handleCreated', editor)
      },
      handleChange(editor) {
        console.log('change:', editor.children);
        console.log('change:', editor.getHtml());
        // editor.txt.html(this.content)
        console.log(this.data)
        let _html = editor.getHtml(),
            _json = editor.children
        this.$emit('getEditorContent', {html: _html, json: _json})
    }
  }
}
</script>

<!-- 别忘了引入样式 -->
<style src="@wangeditor/editor/dist/css/style.css"></style>
