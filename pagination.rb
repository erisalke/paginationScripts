def printRes(result, active, all)
  if result.first != 1
    result = result[1..-1].unshift("1", "...")
  end
  if result.last != all
    result = result[0..-2].push("...", all)
  end

  pos = result.index(active)
  result[pos] = "|" +result[pos].to_s+ "|"
  puts result.join(" ")
end

def paginate(all, active, limit)
  result = []
  result.push(active)

  for i in 1..limit-1
    if result[0] === 1
      next result.push(result.last+1)
    end

    if result[-1] === all
      next result.unshift(result.first-1)
    end

    if result.length % 2 == 1
      next result.push(result.last+1)
    end

    next result.unshift(result.first-1)
  end

  printRes(result, active, all)
end

# ---------------------------------------------------------------------------
# -------------- Execution below --------------------------------------------
# ---------------------------------------------------------------------------

all = (ARGV[0] || 19).to_i
lim = (ARGV[1] || 7).to_i
curr = ARGV[2]

if (lim < 5)
  puts "Warning: pagination have no sense for limit below 5 -,-"
  lim = 5
end

if (curr != nil)
  curr = curr.to_i
  if (1 > curr || curr> all)
    puts "Error: 404"
  else
    paginate(all, curr.to_i, lim)
  end
else
  for i in 1..all
    paginate(all, i, lim)
  end
end
