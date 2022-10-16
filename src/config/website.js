/**
 * 全局配置文件
 */
export default {
  title: "fcb",
  logo: "FCB",
  key: 'fcb',//配置主键,目前用于存储
  indexTitle: '辅成帮',
  clientId: 'fcb_web', // 客户端id
  clientSecret: 'fcb_web_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  tenantId: "000000", // 管理组租户编号
  captchaMode: true, // 是否开启验证码模式
  switchMode: false, // 是否开启部门切换模式
  lockPage: '/lock',
  tokenTime: 3000,
  tokenHeader: 'Fcb-Auth',
  //http的status默认放行列表
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: "首页",
    value: "/wel/index",
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      children: 'children'
    }
  },
  // 第三方系统授权地址
  authUrl: 'http://localhost:1888/fcb-auth/oauth/render',
  // 报表设计器地址(cloud端口为8108,boot端口为80)
  reportUrl: 'http://localhost:8108/ureport',
  // 单点登录系统认证(fcb-auth服务的地)
  ssoUrl: 'http://localhost:8100/oauth/authorize?client_id=fcb&response_type=code&redirect_uri=',
  // 单点登录回调地址(Fcb服务的地址)
  redirectUri: 'http://localhost:1888',
}
