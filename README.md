# Promise Array 1.2.5
#### License: [MIT](https://opensource.org/licenses/MIT)

#### ✅ All 12 tests pass

## Table of Contents

#### Overview

- [Description](#description)
- [Installation](#installation)
- [Notes](#notes)
- [Example](#example)
- [Tests](#tests)

#### Content

- [catch](#catch--top)
- [filter](#filter--top)
- [forEach](#foreach--top)
- [map](#map--top)
- [then](#then--top)

## Description

A small library providing asynchronous array methods for promises.


## Installation

### Browser
Just download the `PromiseArray.min.js` and include it in an HTML `<script>` tag

eg:
```html
<script src="PromiseArray.min.js"></script>
```

### Node
```bash
npm i -S promise-array
```


## Notes

This differs from `Promise.all` in that it does not wait for all the promises to resolve. As each promise resolves, it executes each method on that value.

For example, you want to update a list of values and you don't want the interface to appear frozen.


## Example

```javascript
var statusLine = document.querySelector('#status-line');

PromiseArray(listOfPromises)
  .map(a => a * 2)
  .filter(a => a < 100)
  .forEach(
    function (value) {
      var el = document.createElement('div');
      el.innerHtml = value;
      document.body.append(el);
    }
  )
  .then(
    function () {
      statusLine.innerHtml = 'Complete';
    }
  )
  .catch(
    function () {
      statusLine.innerHtml = 'Incomplete, please try again.';
    }
  )
```


### catch ... ([top](#table-of-contents))

When an item in your list does not resolve, it will not trigger a `catch` callback. Instead, once all the items have been attempted, you will get 2 arguments passed to the `then` method.

The only error which will trigger the `catch` method is going to be if an invalid promise is passed to the constructor.

### filter ... ([top](#table-of-contents))

Works the same as the default `.filter` function, with the exception that it can also return a `Promise`

```javascript
var myPromises = [promise1, promise2];
PromiseArray(myPromises)
  .filter(function (value, index) {
    return value > 100;
  });
```

```javascript
PromiseArray(myPromises)
  .map(function (value) {
    return new Promise(...)
  });
```

### forEach ... ([top](#table-of-contents))

Works the same as the default `.forEach` function.

```javascript
var myPromises = [promise1, promise2];
PromiseArray(myPromises)
  .forEach(function (value, index) {
    // My code
  });
```

### map ... ([top](#table-of-contents))

Works the same as the default `.map` function, with the exception that it can also return a `Promise`

```javascript
var myPromises = [promise1, promise2];
PromiseArray(myPromises)
  .map(function (value, index) {
    return value.toLowerCase();
  });
```

```javascript
PromiseArray(myPromises)
  .map(function (value) {
    return new Promise(...)
  });
```

### then ... ([top](#table-of-contents))

Returns two arguments:

- An array of values
- An array of error objects

Construction of the error array item:

```
{
  promise : [ Rejected Promise ],
  error : [ Error ],
  index : [ Item Index ]
}
```

***

## Tests

```
   1. map (undefined).................................................... ✅
   2. map (NaN).......................................................... ✅
   3. forEach (should be)................................................ ✅
   4. forEach (not be)................................................... ✅
   5. filter (not be).................................................... ✅
   6. filter (should be)................................................. ✅
   7. map & filter (should be)........................................... ✅
   8. map & filter (not be).............................................. ✅
   9. map, filter & forEach (should be).................................. ✅
  10. map, filter & forEach (should not be undefined).................... ✅
  11. map to promise (with rejection).................................... ✅
  12. Invalid list of promises........................................... ✅
```
