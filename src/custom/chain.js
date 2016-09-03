function chain(self, value, index) {
  return new Promise(
    function (resolve, reject) {

      function each(i, value) {
        var callback = self.queue[i]
          ? self.queue[i][1]
          : false;

        var method = self.queue[i]
          ? self.queue[i][0]
          : false;

        var result;

        if (callback) {
          result = callback(value, index);
          if ((
            method === 'filter' && result
          ) || (
            method === 'forEach'
          )) {
            each(i + 1, value);
          } else if (method === 'filter') {
            resolve(REJECT_VALUE);
          } else {
            each(i + 1, result);
          }
        } else {
          resolve(value);
        }
      }

      each(0, value);
    }
  );
}
