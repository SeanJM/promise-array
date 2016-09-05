if (typeof window === 'object') {
  window.PromiseArray = PromiseArray;
} else if (typeof module === 'object') {
  module.exports = PromiseArray;
}
