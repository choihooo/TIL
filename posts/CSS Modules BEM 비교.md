---
title: "CSS Modules BEM 비교"
date: "2025-01-05"
tags: ["CSS", "SCSS", "style"]
category:
  main: "dev"
  sub: ""
thumbnail: "/images/CSSmodule/thumbnail.webp"
---

웹 개발에서 스타일을 적용하는 방식은 프로젝트의 크기와 복잡도에 따라 달라다. 일반 CSS에서 시작해 CSS Modules, 그리고 CSS Modules와 BEM까지 다양한 방법이 있다. 각 방식은 장단점이 있으며, 상황에 따라 적절한 방법을 선택하는 것이 중요하다.

# 1. 일반 CSS 또는 SCSS (.css / .scss)

**특징**

- 스타일은 전역으로 적용된다.
- 하나의 스타일 파일에서 모든 스타일을 관리하며, 클래스 이름이 중복될 경우 충돌이 발생할 수 있다.
- 파일의 크기가 커질수록 유지보수가 어렵고, 특정 컴포넌트에만 스타일을 적용하는 것이 어렵다.

```scss
.button {
  background-color: blue;
  color: white;
}
```

```html
<button class="button">Click me</button>
```

위와 같이 작성된 CSS는 프로젝트 내 모든 button 클래스에 적용된다. 동일한 클래스를 다른 파일에서 다시 정의하면 기존 스타일이 덮어쓰기 된다.

**장점**

- 설정이 간단하고 빠르게 작성할 수 있다.
- 소규모 프로젝트에서 적합하다.

**단점**

- 전역 스타일로 인해 스타일 충돌이 발생할 수 있다.
- 대규모 프로젝트에서는 유지보수가 어렵다.

# 2. CSS Modules (.module.css / .module.scss)

CSS Modules는 스타일 충돌 문제를 해결하기 위해 도입된 기술이다. 파일 확장자에 .module.scss를 사용하여 스타일을 컴포넌트별로 격리시킨다.

**특징**

- 모든 스타일이 로컬 스코프(Local Scope)로 설정된다.
- 클래스 이름이 자동으로 해시 처리되어 동일한 클래스명을 사용해도 충돌이 발생하지 않는다.
- React, Vue 등 컴포넌트 기반 프레임워크에서 자주 사용된다.

**예시**

```scss
.button {
  background-color: blue;
  color: white;
}
```

```jsx
import styles from "./Button.module.scss";

function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

위 코드는 HTML에서 다음과 같이 출력된다.

```html
<button class="Button_button__1a2b3">Click me</button>
```

클래스명에 ==(파랑)1a2b3==과 같은 고유한 해시가 추가되며, 스타일이 컴포넌트 내부에서만 적용된다.

**장점**

- 스타일 충돌이 발생하지 않는다.
- 컴포넌트 단위로 스타일을 쉽게 관리할 수 있다.
- 대규모 프로젝트에서도 유지보수가 쉽다.

**단점**

- 전역 스타일을 관리하는 것이 어렵다.
- 파일마다 ==(파랑)import== 해야 하는 번거로움이 있다.

# 3. CSS Modules + BEM (.module.scss + BEM)

CSS Modules와 BEM은 서로 다른 문제를 해결하지만, 함께 사용하면 보다 체계적인 방법이 된다.

BEM은 CSS 클래스 네이밍 규칙을 정의하여 명확하고 일관된 방식으로 스타일을 작성할 수 있다. 여기에 CSS Modules를 결합하면 컴포넌트 단위의 캡슐화된 구조와 명확한 네이밍을 동시에 구현할 수 있다.

**특징**

- CSS 모듈의 로컬 스코프와 BEM의 체계적인 네이밍 규칙을 사용한다.
- 컴포넌트 내에서 명확한 구조를 갖는 클래스명을 사용해 스타일을 관리한다.

**예시**

```scss
.button {
  background-color: blue;
  color: white;

  &__icon {
    margin-right: 8px;
  }

  &--primary {
    background-color: #3498db;
  }

  &--secondary {
    background-color: #e74c3c;
  }
}
```

```jsx
import styles from "./Button.module.scss";

function Button({ variant }) {
  return (
    <button className={`${styles.button} ${styles[`button--${variant}`]}`}>
      <span className={styles.button__icon}>➕</span> Click me
    </button>
  );
}
```

컴파일 후 결과는 다음과 같다.

```html
<button class="Button_button__1a2b3 Button_button--primary__1a2b3">
  <span class="Button_button__icon__1a2b3">➕</span> Click me
</button>
```

**장점**

- BEM 덕분에 스타일 구조가 명확해진다.
- CSS Modules로 인해 스타일 충돌이 방지된다.

**단점**

- 네이밍 규칙을 지켜야 하므로 작성이 다소 번거롭다.
- 설정이 복잡해질 수 있다.

---

### 4. 세 가지 방식 비교

| 구분                          | 일반 CSS(.scss) | CSS Modules(.module.scss) | CSS Modules + BEM  |
| ----------------------------- | --------------- | ------------------------- | ------------------ |
| **스타일 적용 범위**          | 전역 (Global)   | 로컬 (Local Scope)        | 로컬 (Local Scope) |
| **스타일 충돌 가능성**        | 높음            | 없음                      | 없음               |
| **가독성 및 구조화**          | 낮음            | 중간                      | 높음               |
| **유지보수성**                | 낮음            | 중간                      | 높음               |
| **컴포넌트 단위 스타일 관리** | 어렵다          | 쉽다                      | 매우 쉽다          |
| **설정 및 복잡도**            | 간단            | 약간 복잡                 | 복잡               |

---

### 5. 어떤 방식을 선택해야 할까?

- **소규모 프로젝트**: 일반 CSS(SCSS)를 사용하는 것이 가장 간단하다.
- **중규모 프로젝트**: CSS Modules를 사용해 스타일 충돌을 방지하고 유지보수를 쉽게 한다.
- **대규모 프로젝트**: CSS Modules와 BEM을 결합해 체계적인 구조와 스타일을 동시에 관리한다.

그리고 또한 전역 스타일 파일은 일반 CSS(SCSS)를 사용한다.

적재적소에 맞는 방식을 선택하여 사용하도록 하자.
