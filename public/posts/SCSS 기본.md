---
title: "SCSS 기본"
date: "2025-01-05"
tags: ["SCSS", "CSS", "스타일링"]
category:
  main: "dev"
  sub: ""
thumbnail: "/images/SCSS 기본/thumbnail.webp"
---

SCSS는 Sass의 문법 중 하나로, CSS를 더욱 효율적으로 작성할 수 있도록 도와주는 CSS 전처리기이다.

기존 CSS와 거의 유사한 문법을 사용하지만, 중첩, 변수, 믹스인, 함수 등 다양한 기능을 제공한다.

코드를 모듈화하고, 유지 보수하는데 장점이 있다.

# 주석

SCSS에서는 두 가지 방식으로 주석을 사용할 수 있다.

```scss
// 한 줄 주석 -> 컴파일 시 사라짐
/* 여러 줄 주석 -> 컴파일 시 유지 */
```

# 중첩

SCSS에서는 중첩을 통해 계층 구조를 직관적으로 표현할 수 있다.

```scss
.container {
 ul {
  li {
	  font-size: 40px;
	  .name {
		  color: royalblue;
		}
		.age {
			color: orange;
		}
	}
}
```

```css
.container ul li {
  font-size: 40px;
}
.container ul li .name {
  color: royalblue;
}
.container ul li .age {
  color: orange;
}
```

# & - 상위 선택자 참조

& 기호는 중첩된 구조에서 상위 선택자를 참조하는 데 사용된다.

```scss
// & - 상위 선택자 참조

.btn {
  position: absolute;
  &.active {
    color: red;
  }
}

.list {
  li {
    &:last-child {
      margin-right: 0;
    }
  }
}
```

```css
.btn {
  position: absolute;
}

.btn.active {
  color: red;
}

.list li:last-child {
  margin-right: 0;
}
```

## 중첩과 상위 선택자 참조의 차이점

![중첩과 상위 선택자 참조의 차이점](/images/SCSS%20기본/1.png)

### 예시로 차이 확인하기

```html
<div class="container">
  <ul>
    <li class="name">John</li>
    <li class="age">30</li>
  </ul>
</div>

<button class="btn active">Click Me</button>
```

```scss
.container {
  ul {
    li {
      font-size: 16px;
      &.name {
        color: royalblue;
      }
      &.age {
        color: orange;
      }
    }
  }
}

.btn {
  position: absolute;
  &.active {
    color: red;
  }
}
```

# 중첩된 속성

선택만 중첩할 수 있는게 아니라, 속성에서도 중첩을 이용할 수 있어 반복을 줄이고 가독성을 높인다.

```scss
// 중첩된 속성
.box {
  font: {
    weight: bold;
    size: 10px;
    family: sans-serif;
  }
  margin: {
    top: 10px;
    left: 20px;
  }
  padding: {
    top: 10px;
    bottom: 40px;
    left: 20px;
    right: 30px;
  }
}
```

```css
.box {
  font-weight: bold;
  font-size: 10px;
  font-family: sans-serif;
  margin-top: 10px;
  margin-left: 20px;
  padding-top: 10px;
  padding-bottom: 40px;
  padding-left: 20px;
  padding-right: 30px;
}
```

# 변수

변수를 사용해 재사용성을 높이고, 유지보수를 쉽게 할 수 있다.

```scss
// 변수 (Variables)
.container {
  $size: 200px;
  position: fixed;
  top: $size;

  .item {
    $size: 100px;
    width: $size;
    height: $size;
    transform: translateX($size);
  }

  left: $size;
}
```

```css
.container {
  position: fixed;
  top: 200px;
  left: 100px;
}

.container .item {
  width: 100px;
  height: 100px;
  transform: translateX(100px);
}
```

# 연산

```scss
div {
  $size: 30px;
  width: $size + 20px;
  height: 40px - 10px;
  font-size: 10px * 2;
  margin: (10px + 12px) / 2; // 나누기는 괄호로 감싸줘야 제대로된 출력값을 얻을 수 있다.
  padding: 20px % 7;
}

span {
  font-size: 10px;
  line-height: 10px;
  font-family: serif;
  font: 10px / 10px serif;
}
```

```css
div {
  width: 40px;
  height: 30px;
  font-size: 20px;
  margin: 11px;
  padding: 6px;
}

span {
  font-size: 10px;
  line-height: 10px;
  font-family: serif;
  font: 10px/10px serif; /* 출력값에 오류 */
}
```

# mixin

반복되는 스타일을 정의해 필요할때 재사용 가능하다.

## 기본 문법

```scss
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include center;

  .item {
    @include center;
  }
}

.box {
  @include center;
}
```

## 매개변수

```scss
@mixin box($size: 80px, $color: tomato) {
  width: $size;
  height: $size;
  background-color: $color;
}

.container {
  @include box(200px, red);

  .item {
    @include box($color: green);
  }
}

.box {
  @include box;
}
```

## 재활용 @content

```scss
@mixin left-top {
  position: absolute;
  top: 0;
  left: 0;
  @content;
}

.container {
  width: 100px;
  height: 100px;
  @include left-top;
}

.box {
  width: 200px;
  height: 300px;
  @include left-top {
    bottom: 0;
    right: 0;
    margin: auto;
  } // 컨텐트 내용에 대괄호 내용이 들어감
}
```

# 반복문

반복문을 사용해 여러 개의 스타일을 동적으로 생성할 수 있다.

```scss
@for $i from 1 through 10 {
  .box:nth-child(#{$i}) {
    width: 100px * $i;
  }
}
```

## @each

### map

```scss
$map: (
  primary: #3498db,
  success: #2ecc71,
  warning: #f1c40f,
  danger: #e74c3c,
);

@each $key, $value in $map {
  .btn-#{$key} {
    background-color: $value;
  }
}
```

### list

```scss
$list: red, blue, green;

@each $color in $list {
  .text-#{$color} {
    color: $color;
  }
}
```

# 함수

```scss
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@function ratio($size, $ratio) {
  @return $size * $ratio;
}

.box {
  $width: 160px;
  width: $width;
  height: ratio($width, 9 / 16);
  @include center;
}
```

# 색상 관련 내장 함수

```scss
$base-color: #3498db; // 파란색
.light {
  background-color: lighten($base-color, 20%);
}
.dark {
  background-color: darken($base-color, 20%);
}
.saturated {
  // 채도 증가
  background-color: saturate($base-color, 30%);
}
.desaturated {
  // 채도 감소
  background-color: desaturate($base-color, 30%);
}
.adjust-hue {
  // 색상의 색조 조정
  background-color: adjust-hue($base-color, 45deg);
}
$color1: #3498db;
$color2: #e74c3c;
.mixed {
  // 색상 믹스
  background-color: mix($color1, $color2, 50%);
}
.inverted {
  background-color: invert($base-color);
}
.gray {
  background-color: grayscale($base-color);
}
.transparent {
  background-color: rgba($base-color, 0.5);
}
.complement {
  // 보색 변환
  background-color: complement($base-color);
}
```

## invert와 complement 차이

![invert와 complement 차이](/images/SCSS%20기본/2.webp)

# 가져오기

```scss
@import "파일 경로" // .scss 안 붙여도 됨
  @import "파일 경로", "파일 경로"; // 이렇게 연달아도 됨
```

# 데이터 종류

```scss
$number: 1; // .5, 100px, 1em
$string: bold; // relative, "../images/a.png"
$color: red; // blue, #FFFF00, rgba(0,0,0,.1)
$boolean: true; // false
$null: null;
$list: orange, royalblue, yellow;
$map: (
  o: orange,
  r: royalblue,
  y: yellow,
);
```

# 마치며

내가 느끼기에는 테일윈드보다 더 간편하다고 느꼈다. 전에 올린 BEM과 결합하면 더 좋은 클래스 네임을 가지고 가독성 좋은 코딩을 할 수 있을 거 같다.

```scss
.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  border: none;

  &--primary {
    background-color: #3498db;
    color: white;
  }

  &--secondary {
    background-color: #e74c3c;
    color: white;
  }

  &__icon {
    margin-right: 8px;
  }
}
```

```html
<button class="button button--primary">
  <span class="button__icon">🔍</span> 검색
</button>

<button class="button button--secondary">
  <span class="button__icon">➕</span> 추가
</button>
```
