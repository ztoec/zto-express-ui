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
  return {
    name,
    install,
  };
}
