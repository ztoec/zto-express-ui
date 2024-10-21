const overflowScrollReg = /scroll|auto|overlay/i;
const defaultRoot = window;

function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return (
    node.tagName !== 'HTML' &&
    node.tagName !== 'BODY' &&
    node.nodeType === ELEMENT_NODE_TYPE
  );
}

export function getScrollParent(el, root = defaultRoot) {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }

  return root;
}

export const pxCheck = (value) => {
  if (value !== undefined) {
    return isNaN(Number(value)) ? String(value) : `${value}px`;
  }
};
