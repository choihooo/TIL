---
title: "Understanding React Hooks"
date: "2024-11-11"
tags: ["React", "JavaScript", "Hooks"]
category:
  main: "Programming"
  sub: "React"
---

# React Hooks: An Introduction

React Hooks are a powerful feature introduced in React 16.8. They allow you to use state and other React features without writing a class.

## Why Hooks?

Hooks solve a wide range of issues:

1. They make it easier to reuse stateful logic.
2. They simplify complex components by breaking them down into smaller functions.
3. They work great with functional programming.

### Example of a Hook

Here's a quick example of the `useState` hook:

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```
