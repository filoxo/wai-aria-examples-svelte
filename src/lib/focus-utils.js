export function isFocusable(element) {
  if (element.tabIndex < 0) return false;
  if (element.disabled) return false;

  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel != 'ignore';
    case 'INPUT':
      return element.type != 'hidden';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};

export function attemptFocus (element) {
  if (!isFocusable(element)) return false;

  try {
    element.focus();
  } catch (e) {}

  return document.activeElement === element;
};

export function focusFirstDescendant (element) {
  for (var i = 0; i < element.childNodes.length; i++) {
    var child = element.childNodes[i];
    if (attemptFocus(child) || focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
};

export function focusLastDescendant (element) {
  for (var i = element.childNodes.length - 1; i >= 0; i--) {
    var child = element.childNodes[i];
    if (attemptFocus(child) || focusLastDescendant(child)) {
      return true;
    }
  }
  return false;
};