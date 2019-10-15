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

// Gets the slide attributes for an element, defaulting to
// those in `defaults` for whichever ones aren't present
const getSlideAttrs = (defaults, elem) => {
  const slideAttributes = { ...defaults }
  const style = window.getComputedStyle(elem)

  Object.keys(slideAttributes).forEach(k => {
    const htmlAttr = elem.attributes[k]
    const cssAttr = style.getPropertyValue(`--${k}`)

    if (htmlAttr) {
      slideAttributes[k] = htmlAttr.nodeValue
    }
    if (cssAttr) {
      slideAttributes[k] = cssAttr
    }
  })

  return slideAttributes
}

const setAttributes = (e, attrs) => {
  if (!e.attributes['noslide']) {
    e.classList.add('_slidein')

    e.style['animation-play-state'] = 'paused'
    e.style['animation-fill-mode']  = 'forwards'
    e.style['animation-name']       = attrs['slide-anim']
    e.style['animation-duration']   = attrs['slide-duration']
    e.style['animation-delay']      = attrs['slide-delay']
  }
}

const shouldReveal = e =>
  e.style['animation-play-state'] !== 'running' && !e.attributes['noslide'] && isVisible(e)

const revealElements = (elements) => {
  for (const e of elements) {
    if (shouldReveal(e)) {
      e.style['animation-play-state'] = 'running'
    }
  }
}

// If there is a <slide-settings> elem, use it to set default values
const setDefaultAttrs = () => {
  const slideSettings = document.querySelector('slide-settings')
  if (slideSettings) {
    // Use DEFAULT_CASCADE_ATTRS since it is a superset of DEFAULT_ATTRS
    Object.entries(DEFAULT_CASCADE_ATTRS).forEach(([attrName, value]) => {
      // For every slide- attribute, look for a corresponding
      // attribute in slide-settings, replacing 'slide-' with 'default-'
      const defaultAttr = slideSettings.attributes[attrName.replace('slide-', 'default-')]
      if (defaultAttr) {
        DEFAULT_ATTRS[attrName] = defaultAttr.nodeValue
        DEFAULT_CASCADE_ATTRS[attrName] = defaultAttr.nodeValue
      }
    })
  }
}

const initCascadeElems = () => {
  const cascadeElems = Array.from(document.querySelectorAll('[slide-cascade]'))
  const cascadeChildren = []

  for (const parent of cascadeElems) {
    const parentAttrs = getSlideAttrs(DEFAULT_CASCADE_ATTRS, parent)
    const initialDelay = '0s'
    let delays = parent.attributes['slide'] ? 1 : 0

    for (const child of parent.children) {
      const childAttrs = getSlideAttrs(parentAttrs, child)
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
    const parentAttrs = getSlideAttrs(DEFAULT_ATTRS, parent)

    for (const child of parent.children) {
      const childAttrs = getSlideAttrs(parentAttrs, child)
      setAttributes(child, childAttrs)
      slideChildren.push(child)
    }
  }

  return slideChildren
}

const initSlideElems = () => {
  const slideInElems = Array.from(document.querySelectorAll('[slide]'))
  for (const e of slideInElems) {
    setAttributes(e, getSlideAttrs(DEFAULT_ATTRS, e))
  }
  return slideInElems
}

document.addEventListener('DOMContentLoaded', () => {
  setDefaultAttrs()
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
