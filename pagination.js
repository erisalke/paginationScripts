// paginateScript v1.01, erisalke2016, copyright: "THe BEER-WARE LICENSE" (Rev.42)

module.exports = function(all, active, limit) {
  const limDef = 7
  if (limit === null || isNaN(limit) || limit < 5){
    limit = limDef
  }

  return paginate(all, active, limit)
}

const emptySpace = "..."

function paginate(all, active, limit, result){
  // init state
  if (result === undefined){
    if (limit >= all){
      return Array.apply(null, { length:all }).map(function(e, i) { return i+1 })
    }
    return paginate(all, active, --limit, [active])
  }

  // terminate condition
  if (limit <= 0){
    if (result[0] !== 1){
      result.shift()
      result.unshift(1, emptySpace)
    }
    if (result[result.length-1] !== all){
      result.pop()
      result.push(emptySpace, all)
    }
    return result
  }

  // most common case - add the tail
  if (result[0] === 1) 
    return paginate(all, active, --limit, Array.prototype.concat(result, result[result.length-1]+1))

  // end reached - only adding to front
  if (result[result.length-1] === all)
    return paginate(all, active, --limit, Array.prototype.concat(result[0]-1, result))

  // add to end first
  if (result.length % 2 === 1)
    return paginate(all, active, --limit, Array.prototype.concat(result, result[result.length-1]+1))
  // add to front loop
  return paginate(all, active, --limit, Array.prototype.concat(result[0]-1, result))
}
