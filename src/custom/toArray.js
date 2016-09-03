function toArray(object) {
  var array = [];

  for (var k in object) {
    array.push(object[k]);
  }

  return array;
}
