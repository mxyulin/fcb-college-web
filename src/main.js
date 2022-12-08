import resourceTable from '@/components/resource-table';
import * as urls from '@/config/env';
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env';
import website from '@/config/website';
import crudCommon from '@/mixins/crud';
import avueUeditor from 'avue-plugin-ueditor';
import Element from 'element-ui';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import App from './App';
import './cache'; //页面缓存
import basicBlock from './components/basic-block/main';
import basicContainer from './components/basic-container/main';
import flowDesign from './components/flow-design/main';
import thirdRegister from './components/third-register/main';
import './error'; // 日志
import i18n from './lang'; // Internationalization
import './permission'; // 权限
import axios from './router/axios';
import router from './router/router';
import store from './store';
import './styles/common.scss';
import { loadStyle } from './util/util';
// 业务组件
import tenantPackage from './views/system/tenantpackage';

// 注册全局crud驱动
window.$crudCommon = crudCommon;
// 加载Vue拓展
Vue.use(router);
Vue.use(VueAxios, axios);
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(window.AVUE, {
  size: 'small',
  tableSize: 'small',
  calcHeight: 65,
  i18n: (key, value) => i18n.t(key, value)
});
// 注册全局容器
Vue.component('basicContainer', basicContainer);
Vue.component('basicBlock', basicBlock);
Vue.component('thirdRegister', thirdRegister);
Vue.component('avueUeditor', avueUeditor);
Vue.component('flowDesign', flowDesign);
Vue.component('tenantPackage', tenantPackage);
Vue.component('resourceTable', resourceTable);
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
});
// 加载NutFlow
Vue.use(window.WfDesignBase);
// 加载website
Vue.prototype.website = website;
// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele));
});
Vue.config.productionTip = false;

/* vue 调试工具(适用于v2) */
// 获取 devtools 的全局变量
const devtools = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
// * 关键一步：初始化当前 Vue 构造函数的调试工具
devtools.emit('init', Vue);
// 开发环境启用 devtools 否则不启用
if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
