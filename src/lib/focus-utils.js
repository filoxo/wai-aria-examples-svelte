const FOCUSABLES_SELECTOR =
  'a, button, input, textarea, select, details, [tabindex]'

export function isFocusable(element) {
  if (!element || element.tabIndex < 0 || element.disabled) return false

  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel != 'ignore'
    case 'INPUT':
      return element.type != 'hidden'
    case 'BUTTON':
    case 'SELECT':
    case 'DETAILS':
    case 'TEXTAREA':
      return true
    default:
      return false
  }
}

export function attemptFocus(element) {
  if (!isFocusable(element)) return false

  try {
    element.focus()
  } catch (e) {}

  return document.activeElement === element
}

export function focusFirstDescendant(element) {
  for (var i = 0; i < element.childNodes.length; i++) {
    var child = element.childNodes[i]
    if (attemptFocus(child) || focusFirstDescendant(child)) {
      return true
    }
  }
  return false
}

export function focusLastDescendant(element) {
  for (var i = element.childNodes.length - 1; i >= 0; i--) {
    var child = element.childNodes[i]
    if (attemptFocus(child) || focusLastDescendant(child)) {
      return true
    }
  }
  return false
}

function queryForFocusableElements(element = document.body) {
  return [...element.querySelectorAll(FOCUSABLES_SELECTOR)].filter(isFocusable)
}

export function previousFocusableElement(elem) {
  return siblingFocusableElement(elem, 'previousElementSibling')
}

export function nextFocusableElement(elem) {
  return siblingFocusableElement(elem, 'nextElementSibling')
}

// TODO: should this handle passing in document.body?
function siblingFocusableElement(elem, recurseKey) {
  // Escape early if element is null or the parentElement is body
  if (!elem || elem.parentElement === document.body) return null
  // If an elementSibling exists...
  if (elem[recurseKey]) {
    // and if that element matches the 'focusables' selector
    if (elem[recurseKey].matches(FOCUSABLES_SELECTOR)) {
      // and return it
      return elem[recurseKey]
    } else {
      // otherwise query it for focusable elements
      const siblingFocusableElements = queryForFocusableElements(
        elem[recurseKey]
      )
      // and if there are any results
      return siblingFocusableElements.length
        ? // return the first one
          siblingFocusableElements.pop()
        : // otherwise, rescurse directionally in the dom
          siblingFocusableElement(elem, recurseKey)
    }
  }
  // otherwise move up to the parent's element sibling
  else {
    return siblingFocusableElement(elem.parentElement, recurseKey)
  }
}

export function focusPreviousElement(elem = document.activeElement) {
  const prevElem = previousFocusableElement(elem)
  attemptFocus(prevElem)
}

export function focusNextElement(elem = document.activeElement) {
  const nextElem = nextFocusableElement(elem)
  attemptFocus(nextElem)
}

export function focusSibling(element, recurseKey) {
  const sibling = element[recurseKey]
  if (!sibling) {
    return
  } else if (isFocusable(sibling)) {
    attemptFocus(sibling)
  } else {
    return focusSibling(sibling[recurseKey])
  }
}

export function focusPreviousSibling(element) {
  return focusSibling(element, 'previousElementSibling')
}

export function focusNextSibling(element) {
  return focusSibling(element, 'nextElementSibling')
}
