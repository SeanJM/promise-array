# Promise Array 1.1.4
#### License: [MIT](https://opensource.org/licenses/MIT)

#### ✅ All 11 tests pass

## Table of Contents

#### Overview

- [Description](#description)
- [Installation](#installation)
- [Notes](#notes)
- [Example](#example)
- [Tests](#tests)

#### Content

- [errors](#errors--top)
- [filter](#filter--top)
- [forEach](#foreach--top)
- [map](#map--top)

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


### errors ... ([top](#table-of-contents))

When an item in your list does not resolve, it will not trigger a `catch` callback. Instead, once all the items have been attempted, you will get arguments in `resolve`.

- An array of results
- An array of error objects

Construction of the error array item:

```
{
  item : [ Item in the Array ],
  error : [ Error ],
  index : [ Item Index ]
}
```

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

***

## Tests

```
   1. Promise.Array: map (undefined)..................................... ✅
   2. Promise.Array: map (NaN)........................................... ✅
   3. Promise.Array: forEach (should be)................................. ✅
   4. Promise.Array: forEach (not be).................................... ✅
   5. Promise.Array: filter (not be)..................................... ✅
   6. Promise.Array: filter (should be).................................. ✅
   7. Promise.Array: map & filter (should be)............................ ✅
   8. Promise.Array: map & filter (not be)............................... ✅
   9. Promise.Array: map, filter & forEach (should be)................... ✅
  10. Promise.Array: map, filter & forEach (should not be undefined)..... ✅
  11. Promise.Array: map to promise (with rejection)..................... ✅
```
