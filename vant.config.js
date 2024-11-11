module.exports = {
  name: 'zto-express-ui',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '',
    },
  },
  site: {
    title: 'zto-express-ui',
    logo: 'https://life-public-1317992895.cos.ap-shanghai.myqcloud.com/life/bbd9c0b03fae4293ad5916e3887dc2be.png',
    links: [
      {
        logo: 'https://raw.githubusercontent.com/ztoec/zto-express-ui/e55706fb2063f0417688fd8a04384a9e41869c2c/static/github.svg',
        url: 'https://github.com/ztoec/zto-express-ui',
      },
    ],
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '业务组件',
        items: [
          {
            path: 'steps',
            title: 'Steps 步骤条',
          },
          {
            path: 'list',
            title: 'List 列表',
          },
          {
            path: 'pull-refresh',
            title: 'PullRefresh 下拉刷新',
          },
        ],
      },
    ],
  },
};
