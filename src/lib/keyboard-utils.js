const KEY = {
  ENTER: "Enter",
  SPACE: " "
}

export const handleKeyboardClick = (fn) => {
  return (e) => {
    switch (e.key) {
      case KEY.SPACE: e.preventDefault(); // to prevent page scrolling on Space, and fall through
      case KEY.ENTER: return fn(e);
    }
  }
}