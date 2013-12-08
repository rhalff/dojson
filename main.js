/**
 *
 * To Process JSON Something has to happen.
 *
 * This is the something.
 *
 * It iterates the entire json and
 * provides executes a callback function per key.
 *
 * You can also add just one function.
 *
 * The Values are processed according to it's type
 *
 * Only one function is added per type.
 *
 * By default nothing is processed, so you will get
 * an empty object in return.
 *
 * If you only specify a string function you
 * will get an object with only string values.
 *
 */
function Up(up, json) {
  this.up =  up;
  this.json = json;
}

function DoJSON() {

  var ok = function(key, json) { return json[key]; };

  this.process = {
    string: ok,
    boolean: ok,
    object: ok,
    number: ok,
    'null': ok,
    array: ok
  };

  /**
   * we can always search forward, because it's
   * in the json we get when we receive an object
   *
   * However to lookup the parent we need to store this.
   *
   * What is the parent chain depends on the moment.
   *
   */
  this.parent = undefined;

}

DoJSON.prototype.parse = function(json, process) {

  var key, type = typeof process;

  this.parent = json;

  if(type !== 'undefined') {

    if(type === 'function') {

      // only pass objects
      this.process['object'] = process;

    } else {

      for(key in process) {
        if(this.process[key]) {
          this.process[key] = process[key]
        } else {
          throw new Error("Unknown process type " + key);
        }
      }

    }
  }

  this.json = json;

  json = this._process(json, new Up());
  return json;

};

DoJSON.prototype._process = function(json, up) {

  var key, type, ret, u;

  for(key in json) {

    var type = Object.prototype.toString.
      call(json[key]).
      match(/[A-Z]\w+/g, '').
      pop().
      toLowerCase();
    if(type === 'object') {

      u = new Up(up, json);

      // objects should be manipulated in place,
      // if you return false from the object function
      // the object will not be processed further.
      // otherwise it will continue to iterate it's properties
      if(this.process[type].apply(u, [key, json, type])) {

        ret = this._process(json[key], u);

        if(!Object.keys(ret).length) {

          delete json[key];

        } else {

          json[key] = ret;

        }

      }

      // up cleanup
      delete u;

    } else {

      ret = this.process[type].apply(up, [key, json, type]);

      // if false is return delete this property
      if(ret) {
        json[key] = ret;
      } else {
        delete json[key];
      }

    }

  }

  return json;

}

module.exports = DoJSON;
