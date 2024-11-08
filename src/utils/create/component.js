import createBEM from './bem';

function camelize(str) {
  return str.replace(/-(\w)/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
}

function install(Vue) {
  const { name } = this;
  Vue.component(name, this);
  Vue.component(camelize('-' + name), this);
}

export default function createComponent(name) {
  return function (sfc) {
    sfc.name = name;
    sfc.install = install;
    sfc.methods.$bem = createBEM(name);
    return sfc;
  };
}
