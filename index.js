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

// If there is a <slide-settings> or --slide-default CSS
// properties on the body, use them to set default values.
const setDefaultAttrs = () => {
  const slideSettings = document.querySelector('slide-settings')
  const bodyStyle = window.getComputedStyle(document.body)
  // Use DEFAULT_CASCADE_ATTRS since it is a superset of DEFAULT_ATTRS
  Object.entries(DEFAULT_CASCADE_ATTRS).forEach(([attrName, value]) => {
    // For every slide- attribute, look for a corresponding
    // attribute in slide-settings, replacing 'slide-' with 'default-',
    // or in the style of the body, replacing 'slide-' with '--slide-default-'.
    // CSS styles take a higher precendence than HTML attributes.
    const defaultAttrCSS = bodyStyle.getPropertyValue(attrName.replace('slide-', '--slide-default-'))
    if (defaultAttrCSS) {
      DEFAULT_ATTRS[attrName] = defaultAttrCSS
      DEFAULT_CASCADE_ATTRS[attrName] = defaultAttrCSS
    }
    else if (slideSettings) {
      const defaultAttrHTML = slideSettings.attributes[attrName.replace('slide-', 'default-')]
      DEFAULT_ATTRS[attrName] = defaultAttrHTML.nodeValue
      DEFAULT_CASCADE_ATTRS[attrName] = defaultAttrHTML.nodeValue
    }
  })
}

// Gets the slide attributes for an element, defaulting to
// those in `defaults` for whichever ones aren't present.
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

// Helper method to set animation properties on element e.
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

// Is the element visible in the viewport?
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

const shouldReveal = e =>
  e.style['animation-play-state'] !== 'running' && !e.attributes['noslide'] && isVisible(e)

// Reveal any elements that are in view.
const revealElements = (elements) => {
  for (const e of elements) {
    if (shouldReveal(e)) {
      e.style['animation-play-state'] = 'running'
    }
  }
}

// Set animation properties on children of elements who have a 'slide-cascade' property
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

// Set animation properties on children of elements who have a 'slide-children' property
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

// Set animation properties on elements who have a 'slide' property
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
