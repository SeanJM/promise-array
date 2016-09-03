const TinyTest = require('../grunt/lib/tinyTest');

module.exports = new TinyTest(function (test) {

  // Postive test
  test(
    // Name of the test
  )
    .this(
      // value to test
    )
    .shouldBe(
      // Result
    );

  // Negative test
  test(
    // Name of the test
  )
    .this(
      // value to test
    )
    .shouldNotBe(
      // Result
    );

});
