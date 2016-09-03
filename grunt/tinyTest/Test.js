const isTypeEqual = require('./predicates/isTypeEqual');
const typeToString = require('./utilities/typeToString');
const maybePromise = require('../lib/maybePromise');

function padRight(a, n, c) {
  a = typeof a === 'string'
    ? a
    : a.toString();

  return a.length > n
    ? a
    : a + new Array(n - a.length).join(c);
}

function padLeft(a, n, c) {
  a = typeof a === 'string'
    ? a
    : a.toString();

  return a.length > n
    ? a
    : new Array(n - a.length).join(c) + a;
}

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
    padLeft(this.index + '. ', 6, ' ') + padRight(this.name + ' ', 66, '.'.grey) + ' PASSED'.green
  );
};

Test.prototype.fail = function () {
  this.failed[this.index] = (
    '\n' + padLeft(this.index + '. ', 6, ' ') + padRight(this.name + ' ', 66, '.').red + ' FAILED'.red +
    '\n +'.green + ' Expected: ' + padLeft(typeToString(this.b), 66, ' ').grey +
    '\n -'.red + '   Actual: ' + padLeft(typeToString(this.a), 66, ' ').grey
  );
};

Test.prototype.this = function (value) {
  this.a = value;
  return this;
};

Test.prototype.runTest = function() {
  var self = this;

  function maybeB(b_value) {
    self.b = b_value;

    if (isTypeEqual(self.a, self.b) === self.equality) {
      self.pass();
    } else {
      self.fail();
    }

    self.resolve();
  }

  function maybeA(a_value) {
    self.a = a_value;
    maybePromise(self.b)
      .then(maybeB)
      .catch(maybeB);
  }

  maybePromise(this.a)
    .then(maybeA)
    .catch(maybeA);
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
