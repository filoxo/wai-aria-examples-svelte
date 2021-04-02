export const KeyCode = {
  ENTER: 'Enter',
  SPACE: ' ',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  HOME: 'Home',
  END: 'End',
}

export const handleKeyboardClick = (fn) => {
  return (e) => {
    switch (e.key) {
      case KeyCode.SPACE:
        return handleSpaceAsClick(fn)(e)
      case KeyCode.ENTER:
        return handleEnterAsClick(fn)(e)
    }
  }
}

export const handleEnterAsClick = (fn) => (e) => {
  if (e.key === KeyCode.ENTER) {
    return fn(e)
  }
}

export const handleSpaceAsClick = (fn) => (e) => {
  if (e.key === KeyCode.SPACE) {
    // to prevent page scrolling on Space
    e.preventDefault()
    return fn(e)
  }
}
