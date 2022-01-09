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

function _min(data) {
  // 두개의 값이 있다고 생각하고 프로그래밍
  return _reduce(data, (a, b) => {
    return a < b ? a : b;
  });
}

function _max(data) {
  // 두개의 값이 있다고 생각하고 프로그래밍
  return _reduce(data, (a, b) => {
    return a > b ? a : b;
  });
}

function _min_by(data, iter) {
  return _reduce(data, (a, b) => {
    return iter(a) < iter(b) ? a : b;
  });
}

// iter 조건을 data에 적용하였을때 가장 작은 값
function _max_by(data, iter) {
  return _reduce(data, (a, b) => {
    return iter(a) > iter(b) ? a : b;
  });
}

function _push(obj, key, val) {
  // 객체를 찾아지면 찾아지는 곳에 push, 없으면 빈 arr
  (obj[key] = obj[key] || []).push(val);

  return obj;
}

// 함수를 통해 어떤 방식으로 그룹화 할지 정한다
const _group_by = _curryr((data, iter) =>
  _reduce(data, (grouped, val) => _push(grouped, iter(val), val), {})
);

const _head = (list) => list[0];

//
const _inc = (count, key) => {
  count[key] ? count[key]++ : (count[key] = 1);

  return count;
};

const _count_by = _curryr((data, iter) =>
  _reduce(data, (count, val) => _inc(count, iter(val)), {})
);

const _pairs = _map((val, key) => [key, val]);

var _map = _curryr(_map),
  _each = _curryr(_each),
  _filter = _curryr(_filter),
  _find = _curryr(_find),
  _find_index = _curryr(_find_index),
  _min_by = _curryr(_min_by),
  _max_by = _curryr(_max_by),
  _reject = _curryr(_reject);
