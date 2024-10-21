const _window = typeof window !== 'undefined' ? window : {};

export const inBrowser = typeof window !== 'undefined';

function requestAniFrame() {
  if (typeof _window !== 'undefined') {
    return (
      _window.requestAnimationFrame ||
      _window.webkitRequestAnimationFrame ||
      function (callback) {
        _window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  return function (callback) {
    setTimeout(callback, 1000 / 60);
  };
}

export function cancelRaf(id) {
  if (inBrowser) {
    cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
}

export default requestAniFrame();
