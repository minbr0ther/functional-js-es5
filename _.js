function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b);
        };
  };
}

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a);
        };
  };
}

function _filter(list, predi) {
  var new_list = [];
  _each(list, function (val) {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}

function _map(list, mapper) {
  var new_list = [];
  _each(list, function (val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

var _get = _curryr(function (obj, key) {
  return obj === null ? undefined : obj[key];
});

/*
const slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}
*/

function _reduce(list, iter, memo = 0) {
  _each(list, (val) => {
    memo = iter(memo, val);
  });

  return memo;
}

console.log(_reduce([1, 2, 3], (a, b) => a + b)); //6
