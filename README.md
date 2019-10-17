## slidein.js
[TODO: npm link boxes]
Painless, declarative slide-in-on-scroll animations. You don't even have to write a single line of Javascript.

## Features
* Zero-dependency
* 2.6kb minified and gzipped, including CSS [CHECK]
* Convention over configuration—for the most basic use case you only have to write **5 characters**. But you can customize and extend slidein to your heart's content.
* Framework agnostic—use it anywhere!

## Basic example

#### HTML
```html
<div class='myclass' slide>
...
</div>

```
#### Result
[TOOD: add GIF]

## Getting Started

`npm install --save slidein`

Add these imports to your HTML:
```html
<link rel="stylesheet" type="text/css" href="./node_modules/slidein/slidein.css">
<script type="text/javascript" src='./node_modules/dist/slidein.js'></script>
```

If you prefer, because you are a classy ES6 expert, you can import the JS like this:

`import slidein from 'slidein'` (check to make sure this works?)

**However**, you should load your CSS **synchronously**. That may sound archaic, but that will ensure your slide-in elements are properly hidden by the first paint—no flashing and then reappearing. And the amount of CSS included in slidein is tiny.

## Usage

You can customize the animation, duration, and delay of the slide-in that happens when the user scrolls to the element:

[EXAMPLE]
[RESULT]

You can set a **cascade**, which causes an element's children to slide in one after another:

[EXAMPLE]
[RESULT]

Or simply set all an element's children to slidein, because DRY FTW:

[EXAMPLE]
[RESULT]

Slide properties can also be set using CSS variables, to prevent cluttering the HTML too much:

[EXAMPLE]
[RESULT]

But note that `slide`, `slide-children`, `slide-cascade`, or `noslide` **must** be set with an HTML attribute. This is due to performance constraints.

If the default animation properties you want differ from what slidein provides, you can change them:

[EXAMPLE - HTML then CSS]
[RESULT]

## API

[TODO]
