
const lib = {
  parseKB: function(value) {
    if (value === 0) {
      return value + ' KB';
    } else if (value > 0) {
      return Math.round(value * 4 / 1024 + 0.00001) + ' KB';
      // For megabyte conversion
      // return Math.round((value * 4 / 1024 + 0.00001) / 1024 * 10) / 10 + ' MB';
    } else {
      return value;
    }
  },
  uuid: function() {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }

    return uuid;
  },
  store: function (namespace, data) {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    }
    var store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || {};
  },
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  toArray: function(object) {
    let _arr = []
    for (let key in object) {
      _arr.push(object[key])
    }
    return _arr
  }
}

module.exports = lib;