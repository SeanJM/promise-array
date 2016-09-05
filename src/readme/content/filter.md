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
