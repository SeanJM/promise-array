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
