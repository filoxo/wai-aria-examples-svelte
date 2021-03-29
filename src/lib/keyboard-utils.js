export const KeyCode = {
  ENTER: "Enter",
  SPACE: " ",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
  HOME: 'Home',
  END: 'End'
}

export const handleKeyboardClick = (fn) => {
  return (e) => {
    switch (e.key) {
      case KeyCode.SPACE: e.preventDefault(); // to prevent page scrolling on Space, and fall through
      case KeyCode.ENTER: return fn(e);
    }
  }
}