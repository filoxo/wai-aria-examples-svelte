export function requires(value, errorMsg) {
  if(value === undefined || value === null) throw new Error(errorMsg)
}