Works the same as the default `.filter` function.

```javascript
var myPromises = [promise1, promise2];
PromiseList(myPromises)
  .filter(function (value, index) {
    return value > 100;
  });
```
