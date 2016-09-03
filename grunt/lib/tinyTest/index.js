const Test = require('./Test');
const colors = require('colors');

function TinyTest(callback) {
  var self = this;

  function test(name) {
    var test_instance = new Test(
      {
        name : name,
        passed : self.passed,
        failed : self.failed
      }
    );

    self.list_tests.push(test_instance);

    return test_instance;
  }

  this.passed = [];
  this.failed = [];

  this.isSilent = false;

  this.list_tests = [];
  this.date_start = new Date();

  this.method = {
    resolve : [],
    reject : []
  };

  setTimeout(function () {

    self.log(
      '\nStarting' + ' tinyTest...'.green
    );

    callback(test);

    self.log('Loading tests (' + self.list_tests.length.toString().cyan + ')\n');

    Promise.all(self.list_tests)
      .then(self.complete());
  }, 1);
}

TinyTest.prototype.printFail = function () {
  let total = (this.passed.length + this.failed.length);
  let perc = Math.round((this.failed.length / total) * 100).toString() + '%';
  this.log(
    '\n -'.red + ' Failed: ' + this.failed.length + '/' + total + ' (' + perc.cyan + ')'
  );
};

TinyTest.prototype.printPass = function () {
  this.log(
    this.passed.length > 1
      ? '\n +'.green + ' All ' + this.passed.length + ' tests passed'
      : '\n + '.green + this.passed.length + ' test passed'
  );
};

TinyTest.prototype.printLength = function () {
  var time = (this.date_complete - this.date_start) / 1000;
  this.log(
    '   Completed in ' + time.toString().cyan + 's'.cyan + '\n'
  );
};

TinyTest.prototype.complete = function () {
  var self = this;

  return function () {
    self.date_complete = new Date();

    self.passed.forEach(
      function (message) {
        self.log(message);
      }
    );

    self.failed.forEach(
      function (message) {
        self.log(message);
      }
    );

    if (self.failed.length) {
      self.printFail();
    } else {
      self.printPass();
    }

    self.printLength();
    self.resolve();
  };
};

TinyTest.prototype.then = function (callback) {
  this.method.resolve.push(callback);
};

TinyTest.prototype.catch = function (callback) {
  this.method.reject.push(callback);
};

TinyTest.prototype.resolve = function () {
  var opt = {
    failed : this.failed.length,
    passed : this.passed.length,
    total : this.failed.length + this.passed.length
  };

  this.method.resolve.forEach(
    function (callback) {
      callback(opt);
    }
  );
};

TinyTest.prototype.silence = function () {
  this.isSilent = true;
  return this;
};

TinyTest.prototype.log = function (value) {
  if (!this.isSilent) {
    console.log(value);
  }
};

module.exports = TinyTest;
