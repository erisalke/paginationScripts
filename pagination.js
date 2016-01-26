function addHead(arr) {
  return Array.prototype.concat(arr[0]-1, arr)
}

function addTail(arr) {
  return Array.prototype.concat(arr, arr[arr.length-1]+1)
}

function print(result, active) {
  // catch hack here - if result is not an [], but number, make me an array
  if (result.constructor !== Array){
    // the Array.apply(...) below is pure awesome: http://stackoverflow.com/a/20066663/5539798
    // for compatibility reasons (below JS5) just a simple FOR does the job
    result = Array.apply(null, { length:result }).map(function(e, i) { return i+1 })
  }
  var pos = result.indexOf(active)
  result[pos] = "|" +result[pos]+ "|"
  console.log(result.join(" "))
}

function paginate(all, active, limit, result){
  // init state
  if (result === undefined){
    // throw hack here - if nothing to paginate just go directly to print()
    if (limit >= all)
      return print(all, active)
    return paginate(all, active, --limit, [active])
  }

  // terminate condition
  if (limit <= 0){
    if (result[0] !== 1){
      result.shift()
      result.unshift(1, "...")
    }
    if (result[result.length-1] !== all){
      result.pop()
      result.push("...", all)
    }
    return print(result, active)
  }

  // most common case - add the tail
  if (result[0] === 1) {
    return paginate(all, active, --limit, addTail(result))
  }
  // end reached - only adding to front
  if (result[result.length-1] === all){
    return paginate(all, active, --limit, addHead(result))
  }
  // add to end first
  if (result.length % 2 === 1){
    return paginate(all, active, --limit, addTail(result))
  }
  // add to front loop
  return paginate(all, active, --limit, addHead(result))
}

// ---------------------------------------------------------------------------
// -------------- Execution below --------------------------------------------
// ---------------------------------------------------------------------------

var all = Number(process.argv[2]) || 19
var lim = Number(process.argv[3]) || 7
var curr = process.argv[4]

if (lim < 5) {
  console.log("Warning: pagination have no sense for limit below 5 -,-")
  lim =5
}
if (1 > curr || curr > all){
  return console.log("Error: 404")
}
if (curr !== undefined){
  return paginate(all, Number(curr), lim)
}

for (var i=1; i<=all;i++){
  paginate(all, i, lim)
}
