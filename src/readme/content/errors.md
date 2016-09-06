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
