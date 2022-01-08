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

function _is_object(obj) {
  return typeof obj === 'object' && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}
const _length = _get('length');

function _each(list, iter) {
  var keys = _keys(list); //keys는 배열이건 오브젝트건간에 배열을 반환

  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i]);
  }

  return list;
}

var _map = _curryr(_map),
  _each = _curryr(_each),
  _filter = _curryr(_filter),
  _find = _curryr(_find),
  _find_index = _curryr(_find_index);

var slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function (val) {
    memo = iter(memo, val);
  });
  return memo;
}

function _pipe() {
  var fns = arguments;
  return function (arg) {
    return _reduce(
      fns,
      function (arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

function _go(arg) {
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

const _values = _map(_identity);

function _identity(val) {
  return val;
}

function _pluck(data, key) {
  return _map(data, _get(key));
}

function _negate(func) {
  return (val) => !func(val);
}

function _reject(data, predi) {
  return _filter(data, _negate(predi));
}

const _compact = _filter(_identity);

function _find(list, predi) {
  var keys = _keys(list);

  for (var i = 0; i < keys.length; i++) {
    const value = list[keys[i]];

    if (predi(value)) return value;
  }
}

function _find_index(list, predi) {
  var keys = _keys(list);

  for (var i = 0; i < keys.length; i++) {
    if (predi(list[keys[i]])) return i;
  }
}

// 하나라도 찾아지는 것이 있으면 true
function _some(data, predi) {
  predi = predi || _identity; // predi 없는 경우

  return _find_index(data, predi) !== -1;
}

// 모든 것이 조건을 만족해야 true
function _every(data, predi) {
  predi = predi || _identity; // predi 없는 경우

  return _find_index(data, _negate(predi)) !== -1;
}
