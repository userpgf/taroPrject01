export default defineAppConfig({
  pages: [
  'pages/index/index', "pages/contribute/index", "pages/login/index", "pages/my/index", "pages/notice/index", "pages/noticeDetail/index", "pages/content/index", "pages/search/index"],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#333',
    selectedColor: '#1296db',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
    {
      text: '首页',
      pagePath: 'pages/index/index',
      iconPath: 'static/tabs/home_default.png',
      selectedIconPath: 'static/tabs/home_selected.png'
    },
    {
      text: '投稿',
      pagePath: 'pages/contribute/index',
      iconPath: 'static/tabs/contribute_selected.png'
    },
    {
      text: '我的',
      pagePath: 'pages/my/index',
      iconPath: 'static/tabs/my_default.png',
      selectedIconPath: 'static/tabs/home_selected.png'
    }]

  }
});