import { KeyCode } from '$lib/keyboard-utils'

export function goToLink(href) {
  return function handleGoToLink(event) {
    const { type, key } = event
    if (type === 'click' || (type === 'keydown' && key === KeyCode.ENTER)) {
      window.location.href = href
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
