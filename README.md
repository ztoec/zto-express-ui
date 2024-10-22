<p align="center">
    <img alt="logo" src="https://life-public-1317992895.cos.ap-shanghai.myqcloud.com/life/bbd9c0b03fae4293ad5916e3887dc2be.png" width="120" height="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">zto-express-ui</h1>

<p align="center">基于vue2的移动端组件库</p>

<p align="center">
  🚀<a href="https://ztoec.github.io/zto-express-ui/#/home">文档网站</a>
</p>

## 快速开始

```bash
# 通过 npm
npm i zto-express-ui
# 通过 yarn
yarn add zto-express-ui
# 通过 pnpm
pnpm add zto-express-ui
```

### 引入组件

### 1.自动按需引入组件（推荐）

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。

```bash
# 安装插件
npm install babel-plugin-import -D
```

```js
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "zto-express-ui",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'zto-express-ui',
      libraryDirectory: 'es',
      style: true
    }, 'zto-express-ui']
  ]
};
```

##### 使用组件

```html
<template>
  <div>
    <ze-button type="primary">按钮</ze-button>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Button } from 'zto-express-ui';
  Vue.use(Button);

  export default {
    data() {
      return {};
    }
  }
</script>
```

### 2.手动引入组件

```html
<template>
  <div>
    <ze-button type="primary">按钮</ze-button>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Button from 'zto-express-ui/lib/button';
  import 'zto-express-ui/lib/button/style';
  Vue.use(Button);

  export default {
    data() {
      return {};
    }
  }
</script>
```

### 3.导入所有组件
>
> 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法。

```js
// main.js
import Vue from 'vue';
import zeUi from 'zto-express-ui';
import 'zto-express-ui/lib/index.css';
Vue.use(zeUi);
```
