(function () {
var REJECT_VALUE = 'IhXQU9_SKsPm';

function isPromise(obj) {
  return (
    typeof obj !== 'undefined'
    && typeof obj.then === 'function'
    && typeof obj.catch === 'function'
  );
}

function isPromiseList(list) {
  for (var i = 0, n = list.length; i < n; i++) {
    if (!isPromise(list[i])) {
      return false;
    }
  }
  return true;
}

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

function toArray(object) {
  var array = [];

  for (var k in object) {
    array.push(object[k]);
  }

  return array;
}

function PromiseList(list) {
  var self = this;
  var index = 0;
  var result = {};

  function r(method, value) {
    self.method[method]
      .forEach(function (c) {
        c(value);
      });
    self.method = { resolve : [], reject : [] };
  }

  function reject(value) {
    r('reject', value);
  }

  function resolve(value) {
    r('resolve', value);
  }

  function thenChain(i) {
    return function (value) {
      chain(self, value, i)
        .then(function (value) {
          if (value !== REJECT_VALUE) {
            result[i] = value;
          }

          if (index === list.length - 1) {
            resolve(toArray(result));
          }

          index++;
        })
        .catch(reject);
    };
  }

  if (!isPromiseList(list)) {
    throw 'Your array must be filled with Promises';
  }

  this.queue = [];

  this.method = {
    resolve : [],
    reject : []
  };

  list.forEach(function (promise, i) {
    promise
      .then(thenChain(i))
      .catch(reject);
  });
}

PromiseList.prototype.forEach = function (callback) {
  this.queue.push(['forEach', callback]);
  return this;
};

PromiseList.prototype.filter = function (callback) {
  this.queue.push(['filter', callback]);
  return this;
};

PromiseList.prototype.map = function (callback) {
  this.queue.push(['map', callback]);
  return this;
};

PromiseList.prototype.catch = function (callback) {
  this.method.reject.push(callback);
  return this;
};

PromiseList.prototype.then = function (callback) {
  this.method.resolve.push(callback);
  return this;
};

if (typeof window === 'object') {
  window.PromiseList = PromiseList;
} else if (typeof module === 'object') {
  module.exports = PromiseList;
}

}());
//# sourceMappingURL=PromiseList.js.map