if (typeof window === 'object') {
  window.PromiseList = PromiseList;
} else if (typeof module === 'object') {
  module.exports = PromiseList;
}
