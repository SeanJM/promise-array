# PromiseList
### Version: 0.1.0
### License: MIT
***
### Tests
<span style="display: inline-block; width: 100px; position: relative; height: 30px; background: rgb(220, 225, 236)"><span style="width: 1%; background: rgb(0, 195, 100); height : 100%;"></span><span style="width: 0%; background: rgb(195, 0, 100); height : 100%;"></span></span>

- Passed: 12
- Failed: 0
***
## Description
A small library providing asynchronous array methods for promises.

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

## Table of Contents (3)
- [filter](#filter-top)
- [forEach](#for-each-top)
- [map](#map-top)
***
## filter ([top](#table-of-contents))
Works the same as the default `.filter` function.

```javascript
var myPromises = [promise1, promise2];
PromiseList(myPromises)
  .filter(function (value, index) {
    return value > 100;
  });
```

## forEach ([top](#table-of-contents))
Works the same as the default `.forEach` function.

```javascript
var myPromises = [promise1, promise2];
PromiseList(myPromises)
  .forEach(function (value, index) {
    // My code
  });
```

## map ([top](#table-of-contents))
Works the same as the default `.map` function.

```javascript
var myPromises = [promise1, promise2];
PromiseList(myPromises)
  .map(function (value, index) {
    return value.toLowerCase();
  });
```
