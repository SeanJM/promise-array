function isPromise(obj) {
  return (
    typeof obj !== 'undefined'
    && typeof obj !== 'string'
    && typeof obj.then === 'function'
    && typeof obj.catch === 'function'
  );
}
