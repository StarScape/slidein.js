const DEFAULT_ATTRS = {
  'slide-anim': 'fadeleft',
  'slide-duration': '0.5s',
  'slide-anim-function': 'ease-in-out',
  'slide-delay': 0,
}

const DEFAULT_CASCADE_ATTRS = {
  ...DEFAULT_ATTRS,
  'slide-cascade-increment': '0.25s',
}

const isVisible = (el) => {
  const rect = el.getBoundingClientRect()
  const elemTop = rect.top
  const elemBottom = rect.bottom

  // Only completely visible elements return true:
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight)
  // Partially visible elements return true:
  // const isVisible = elemTop < window.innerHeight && elemBottom >= 0
  return isVisible;
}

// Takes a set of defaults (plain object) and a NamedNodeMap of HTML element attributes.
// Returns an object of all the 'slide-' attributes found in attrs, or their defaults.
const getSlideAttrs = (defaults, attrs) => {
  const slideAttributes = { ...defaults }

  Object.keys(slideAttributes).forEach(k => {
    if (attrs[k]) {
      slideAttributes[k] = attrs[k].nodeValue
    }
  })

  return slideAttributes
}

const setAttributes = (e, attrs) => {
  e.classList.add('slidein')

  e.style['animation-play-state'] = 'paused'
  e.style['animation-fill-mode']  = 'forwards'
  e.style['animation-name']       = attrs['slide-anim']
  e.style['animation-duration']   = attrs['slide-duration']
  e.style['animation-delay']      = attrs['slide-delay']
}

const revealElements = (elements) => {
  for (const e of elements) {
    if (e.style['animation-play-state'] !== 'running' && isVisible(e)) {
      e.style['animation-play-state'] = 'running'
    }
  }
}

const initCascadeElems = () => {
  const cascadeElems = Array.from(document.querySelectorAll('[slide-cascade]'))
  const cascadeChildren = []

  for (const parent of cascadeElems) {
    const parentAttrs = getSlideAttrs(DEFAULT_CASCADE_ATTRS, parent.attributes)
    const initialDelay = '0s'
    let delays = parent.attributes['slide'] ? 1 : 0

    for (const child of parent.children) {
      const childAttrs = getSlideAttrs(parentAttrs, child.attributes)
      setAttributes(child, {
        ...childAttrs,
        'slide-delay': `calc(${initialDelay} + ${delays++} * ${parentAttrs['slide-cascade-increment']})`
      })
      cascadeChildren.push(child)
    }
  }

  return cascadeChildren
}

const initSlideChildrenElems = () => {
  const slideChildrenElems = Array.from(document.querySelectorAll('[slide-children]'))
  const slideChildren = []

  for (const parent of slideChildrenElems) {
    const parentAttrs = getSlideAttrs(DEFAULT_ATTRS, parent.attributes)

    for (const child of parent.children) {
      const childAttrs = getSlideAttrs(parentAttrs, child.attributes)
      setAttributes(child, childAttrs)
      slideChildren.push(child)
    }
  }

  return slideChildren
}

const initSlideElems = () => {
  const slideInElems = Array.from(document.querySelectorAll('[slide]'))
  for (const e of slideInElems) {
    setAttributes(e, getSlideAttrs(DEFAULT_ATTRS, e.attributes))
  }
  return slideInElems
}

document.addEventListener('DOMContentLoaded', () => {
  const cascadedElems = initCascadeElems()
  const slideChildrenElems = initSlideChildrenElems()
  const slideElems = initSlideElems()

  const allElems = [
    ...cascadedElems,
    ...slideChildrenElems,
    ...slideElems
  ]

  const onScroll = () => revealElements(allElems)
  window.addEventListener('scroll', onScroll)
  onScroll()
})
