const isTypeEqual = require('./predicates/isTypeEqual');
const typeToString = require('./utilities/typeToString');
const maybePromise = require('../lib/maybePromise');

function Test(opt) {
  this.name = opt.name;

  this.passed = opt.passed;
  this.failed = opt.failed;
  this.index = opt.index;

  this.method = {
    resolve : [],
    reject : []
  };
}

Test.prototype.pass = function () {
  this.passed[this.index] = (
    {
      index : this.index,
      name : this.name,
      a : this.a,
      b : this.b
    }
  );
};

Test.prototype.fail = function () {
  this.failed[this.index] = (
    {
      isCaught : this.isCaught,
      index : this.index,
      name : this.name,
      a : this.a,
      b : this.b
    }
  );
};

Test.prototype.this = function (value) {
  this.a = value;
  return this;
};

Test.prototype.runTest = function() {
  var self = this;

  this.isCaught = [ false, false ];

  function maybeB(b_value) {
    self.b = b_value;


    if (
      !self.isCaught[0] && !self.isCaught[1]
      && isTypeEqual(self.a, self.b) === self.equality
    ) {
      self.pass();
    } else {
      self.fail();
    }

    self.resolve();
  }

  function maybeA(a_value) {
    self.a = a_value;
    maybePromise(self.b)
      .then(function (b_value) {
        maybeB(b_value);
      })
      .catch(function (b_value) {
        self.isCaught[1] = true;
        maybeB(b_value);
      });
  }

  maybePromise(this.a)
    .then(maybeA)
    .catch(function (a_value) {
      self.isCaught[0] = true;
      maybeA(a_value);
    });
};

Test.prototype.shouldBe = function (value) {
  this.equality = true;
  this.b = value;
  this.runTest();
};

Test.prototype.shouldNotBe = function (value) {
  this.equality = false;
  this.b = value;
  this.runTest();
};

Test.prototype.then = function (callback) {
  this.method.resolve.push(
    callback
  );
  return this;
};

Test.prototype.catch = function (callback) {
  this.method.reject.push(
    callback
  );
  return this;
};

Test.prototype.resolve = function (value) {
  this.method.resolve.forEach(
    function (callback) {
      callback(value);
    }
  );

  this.method = {
    resolve : [],
    reject : []
  };

  return this;
};

Test.prototype.reject = function (value) {
  this.method.reject.forEach(
    function (callback) {
      callback(value);
    }
  );

  this.method = {
    resolve : [],
    reject : []
  };

  return this;
};

module.exports = Test;
