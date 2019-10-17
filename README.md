# Slidein.js [![npm](https://badge.fury.io/js/slidein.svg)](https://npmjs.com/package/slidein)

Painless, declarative reveal-on-scroll animations. Without even writing a line of Javascript.

## Features
* Zero-dependency
* 2.2kb minified and gzipped, including CSS
* Convention over configuration. For the most basic use case you only have to write **5 characters**. But you can customize and extend to your heart's content.
* Framework agnostic—use it anywhere!

## Basic example

#### HTML
```html
<!-- This element will slide into view once the user scrolls to it -->
<div class='myclass' slide>
...
</div>

```
#### Result
![](./gifs/basic.gif)

## Getting Started

`npm install --save slidein`

Add these to your HTML:
```html
<link rel="stylesheet" type="text/css" href="./node_modules/dist/slidein.css">
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
  <div class='...' slide-anim='faderight'>...should...</div>
  <div class='...'>...cascade!</div>
</div>
```
![](./gifs/cascade.gif)

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
![](./gifs/children.gif)

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

### Attributes:

`slide`:

Registers the element with slidein to be revealed when it is visible. Must be set as an HTML attribute.

**HTML**: `<div slide></div>`

---

`noslide`:
Explicitly prevents an element from sliding in. Useful with `slide-cascade` or `slide-children`, when you want to slide in all but a few elements.

Must be set as an HTML attribute.

**HTML**: `<div noslide></div>`

---

`slide-children`:
Equivalent to setting `slide` on each of the element's immediate children. Any `slide-` properties will be passed on to the element's children, but they can also override them if need be.

Must be set as an HTML attribute.

**HTML**: `<div slide-children></div>`

---

`slide-cascade`:
Similar to `slide-children`, except that an increasing delay (configurable with `slide-cascade-increment`) will be added to each successive child element, giving them the appearance of sliding in one after the other. Like `slide-children`, any `slide-` properties will be passed on to the element's children.

Must be set as an HTML attribute.

**HTML**: `<div slide-cascade></div>`

---

### Slide-in options:

`slide-anim`: 
The animation to use when the element is revealed. Slidein.js comes pre-packaged with several animations (see below), but you can use any valid CSS animation here.

**HTML**: `<div slide-anim='my-custom-animation'></div>`

**CSS**: `.my-elem { --slide-anim: my-custom-animation; }`

**Default**: fadeleft

---

`slide-duration`:
The amount of time to take for the element's animation to play

**HTML**: `<div slide-duration='1s'></div>`

**CSS**: `.my-elem { --slide-duration: 1s; }`

**Default**: 0.5s

---

`slide-anim-function`:
The CSS animation timing function to use when the element slides in.

**HTML**: `<div slide-anim-function='linear'></div>`

**CSS**: `.my-elem { --slide-anim-function: linear; }`

**Default**: ease-in-out

---

`slide-delay`:
The amount of time to wait **after** the element becomes visible before playing its reveal animation.

**HTML**: `<div slide-delay='1s'></div>`

**CSS**: `.my-elem { --slide-anim-delay: 1s; }`

**Default**: 0

---

`slide-visibility`:
By default, slidein.js will reveal your element when it is **fully** in the user's viewport. However, by changing this setting to 'partial', it will reveal when only part of the element is visibile.

**HTML**: `<div slide-visibility='partial'></div>`

**CSS**: `.my-elem { --slide-visibility: partial; }`

**Default**: full

---

`slide-cascade-increment`:
The interval between each of the children of a `slide-cascade`-marked element sliding in.

**HTML**: `<div slide-cascade-increment='0.5s'></div>`

**CSS**: `.my-elem { --slide-cascade-increment: 0.5s; }`

**Default**: 0.25s

---

### Built-in Animation Functions

`fadeleft`: fades the element in from the left

`faderight`: fades the element in from the right

`fadetop`: fades the element in from the top

`fadebottom`: fades the element in from the bottom

`growleft`: makes an element grow in from the left

`growright`: makes an element grow in from the right

`growtop`: makes an element grow in from the top

`growbottom`: makes an element grow in from the bottom

### Setting Defaults

If you don't like slidein's default settings, you can control them in one of two ways.

First, by putting a `slide-settings` element somewhere in your HTML:

```html
<slide-settings
  <!-- Any of the above settings' defaults can be changed, just replace 'slide-' with 'default-' -->
  default-visibility='partial'
></slide-settings>
```

Or by setting custom styles on the `body`.

```css
/* Slidein.js will only look for these on the `body` node, so don't put them anywhere else */
body {
  /* Just use the --slide-default- prefix, and you can set defaults for any attribute */
  --slide-default-visibility: partial;
  /* This website's users better be patient.... */
  --slide-default-duration: 60s;
}
```

It's worth noting that custom CSS variables are inherited, so technically you could just set `--slide-whatever` on the body and call it a day. But the above syntax makes it a bit more explicit. 

### Usage with a Framework

Slidein is written in vanilla JS and should work in any web browser that supports attribute selectors and CSS animations. It can be paired with any framework you like.

**However**, there is one gotcha. By default, slidein looks for `slide` elements once the DOM is loaded. If you add more `slide` elements to the DOM post-load (which, if you're using React or a similar component-based library, is pretty likely), you'll need to call slidein's `update` method to register them.

#### Example

```javascript
import slidein from 'slidein'

class MyFancyComponent extends TheNextBigThingJS.Component {
  /*
   *  ...
   *  Some code that adds a `slide` element to the DOM
   *  ...
   */

  onceEverythingIsRendered() {
    slidein.update() // tell slidein to look for new elements
  }
}
````

### Contributing

Contributions welcome. If you have a potential improvement in mind, open an issue to talk about it.
