const DEFAULT_ATTRS = {
  'slide-anim': 'fadeleft',
  'slide-duration': '0.5s',
  'slide-anim-function': 'ease-in-out',
  'slide-delay': 0,
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

const getSlideAttributes = (attr) => {
  const slideAttributes = { ...DEFAULT_ATTRS }

  Object.keys(DEFAULT_ATTRS).forEach(k => {
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
    if (isVisible(e) && !e.attributes['_slide-anim-triggered'] ) {
      e.style['animation-play-state'] = 'running'
      e.setAttribute('_slide-anim-triggered', 'true')
    }
  }
}

const initCascadeElems = () => {
  const cascadeElems = Array.from(document.querySelectorAll('[slide-cascade]'))
  const cascadeChildren = []

  for (let e of cascadeElems) {
    const attributes = getSlideAttributes(e.attributes)
    const delayIncrement = e.getAttribute('slide-cascade-increment') || '0.25s'
    const initialDelay = '0s'
    let delays = 0

    for (let child of e.children) {
      setAttributes(child, {
        ...attributes,
        'slide-delay': `calc(${initialDelay} + ${delays++} * ${delayIncrement})`
      })
      cascadeChildren.push(child)
    }
  }

  return cascadeChildren
}

const initSlideElems = () => {
  const slideInElems = Array.from(document.querySelectorAll('[slide]'))
  for (let e of slideInElems) {
    setAttributes(e, getSlideAttributes(e.attributes))
  }
  return slideInElems
}

document.addEventListener('DOMContentLoaded', () => {
  const elems = [...initCascadeElems(), ...initSlideElems()]

  const onScroll = () => revealElements(elems)
  window.addEventListener('scroll', onScroll)
  onScroll()
})
