export function requires(value: any, errorMsg: string) {
  if (value === undefined || value === null) throw new Error(errorMsg)
}

export function nextIndex(current: number, arrayLength: number) {
  const next = current + 1
  const wrap = next % arrayLength
  return wrap
}

export function prevIndex(current: number, arrayLength: number) {
  const prev = current - 1
  const wrap = prev < 0 ? arrayLength - 1 : prev
  return wrap
}
