function isPromiseList(list) {
  for (var i = 0, n = list.length; i < n; i++) {
    if (!isPromise(list[i])) {
      return false;
    }
  }
  return true;
}
