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
