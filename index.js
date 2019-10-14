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

const getSlideAttributes = (defaults, attr) => {
  const slideAttributes = { ...defaults }

  Object.keys(slideAttributes).forEach(k => {
    if (attr[k]) {
      slideAttributes[k] = attr[k].nodeValue
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
  for (let e of elements) {
    if (e.style['animation-play-state'] !== 'running' && isVisible(e)) {
      e.style['animation-play-state'] = 'running'
    }
  }
}

const initCascadeElems = () => {
  const cascadeElems = Array.from(document.querySelectorAll('[slide-cascade]'))
  const cascadeChildren = []

  for (let e of cascadeElems) {
    const attributes = getSlideAttributes(DEFAULT_CASCADE_ATTRS, e.attributes)
    const initialDelay = '0s'
    let delays = e.attributes['slide'] ? 1 : 0

    for (let child of e.children) {
      const childAttrs = getSlideAttributes(attributes, child.attributes)

      setAttributes(child, {
        ...childAttrs,
        'slide-delay': `calc(${initialDelay} + ${delays++} * ${attributes['slide-cascade-increment']})`
      })
      cascadeChildren.push(child)
    }
  }

  return cascadeChildren
}

const initSlideElems = () => {
  const slideInElems = Array.from(document.querySelectorAll('[slide]'))
  for (let e of slideInElems) {
    setAttributes(e, getSlideAttributes(DEFAULT_ATTRS, e.attributes))
  }
  return slideInElems
}

document.addEventListener('DOMContentLoaded', () => {
  const elems = [...initCascadeElems(), ...initSlideElems()]

  const onScroll = () => revealElements(elems)
  window.addEventListener('scroll', onScroll)
  onScroll()
})
