const TinyTest = require('../grunt/tinyTest');
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json'));
const config = pkg.gruntBuild;
const colors = require('colors');

function timedPromise(n) {
  return {
    resolve : function () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(n);
        }, n);
      });
    },
    reject : function (value) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          reject(value);
        }, n);
      });
    }
  };
}

module.exports = new TinyTest(function (test) {
  if (config.isProduction) {
    Promise.List = require('../bin/PromiseList.min');
  } else {
    Promise.List = require('../bin/PromiseList');
  }

  test('Promise.List: map (undefined)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ]).map(function (value) {})
    )
    .shouldBe([ undefined, undefined ]);

  test('Promise.List: map (NaN)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .map(function (value, index) {
        return value.toString / index;
      })
    ).shouldBe(
      [ NaN, NaN ]
    );

  test('Promise.List: forEach (should be)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .forEach(function (value, index) {
        return '';
      })
    ).shouldBe(
      [ 100, 200 ]
    );

  test('Promise.List: forEach (not be)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .forEach(function (value, index) {
        return '';
      })
    ).shouldNotBe(
      [ 200, 100 ]
    );

  test('Promise.List: filter (not be)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .filter(function (value, index) {
        return value > 100;
      })
    ).shouldNotBe(
      [ 100 ]
    );

  test('Promise.List: filter (should be)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .filter(function (value, index) {
        return value > 100;
      })
    ).shouldBe(
      [ 200 ]
    );

  test('Promise.List: map & filter (should be)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .map(function (value, index) {
        return Math.pow(value, index + 1);
      })
      .filter(function (value, index) {
        return value > 100;
      })
    ).shouldBe(
      [ 40000 ]
    );

  test('Promise.List: map & filter (not be)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .map(function (value, index) {
        return Math.pow(value, index + 1);
      })
      .filter(function (value, index) {
        return value > 100;
      })
    ).shouldNotBe(
      [ 100, 200 ]
    );

  test('Promise.List: map & filter (rejected promise)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).reject('Error')
      ])
      .map(function (value, index) {
        return Math.pow(value, index + 1);
      })
      .filter(function (value, index) {
        return value > 100;
      })
    ).shouldBe(
      "Error"
    );

  test('Promise.List: map & filter (rejected promise -- not be)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).reject('Error')
      ])
      .map(function (value, index) {
        return Math.pow(value, index + 1);
      })
      .filter(function (value, index) {
        return value > 100;
      })
    ).shouldNotBe(
      [100, 200]
    );

  test('Promise.List: map, filter & forEach (should be)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .map(function (value, index) {
        return value - index;
      })
      .filter(function (value, index) {
        return value > 100;
      })
      .forEach(function (value, index) {
        return '';
      })
    ).shouldBe(
      [199]
    );

  test('Promise.List: map, filter & forEach (should not be undefined)')
    .this(
      new Promise.List([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .map(function (value, index) {
        return value - index;
      })
      .filter(function (value, index) {
        return value > 100;
      })
      .forEach(function (value, index) {
        return '';
      })
    ).shouldNotBe(
      [undefined, undefined]
    );

});
