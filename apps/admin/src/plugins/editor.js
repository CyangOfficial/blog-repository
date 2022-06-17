import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

// emoji表情包
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
VueMarkdownEditor.use(createEmojiPlugin())

// 流程图
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';
VueMarkdownEditor.use(createMermaidPlugin());

// todoList
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'
VueMarkdownEditor.use(createTodoListPlugin())


export default function loadComponent (app) {
  app.use(VueMarkdownEditor)
}
