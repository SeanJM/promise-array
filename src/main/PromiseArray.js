function PromiseArray(list) {
  var self = this;
  var index = 0;

  var success = {};
  var failure = {};

  function checkComplete() {
    if (index === list.length - 1) {
      self.resolve(
        toArray(success),
        toArray(failure)
      );
    }
    index++;
  }

  this.queue = [];

  this.method = {
    resolve : [],
    reject : []
  };

  // Timer is to compensate for the constructor being called before it's methods
  setTimeout(function () {
    if (!isPromiseArray(list)) {
      self.reject(
        'Your array must be filled with Promises'
      );
    } else {
      list.forEach(function (promise, i) {
        promise
          .then(function (value) {
            chain(self, value, i)
              .then(function (value) {
                if (value !== REJECT_VALUE) {
                  success[i] = value;
                }
                checkComplete();
              });
          })
          .catch(function (error) {
            failure[i] = {
              promise : list[i],
              error : error,
              index : i
            };
            checkComplete();
          });
      });
    }
  }, 0);

}

PromiseArray.prototype.forEach = function (callback) {
  this.queue.push([ 'forEach', callback ]);
  return this;
};

PromiseArray.prototype.filter = function (callback) {
  this.queue.push([ 'filter', callback ]);
  return this;
};

PromiseArray.prototype.map = function (callback) {
  this.queue.push([ 'map', callback ]);
  return this;
};

PromiseArray.prototype.catch = function (callback) {
  this.method.reject.push(callback);
  return this;
};

PromiseArray.prototype.then = function (callback) {
  this.method.resolve.push(callback);
  return this;
};

PromiseArray.prototype.resolve = function (success, failure) {
  this.method.resolve.forEach(function (callback) {
    callback(success, failure);
  });

  this.method = {
    resolve : [],
    reject : []
  };

  return this;
};

PromiseArray.prototype.reject = function (error) {
  this.method.reject.forEach(function (callback) {
    callback(error);
  });

  this.method = {
    resolve : [],
    reject : []
  };

  return this;
};
