/**
 * bem helper function
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

function genMod(element, modifier) {
  if (!modifier) return '';
  if (typeof modifier === 'string') {
    return ` ${element}--${modifier}`;
  }
  if (Array.isArray(modifier)) {
    return modifier.reduce((acc, cur) => acc + genMod(element, cur), '');
  }
  return Object.keys(modifier).reduce(
    (acc, cur) => acc + (modifier[cur] ? genMod(element, cur) : ''),
    ''
  );
}

export default function createBEM(name) {
  return (element, modifier) => {
    if (element && typeof element !== 'string') {
      modifier = element;
      element = '';
    }
    element = element ? `${name}__${element}` : name;
    return `${element}${genMod(element, modifier)}`;
  };
}
