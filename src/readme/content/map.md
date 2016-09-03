Works the same as the default `.map` function.

```javascript
var myPromises = [promise1, promise2];
PromiseList(myPromises)
  .map(function (value, index) {
    return value.toLowerCase();
  });
```
