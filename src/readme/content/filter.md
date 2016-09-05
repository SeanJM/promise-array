Works the same as the default `.filter` function, with the exception that it can also return a `Promise`

```javascript
var myPromises = [promise1, promise2];
PromiseList(myPromises)
  .filter(function (value, index) {
    return value > 100;
  });
```

```javascript
PromiseList(myPromises)
  .map(function (value) {
    return new Promise(...)
  });
```
