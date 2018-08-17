export var visibility = function visibility(value) {
  var result = {};
  if (value && typeof value === 'string') {
    switch (value.toLocaleLowerCase()) {
      case 'hidden':
        result = {
          visible: false
        };
        break;
      case 'visible':
        result = {
          visible: true
        };
        break;
      default:
        break;
    }
  }
  return result;
};