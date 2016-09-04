const Test = require('./Test');
const colors = require('colors');

const padLeft = require('../lib/padLeft');
const padRight = require('../lib/padRight');

function TinyTest(callback) {
  var self = this;
  var index = 1;

  function test(name) {
    var test_instance = new Test(
      {
        name : name,
        passed : self.passed,
        failed : self.failed,
        index : index++
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
    callback(test);

    self.log('\n Loading tests (' + self.list_tests.length.toString().cyan + ')\n');

    Promise.all(self.list_tests)
      .then(self.complete())
      .catch(function (error) {
        self.reject(error);
      });
  }, 20);
}

TinyTest.prototype.printFail = function () {
  let total = (this.int_passed + this.int_failed);
  let perc = Math.round((this.int_failed / total) * 100).toString() + '%';
  this.log(
    '\n -'.red + ' Failed: ' + this.int_failed + '/' + total + ' (' + perc.cyan + ')'
  );
};

TinyTest.prototype.printPass = function () {
  this.log(
    this.int_passed > 1
      ? '\n +'.green + ' All ' + this.int_passed + ' tests passed'
      : '\n + '.green + this.int_passed + ' test passed'
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

    self.int_failed = 0;
    self.int_passed = 0;

    for (var k in self.passed) {
      self.log(
        padLeft(self.passed[k].index + '. ', 6, ' ') + padRight(self.passed[k].name + ' ', 66, '.'.grey) + ' PASSED'.green
      );
      self.int_passed += 1;
    }

    for (k in self.failed) {
      self.log(
        '\n' + padLeft(self.failed[k].index + '. ', 6, ' ') + padRight(self.failed[k].name + ' ', 66, '.').red + ' FAILED'.red +
        '\n +'.green + ' Expected: ' + padLeft(typeToString(self.failed[k].b), 66, ' ').grey +
        '\n -'.red + '   Actual: ' + padLeft(typeToString(self.failed[k].a), 66, ' ').grey
      );
      self.int_failed += 1;
    }

    if (Object.keys(self.failed).length) {
      self.printFail();
    } else {
      self.printPass();
    }

    self.printLength();
    self.resolve();
  };
};

TinyTest.prototype.then = function (callback) {
  this.method.resolve.push(
    callback
  );

  return this;
};

TinyTest.prototype.catch = function (callback) {
  this.method.reject.push(
    callback
  );

  return this;
};

TinyTest.prototype.resolve = function () {
  var opt = {
    int_failed : this.int_failed,
    int_passed : this.int_passed,
    int_total : this.int_failed + this.int_passed,
    passed : this.passed,
    failed : this.failed
  };

  this.method.resolve.forEach(
    function (callback) {
      callback(opt);
    }
  );

  this.method = {
    resolve : [],
    reject : []
  };
};

TinyTest.prototype.reject = function (error) {
  this.method.resolve.forEach(
    function (callback) {
      callback(error);
    }
  );

  this.method = {
    resolve : [],
    reject : []
  };
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
