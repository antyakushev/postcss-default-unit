# PostCSS Default Unit [![Build Status](https://travis-ci.org/antyakushev/postcss-default-unit.svg)](https://travis-ci.org/antyakushev/postcss-default-unit)

[PostCSS] plugin that adds a default unit to numeric css properties.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
    width: 200;
    margin: 0 auto 20;
    z-index: 1;
}
```

```css
.foo {
    width: 200px;
    margin: 0 auto 20px;
    z-index: 1;
}
```

## Usage

```js
postcss([ require('postcss-default-unit') ])
```

See [PostCSS] docs for examples for your environment.
