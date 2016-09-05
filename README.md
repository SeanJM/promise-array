# Promise Array 1.0.3
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

- [filter](#filter--top)
- [forEach](#foreach--top)
- [map](#map--top)

## Description

A small library providing asynchronous array methods for promises.


## Installation

### Browser
Just download the `PromiseList.min.js` and include it in an HTML `<script>` tag

eg:
```html
<script src="PromiseList.min.js"></script>
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

PromiseList(listOfPromises)
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


### filter ... ([top](#table-of-contents))

Works the same as the default `.filter` function.

```javascript
var myPromises = [promise1, promise2];
PromiseList(myPromises)
  .filter(function (value, index) {
    return value > 100;
  });
```

### forEach ... ([top](#table-of-contents))

Works the same as the default `.forEach` function.

```javascript
var myPromises = [promise1, promise2];
PromiseList(myPromises)
  .forEach(function (value, index) {
    // My code
  });
```

### map ... ([top](#table-of-contents))

Works the same as the default `.map` function.

```javascript
var myPromises = [promise1, promise2];
PromiseList(myPromises)
  .map(function (value, index) {
    return value.toLowerCase();
  });
```

***

## Tests

```
   1. Promise.List: map (undefined)...................................... ✅
   2. Promise.List: map (NaN)............................................ ✅
   3. Promise.List: forEach (should be).................................. ✅
   4. Promise.List: forEach (not be)..................................... ✅
   5. Promise.List: filter (not be)...................................... ✅
   6. Promise.List: filter (should be)................................... ✅
   7. Promise.List: map & filter (should be)............................. ✅
   8. Promise.List: map & filter (not be)................................ ✅
   9. Promise.List: map, filter & forEach (should be).................... ✅
  10. Promise.List: map, filter & forEach (should not be undefined)...... ✅
  11. Promise.List: map to promise....................................... ✅
```
