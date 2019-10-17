## Slidein.js [![npm](https://badge.fury.io/js/slidein.svg)](https://npmjs.com/package/slidein)

Painless, declarative slide-in-on-scroll animations. Without even a single line of javascript.

## Features
* Zero-dependency
* 2.2kb minified and gzipped, including CSS
* Convention over configuration. For the most basic use case you only have to write **5 characters**. But you can customize and extend slidein to your heart's content.
* Framework agnostic—use it anywhere!

## Basic example

#### HTML
```html
<div class='myclass' slide>
...
</div>

```
#### Result
![](./gifs/basic.gif)

## Getting Started

`npm install --save slidein`

Add these imports to your HTML:
```html
<link rel="stylesheet" type="text/css" href="./node_modules/slidein/slidein.css">
<script type="text/javascript" src='./node_modules/dist/slidein.js'></script>
```

If you prefer, because you are a classy ES6 expert, you can import the JS like this:

`import slidein from 'slidein'` (check to make sure this works?)

**However**, you should load your CSS **synchronously**. That may sound archaic, but it ensures your slide-in elements are properly hidden by the first paint—no flashing and then reappearing. Plus, the amount of CSS included in slidein is tiny.

## Usage

You can customize the animation, duration, and delay of the slide-in that happens when the user scrolls to the element:

```html
<div class='...' slide-duration='3s' slide-anim='fadetop' slide-delay='0.5s' slide>slidein.js</div>
```

![](./gifs/custom.gif)

You can set a **cascade**, which causes an element's children to slide in one after another:

```html
<!-- 1s between each element sliding in -->
<div class='...' slide-cascade-increment='1s' slide-cascade>
  <div class='...'>These...</div>
  <div class='...'>...should...</div>
  <div class='...'>...cascade!</div>
</div>
```
[](./gifs/cascade.gif)

Or simply set all an element's children to slidein, because DRY FTW:

```html
<!-- Child elements will inherit any slide- attributes of the parent -->
<!-- (They can also override them if need be) -->
<div class='...' slide-duration='1.5s' slide-children>
  <div class='...'>These should...</div>
  <div class='...'>...all slide in...</div>
  <div class='...'>...as soon as you see them.</div>
</div>
```
[](./gifs/children.gif)

You can also exclude children by adding the `noslide` property (see API below).

Slide properties can also be set using CSS variables, to prevent cluttering the HTML:

```css
.some-elem {
  --slide-anim: growleft;
  --slide-duration: 2s;
  --slide-delay: 0.5s;
}
```

But note that `slide`, `slide-children`, `slide-cascade`, or `noslide` **must** be set with an HTML attribute. This is due to performance constraints.

If the default animation properties you want differ from what slidein provides, you can change them:

```html
<!-- All slide elements will now default to the fadetop animation -->
<slide-setting default-anim='fadetop'></slide-settings>
```

```css
/* Alternatively, you can set CSS properties on the body. Same effect as above. */
body {
  --slide-default-anim: fadetop;
}
```

## API

[TODO]
