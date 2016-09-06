When an item in your list does not resolve, it will not trigger a `catch` callback. Instead, once all the items have been attempted, you will get 2 arguments passed to the `then` method.

The only error which will trigger the `catch` method is going to be if an invalid promise is passed to the constructor.
