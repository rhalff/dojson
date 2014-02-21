require('should'),
  fs = require('fs'),
  DoJSON = require('../main');

describe("Do JSON:", function() {

  it("Do JSON should", function(done) {

    var node = JSON.parse(
      fs.readFileSync('./test/fixtures/node.json')
    );

    var j = new DoJSON();

    var result = {};

    var res = j.parse(node, function(key, json) {

      if(key === 'ports') {
         result[key] = json;
         console.log('KEY:'+ key, '>>', this);
      }

      return json[key];

    });

    res = j.parse(node);

    console.log(result);

  });

});
/*
  object: function(key, json) {
    if(this.up.up && this.up.up.up && this.up.up.up) {
      console.log(this.up);
    }
  }
*/
