const fs = require('fs');
const obj = require('./onbject');

fs.writeFile('helloworld2.json', JSON.stringify(obj), function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
});