import Vue from 'vue'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

// highlightjs
// import hljs from 'highlight.js';

// Prism
import Prism from 'prismjs';
// 直接按需引入 prism 的语言包即可，此处以 json 为例
import 'prismjs/components/prism-json';

VMdPreview.use(vuepressTheme, {
  Prism: Prism,
});
// VMdPreview.use(createEmojiPlugin)
Vue.use(VMdPreview);
Vue.component('VMdPreview', VMdPreview)