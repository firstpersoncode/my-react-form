import smoothScroll from 'smoothscroll'

export const offset = id => {
  if (!window || !document) {
    return
  }
  let el = document.getElementById(id)
  if (!el && !el.getBoundingClientRect) {
    return
  }
  let rect = el.getBoundingClientRect(),
  scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return rect.top + scrollTop
}

export const scrollTo = (target, counter) => {
  return smoothScroll(offset(target) - counter)
}
