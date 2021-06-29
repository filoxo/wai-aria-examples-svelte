import { KeyCode } from '$lib/keyboard-utils'

export function goToLink(href: string): svelte.JSX.MouseEventHandler | svelte.JSX.KeybaordEventHandler {
  return function handleGoToLink(event: Partial<MouseEvent & KeyboardEvent>): void {
    const { type, key } = event
    if (type === 'click' || (type === 'keydown' && key === KeyCode.ENTER)) {
      window.location.href = href
      event.preventDefault()
      event.stopPropagation()
    }
  }
}
