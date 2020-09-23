export const throttle = (func, delay = 500) => {
  let timeout = null;

  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.call(this, ...args);
        timeout = null;
      }, delay);
    }
  };
};
