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
    Promise.Array = require('../bin/PromiseArray.min');
  } else {
    Promise.Array = require('../bin/PromiseArray');
  }

  test('Promise.Array: map (undefined)')
    .this(
      new Promise.Array([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ]).map(function (value) {})
    )
    .shouldBe([ undefined, undefined ]);

  test('Promise.Array: map (NaN)')
    .this(
      new Promise.Array([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .map(function (value, index) {
        return value.toString / index;
      })
    ).shouldBe(
      [ NaN, NaN ]
    );

  test('Promise.Array: forEach (should be)')
    .this(
      new Promise.Array([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .forEach(function (value, index) {
        return '';
      })
    ).shouldBe(
      [ 100, 200 ]
    );

  test('Promise.Array: forEach (not be)')
    .this(
      new Promise.Array([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .forEach(function (value, index) {
        return '';
      })
    ).shouldNotBe(
      [ 200, 100 ]
    );

  test('Promise.Array: filter (not be)')
    .this(
      new Promise.Array([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .filter(function (value, index) {
        return value > 100;
      })
    ).shouldNotBe(
      [ 100 ]
    );

  test('Promise.Array: filter (should be)')
    .this(
      new Promise.Array([
        timedPromise(100).resolve(),
        timedPromise(200).resolve()
      ])
      .filter(function (value, index) {
        return value > 100;
      })
    ).shouldBe(
      [ 200 ]
    );

  test('Promise.Array: map & filter (should be)')
    .this(
      new Promise.Array([
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

  test('Promise.Array: map & filter (not be)')
    .this(
      new Promise.Array([
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

  test('Promise.Array: map, filter & forEach (should be)')
    .this(
      new Promise.Array([
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

  test('Promise.Array: map, filter & forEach (should not be undefined)')
    .this(
      new Promise.Array([
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

  test('Promise.Array: map to promise (with rejection)')
    .this(
      new Promise.Array([
        timedPromise(100).resolve(),
        timedPromise(200).resolve(),
        timedPromise(200).reject()
      ])
      .map(function (value, index) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(value * 2);
          }, 100);
        });
      })
    ).shouldBe(
      [200, 400]
    );

});
