"use strict";function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function _objectSpread2(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(r,!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var r=[],n=!0,i=!1,o=void 0;try{for(var a,l=e[Symbol.iterator]();!(n=(a=l.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==l.return||l.return()}finally{if(i)throw o}}return r}}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}Object.defineProperty(exports,"__esModule",{value:!0});var DEFAULT_ATTRS={"slide-anim":"fadeleft","slide-duration":"0.5s","slide-anim-function":"ease-in-out","slide-delay":0,"slide-visibility":"full"},DEFAULT_CASCADE_ATTRS=_objectSpread2({},DEFAULT_ATTRS,{"slide-cascade-increment":"0.25s"}),setDefaultAttrs=function(){var o=document.querySelector("slide-settings"),a=window.getComputedStyle(document.body);Object.entries(DEFAULT_CASCADE_ATTRS).forEach(function(e){var t=_slicedToArray(e,2),r=t[0],n=(t[1],a.getPropertyValue(r.replace("slide-","--slide-default-")));if(n)DEFAULT_ATTRS[r]=n,DEFAULT_CASCADE_ATTRS[r]=n;else if(o){var i=o.attributes[r.replace("slide-","default-")];DEFAULT_ATTRS[r]=i.nodeValue,DEFAULT_CASCADE_ATTRS[r]=i.nodeValue}})},getSlideAttrs=function(e,n){var i=_objectSpread2({},e),o=window.getComputedStyle(n);return Object.keys(i).forEach(function(e){var t=n.attributes[e],r=o.getPropertyValue("--".concat(e));r?i[e]=r:t&&(i[e]=t.nodeValue)}),i},setAttributes=function(e,t){e.attributes.noslide?e.classList.add("noslide"):(e.setAttribute("slide-visibility",t["slide-visibility"]),e.classList.remove("noslide"),e.style["animation-play-state"]="paused",e.style["animation-fill-mode"]="forwards",e.style["animation-name"]=t["slide-anim"],e.style["animation-duration"]=t["slide-duration"],e.style["animation-delay"]=t["slide-delay"])},isVisible=function(e){var t=e.getBoundingClientRect(),r=t.top,n=t.bottom,i=e.getAttribute("slide-visibility").trim();if("full"===i)return 0<=r&&n<=window.innerHeight;if("partial"===i)return r<window.innerHeight&&0<=n;throw new Error("Unrecognized property for slide-visibility: ".concat(i))},shouldReveal=function(e){return"running"!==e.style["animation-play-state"]&&!e.attributes.noslide&&isVisible(e)},revealElements=function(e){var t=!0,r=!1,n=void 0;try{for(var i,o=e[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var a=i.value;shouldReveal(a)&&(a.style["animation-play-state"]="running")}}catch(e){r=!0,n=e}finally{try{t||null==o.return||o.return()}finally{if(r)throw n}}},initCascadeElems=function(){for(var e=[],t=0,r=Array.from(document.querySelectorAll("[slide-cascade]"));t<r.length;t++){var n=r[t],i=getSlideAttrs(DEFAULT_CASCADE_ATTRS,n),o=n.attributes.slide?1:0,a=!0,l=!1,s=void 0;try{for(var u,c=n.children[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){var d=u.value,y=getSlideAttrs(i,d);setAttributes(d,_objectSpread2({},y,{"slide-delay":"calc(".concat("0s"," + ").concat(o++," * ").concat(i["slide-cascade-increment"],")")})),e.push(d)}}catch(e){l=!0,s=e}finally{try{a||null==c.return||c.return()}finally{if(l)throw s}}}return e},initSlideChildrenElems=function(){for(var e=[],t=0,r=Array.from(document.querySelectorAll("[slide-children]"));t<r.length;t++){var n=r[t],i=getSlideAttrs(DEFAULT_ATTRS,n),o=!0,a=!1,l=void 0;try{for(var s,u=n.children[Symbol.iterator]();!(o=(s=u.next()).done);o=!0){var c=s.value,d=getSlideAttrs(i,c);setAttributes(c,d),e.push(c)}}catch(e){a=!0,l=e}finally{try{o||null==u.return||u.return()}finally{if(a)throw l}}}return e},initSlideElems=function(){for(var e=Array.from(document.querySelectorAll("[slide]")),t=0,r=e;t<r.length;t++){var n=r[t];setAttributes(n,getSlideAttrs(DEFAULT_ATTRS,n))}return e},update=function(){setDefaultAttrs();function e(){return revealElements(i)}var t=initCascadeElems(),r=initSlideChildrenElems(),n=initSlideElems(),i=[].concat(_toConsumableArray(t),_toConsumableArray(r),_toConsumableArray(n));e(),window.removeEventListener("scroll",e),window.addEventListener("scroll",e)};document.addEventListener("DOMContentLoaded",update),exports.update=update;