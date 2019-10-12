const DEFAULT_ATTRS = {
  'slide-anim': 'fadeleft',
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

const getSlideAttributes = (attr) => ({
  ...DEFAULT_ATTRS,
  ...objFilter(attr, (key, val) => key.startsWith('slide'))
})

// const getSlideAttributes = attr => DEFAULT_ATTRS.map()


const revealElements = (slideInElements) => {
  for (let e of slideInElements) {
    if (!e.attributes['_slide-anim-triggered'] && isVisible(e)) {
      const attrs = getSlideAttributes(e.attributes)

      e.style.visibility             = 'visible'
      e.style.animation              = `${attrs['slide-anim']} 0.5s ease-in-out`
      e.style['animation-delay']     = `${attrs['slide-delay']}s`
      e.style['animation-fill-mode'] = 'forwards'

      // Mark as animated
      e.setAttribute('_slide-anim-triggered', 'true')
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const slideInElements = document.querySelectorAll('[slide]')
  slideInElements.forEach(e => e.classList.add('_slide'))

  const onScroll = () => revealElements(slideInElements) 
  window.addEventListener('scroll', onScroll)
  onScroll()
})
