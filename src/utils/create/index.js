import createComponent from './component';

export function createNamespace(name) {
  name = 'ze-' + name;
  return [createComponent(name)];
}
