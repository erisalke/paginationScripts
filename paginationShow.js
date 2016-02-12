var pagination = require('./pagination');

var all = process.argv[2]
var curr = process.argv[3]
var lim = process.argv[4]

if (curr === undefined || all === undefined || Number(curr) > all || Number(curr) < 0){
  console.log("Pagination Script v1.01")
  console.log()
  console.log("Proper call format is: pagination(int all, int current [, limit])")
  console.log("                where: all     - number of all pages")
  console.log("                       current - active page, all >= current")
  console.log("                       limit   - max return message size, limit >= 5, default: 7")
  console.log("Example: node pagination.js 23 5")
  console.log("         node pagination.js 23 5 11")
  console.log()

  return -1
}

var theResult = pagination(Number(all), Number(curr), Number(lim))
console.log(theResult)
