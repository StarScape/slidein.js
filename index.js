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

// Returns an object composed of the properties of `obj` that match the predicate
// Predicate is passed both and key and value for each property
const objFilter = (obj, predicate) =>
   Object.entries(obj)
         .filter(([key, val]) => predicate(key, val))
         .reduce((newObj, [key, val]) => (newObj[key] = key, newObj), {})

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
  e.style['visibility']          = 'visible'
  e.style['animation-name']      = attrs['slide-anim']
  e.style['animation-duration']  = attrs['slide-duration']
  e.style['animation-delay']     = attrs['slide-delay']
  e.style['animation-fill-mode'] = 'forwards'

  // Mark as animated
  e.setAttribute('_slide-anim-triggered', 'true')
}

const revealElements = (elements) => {
  for (let e of elements) {
    if (isVisible(e) && !e.attributes['_slide-anim-triggered'] ) {
      const attrs = getSlideAttributes(e.attributes)
      setAttributes(e, attrs)

      if (attrs['slide-cascade']) {
        // Todo
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const elements = Array.from(document.querySelectorAll('[slide]'))
  elements.forEach(e => e.classList.add('slidein'))

  const onScroll = () => revealElements(elements)
  window.addEventListener('scroll', onScroll)
  onScroll()
})
