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

var _get = _curryr(function (obj, key) {
  return obj === null ? undefined : obj[key];
});

const _length = _get('length');

function _each(list, iter) {
  for (var i = 0; i < _length(list); i++) {
    iter(list[i]);
  }
  return list;
}

const slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo = 0) {
  _each(list, (val) => {
    memo = iter(memo, val);
  });

  return memo;
}

function _pipe() {
  const fns = arguments;
  return (arg) => _reduce(fns, (arg, fn) => fn(arg), arg);
}

function _go(arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

//const _map = _curryr(_map);
//const _filter = _curryr(_filter);
