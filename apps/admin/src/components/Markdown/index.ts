import { withInstall } from '/@/utils';
import markDown from './src/Markdown.vue';
import Prism from 'prismjs';
import markDownViewer from './src/MarkdownViewer.vue';
import MarkdownEditor from '@kangc/v-md-editor';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

MarkdownEditor.use(vuepressTheme, { Prism });

export const MarkDown = withInstall(markDown);
export const MarkdownViewer = withInstall(markDownViewer);

export * from './src/typing';
