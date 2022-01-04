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
  // 첫 번째 값을 제외한 값
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

// 사용 예시
_go(
  users,
  (users) => _filter(users, (user) => user.age >= 30),
  (users) => _map(users, _get('name')),
  console.log
);

// 1. map, filter에 curryr 적용
const _map = _curryr(_map);
const _filter = _curryr(_filter);

// 2. 거의 method chaining 수준으로 축약 가능
_go(
  users,
  _filter((user) => user.age >= 30),
  _map(_get('name')),
  console.log
);
