export function requires(value, errorMsg) {
  if (value === undefined || value === null) throw new Error(errorMsg)
}

export function nextIndex(current, arrayLength) {
  const next = current + 1
  const wrap = next % arrayLength
  return wrap
}

export function prevIndex(current, arrayLength) {
  const prev = current - 1
  const wrap = prev < 0 ? arrayLength - 1 : prev
  return wrap
}
