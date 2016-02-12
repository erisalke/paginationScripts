var i = 0
function assert(exp, is, name) {
  console.log("Test: "+ i+ ". "+ name+ " Result:"+ (exp===is))
  if (exp!==is)
    console.log("   ^^^ broken test")
  ++i
}

(function returns_an_array(){
  // Arrange
  var expected = true;
  var current = 1
  var all = 23

  var testee = require('./pagination');

  // Act
  var result = testee(23, 1)

  // Assert
  assert(expected, Array.isArray(result), arguments.callee.name)
})()

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

(function should_paginate_for_all_23_and_current_1(){
  // Arrange
  var expected =  [ 1, 2, 3, 4, 5, 6, '...', 23 ];
  var current = 1
  var all = 23

  var testee = require('./pagination');

  // Act
  var result = testee(all, current)

  // Assert
  assert(true, arraysEqual(result, expected), arguments.callee.name)
})()

function should_paginate_for_all_23_and_current_13(){
  // Arrange
  var expected = [ 1, '...', 11, 12, 13, 14, 15, '...', 23 ]
  var current = 13
  var all = 23

  var testee = require('./pagination');

  // Act
  var result = testee(all, current)

  // Assert
  assert(true, arraysEqual(result, expected), arguments.callee.name)
}
should_paginate_for_all_23_and_current_13()

function should_paginate_for_all_93_and_current_93(){
  // Arrange
  var expected = [ 1, '...', 88, 89, 90, 91, 92, 93 ]
  var current = 93
  var all = 93

  var testee = require('./pagination');

  // Act
  var result = testee(all, current)

  // Assert
  assert(true, arraysEqual(result, expected), arguments.callee.name)
}
should_paginate_for_all_93_and_current_93()


function should_paginate_for_all_5_and_current_2(){
  // Arrange
  var expected = [ 1, 2,3,4,5]
  var current = 2
  var all = 5

  var testee = require('./pagination');

  // Act
  var result = testee(all, current)

  // Assert
  assert(true, arraysEqual(result, expected), arguments.callee.name)
}
should_paginate_for_all_5_and_current_2()
