# PostCSS Default Unit 
[![Build Status](https://travis-ci.org/antyakushev/postcss-default-unit.svg)][ci] [![NPM version](https://badge.fury.io/js/postcss-default-unit.svg)][npm] [![Dependency Status](https://gemnasium.com/antyakushev/postcss-default-unit.svg)][deps]


[PostCSS] plugin that adds a default unit to numeric css properties.


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

## Install

With [npm](https://npmjs.org/package/postcss-default-unit) do:

```
npm install postcss-default-unit --save
```

## Usage

By default `px` is used.
```js
postcss([ require('postcss-default-unit') ])
```
You can specify the desired unit.
```js
postcss([ require('postcss-default-unit')({unit: '%'}) ])
```

See [PostCSS] docs for examples for your environment.

## Issues

Now postcss-default-unit ignores expressions in parentheses. It won't mess up your `rgba` or `calc`, but it won't also add a unit to your `gradient`.

[ci]:       https://travis-ci.org/antyakushev/postcss-default-unit
[deps]:     https://gemnasium.com/antyakushev/postcss-default-unit
[npm]:      http://badge.fury.io/js/postcss-default-unit
[PostCSS]:  https://github.com/postcss/postcss