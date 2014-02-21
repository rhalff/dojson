var fs = require('fs');
var json = fs.readFileSync('./node.json').toString();

// errrr, so json.parse happens to have a revive function..
console.log(JSON.parse(json, function(k, v) {

  console.log(typeof v);
  return false;


}));
