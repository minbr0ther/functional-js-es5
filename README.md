# 함수형 프로그래밍 (ES5)

2021년 12월 27일 [https://www.youtube.com/watch?v=4sO0aWTd3yc](https://www.youtube.com/watch?v=4sO0aWTd3yc)

# **섹션 1. 함수형 프로그래밍 개요**

## 함수형 프로그래밍 정의, 순수함수

![Untitled](./images/Untitled.png)

순수 함수

- 부수 효과가 없는 함수

모듈화 수준이 높다

- 생산성을 높인다

## 일급함수, add_maker, 함수로 함수 실행하기

```jsx
const f1 = (a) => a * a;
console.log(f1);
```

```jsx
// 함수를 받아서 실행시켜서 결과를 확인하는 함수

const f3 = f => return f();
console.log(f3(function() { return 10; })); // 10
```

```jsx
// 일급 함수와 클로져를 사용한 예제

function add_maker(a) {
	return funciton(b) { // closure function
		return a + b;
	}
}

const add10 = add_maker(10);
console.log( add10(20) ); // 30
```

```jsx
// 함수형 프로그래밍의 기본예제
// 순수한 함수들을 조합하고 출력을하여
// 평가 시점과 평가 로직의 사이에서 결정할 것인지 판단하여 큰 로직을 만들어감
// 비동기를 다루기 쉬움

function f4(f1, f2, f3) {
  return f3(f1() + f2());
}

console.log(
  // 9
  f4(
    function () {
      return 2;
    },
    function () {
      return 1;
    },
    function (a) {
      return a * a;
    }
  )
);
```

## 요즘 개발 이야기, 함수형 프로그래밍 정의

![Untitled](<%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE%E1%84%92%E1%85%A7%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%84%86%E1%85%B5%E1%86%BC%20(ES5)%203f75bd84268b43379e1e2b66e8ab2492/Untitled%201.png>)

고가용성: 절대 죽지 않는 서비스 (페이스북은 점검 시간 없다)

OTP Supervisor: 죽으면 바로 살리는 서비스

### 스멀스멀 다가오는 FP

- 좋아지는 하드웨어 성능
- 좋아지는 컴파일러
- 함수형 프로그래밍 기술
- 좋아지는 분산 / 리액티브 환경
- 동시성 + 병렬성 관련 기술

![Untitled](<%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE%E1%84%92%E1%85%A7%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%84%86%E1%85%B5%E1%86%BC%20(ES5)%203f75bd84268b43379e1e2b66e8ab2492/Untitled%202.png>)

![Untitled](<%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE%E1%84%92%E1%85%A7%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%84%86%E1%85%B5%E1%86%BC%20(ES5)%203f75bd84268b43379e1e2b66e8ab2492/Untitled%203.png>)

함수가 먼저나오냐, 객체가 먼저 나오냐에 따라서 함수 혹은 객체 프로그램을 판단할 수 있음

명령형에서 함수형으로

어떻게 전환해 왔는가?

# 섹션 2. 함수형으로 전환하기

## 회원 목록, map, filter

```jsx
// 응용형 함수, 적용형 프로그래밍
// 함수가 함수를 받아서 원하는 시점에 해당하는
// 함수가 알고있는 인자를 적용하는식으로 프로그래밍 함

function _filter(list, predi) {
  const new_list = [];
  for (var i = 0; i < list.length; i++) {
    if (predi(list[i])) {
      new_list.push(list[i]);
    }
  }

  return new_list;
}
```

```jsx
function _map(list, mapper) {
  const new_list = [];
  for (var i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i].name));
  }

  return new_list;
}
```

![Untitled](<%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE%E1%84%92%E1%85%A7%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%84%86%E1%85%B5%E1%86%BC%20(ES5)%203f75bd84268b43379e1e2b66e8ab2492/Untitled%204.png>)

위와 같이 대입문을 쓰지 않으면 코드가 간결해짐

안정성 높고 완성도 높은 코드 작성 가능

## each

```jsx
function _each(list, iter) {
  Array.from({ length: list.length }, (v) => iter(v));
  return list;
}
```

위의 함수를 \_map, \_filter 에서 사용한다

## 다형성

`map`, `filter`, `each` 등의 함수는 원래 js 에 있는 함수이다

위의 함수들은 객체지향 메서드이다. (Array 에서만 사용 가능)

메서드의 특징은 해당 클래스 에서만 사용할 수 있다.

즉 다형성을 지원하기 어렵다.

![Untitled](<%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE%E1%84%92%E1%85%A7%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%84%86%E1%85%B5%E1%86%BC%20(ES5)%203f75bd84268b43379e1e2b66e8ab2492/Untitled%205.png>)

⇒ Array like 객체이기 때문에 `.map` 사용 불가

### 함수형 프로그래밍

높은 다형성, 실용적임, 유연성

![Untitled](<%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE%E1%84%92%E1%85%A7%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%84%86%E1%85%B5%E1%86%BC%20(ES5)%203f75bd84268b43379e1e2b66e8ab2492/Untitled%206.png>)

⇒ 우리가 만든 `_map` 함수로 실행하면 잘 동작함

⇒ 함수자체는 혼자 먼저 존재하므로 평가 시점이 훨씬 유연함 (객체 지향 보다)

### 내부 다형성

`predi`, `iter`, `mapper` 이런 것들은 꼭 ‘콜백 함수’ 라고 부를 수 없다.

각각에 역할에 맞는 보조 함수의 이름을 불러주는게 이해를 돕는다.

- predi : 조건을 return 하는 함수
- iter : 돌면서 반복적으로 실행되는 함수
- mapper : 무언가 무언가 사이를 매핑하는 함수

### 커링, curry, curryr

인자를 적용한 상태에서 하나를 더 적용하는 느낌

원하는 시점까지 미뤄 두었다가 최종적으로 평가한다

```jsx
function _curry(fn) {
  return function (a) {
    // add(2,3) 을 가능하게 해주는 if 문
    // 3항 연산자로 압축 가능
    if (arguments.length == 2) fn(a, b);

    return function (b) {
      return fn(a, b);
    };
  };
}

const add = _curry(function (a, b) {
  return a + b;
});

console.log(add(5)(3));
```

```jsx
// 역으로 curry로 진행함
// curry + right => curryr
function _curryr(fn) {
  return function (a) {
    if (arguments.length == 2) fn(b, a);

    return function (b) {
      return fn(b, a);
    };
  };
}

const sub = _curryr(function (a, b) {
  return a - b;
});

const sub10 = sub(10);
console.log(sub10(5)); // 5 - 10 = -5
```

```jsx
function _get(obj, key) {
  return obj === null ? undefined : obj[key];
}

// undefined 처리를 해준다 => 안전함
console.log(_get(user1, 'name'));
```

```jsx
// curryr 사용
const _get = _curryr(function (obj, key) {
  return obj === null ? undefined : obj[key];
});

console.log(_get('name')(users1));
```

![Untitled](<%E1%84%92%E1%85%A1%E1%86%B7%E1%84%89%E1%85%AE%E1%84%92%E1%85%A7%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%84%86%E1%85%B5%E1%86%BC%20(ES5)%203f75bd84268b43379e1e2b66e8ab2492/Untitled%207.png>)

전에 구현해 두었던 함수에서 \_get으로 대체하여 코드를 줄일 수 있었음

## reduce

```jsx
function _reduce(list, iter, memo) {
  // 이런 작동방식으로 구성
  iter(iter(iter(iter(0, 1), 2), 3), 4);
}

console.log(_reduce([1, 2, 3], (a, b) => a + b, 0));
```

```jsx
function _reduce(list, iter, memo) {
  // 우리는 each를 구현해 두었기 때문에 빨리 만들 수 있다
  _each(list, (val) => {
    memo = iter(memo, val);
  });

  return memo;
}

console.log(_reduce([1, 2, 3], (a, b) => a + b, 0)); //6
```

## 파이프라인, \_go, \_pipe, 화살표 함수

`pipe()` 는 함수를 연속적으로 실행해주는 함수

```jsx
function _pipe() {
  const fns = arguments;
  return (arg) => _reduce(fns, (arg, fn) => fn(arg), arg);
}

const f1 = _pipe(
  (a) => a + 1,
  (a) => a * 2
);

console.log(f1(1)); //4
```

`go()` 는 `pipe()` 의 즉시 실행 버전

```jsx
function _go(arg) {
  // 첫 번째 값을 제외한 값
  const fns = _rest(arguments);

  return _pipe.apply(null, fns)(arg);
}

_go(
  1,
  function (a) {
    return a + 1;
  },
  function (a) {
    return a * 2;
  },
  function (a) {
    return a * a;
  },
  console.log
); // 16
```

```jsx
// before 코드의 중복도 보이고 좋지 않음
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
```

## 다형성 높이기, \_keys, 에러

### null 에러 처리

```jsx
var _get = _curryr(function (obj, key) {
  return obj === null ? undefined : obj[key];
});

// 이 함수 처럼 null의 예외처리를 다른 함수들도 해줄 예정이다
```

```tsx
const _length = _get('length');

function _each(list, iter) {
  for (var i = 0; i < _length(list); i++) {
    iter(list[i]);
  }
  return list;
}

_each(null, console.log); // 더이상 에러가 나지 않는다
console.log(
  _map(null, function (v) {
    return v;
  })
); // map도 each를 쓰기 때문에 null을 넣으면 [] 리턴
```

\_(underscore liblary) 에서도 위와 비슷한 처리를 함

null exception 에러는 아주 치명적인 에러 🚨

### each 다형성 높이기

```tsx
function _is_object(obj) {
  return typeof obj === 'object' && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}
const _length = _get('length');

function _each(list, iter) {
  var keys = keys(list); //keys는 배열이건 오브젝트건간에 배열을 반환

  for (var i = 0; i < keys.length; i++) {
    iter(list[i]);
  }
  return list;
}
```

코드를 위와 같이 고친 덕분에

- \_each에 object를 넣어도 동작할 수 있게 하였다
- \_each를 사용하는 \_map, \_filter, \_reduce 도 동시 적용
