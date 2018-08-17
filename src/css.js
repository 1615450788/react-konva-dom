export const visibility = function (value) {
  let result = {}
  if (value && typeof value === 'string') {
    switch (value.toLocaleLowerCase()) {
      case 'hidden':
        result = {
          visible: false
        }
        break;
      case 'visible':
        result = {
          visible: true
        }
        break
      default:
        break
    }
  }
  return result
}
