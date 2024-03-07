const fs = require('fs')
str = fs.readFileSync('./src/index.ts').toString()

m = str.match(/((?<=^|\n)\/\/.*)|((?<=(^|\n)export ).*)|((?<=^|\n)\/\*[\s\S]+?\*\/)/g)
sorted = []
temp = []
m.forEach(item => {
  if (item.startsWith('/*')) {
    item = item.replace(/^\/\*/, '').replace(/\*\/$/, '').trim().replace(/\n+/g, '\n\n')
    temp.push(item)
  } else if (item.startsWith('//')) {
    item = item.substr(2).trim()
    if (item.match(/^#/)) {
      sorted.push(item)
    } else {
      temp.push(item)
    }
  } else {
    item = '#### ' + item
    sorted.push(item, ...temp)
    temp = []
  }
})
sorted.push(...temp)
temp = []

result = sorted.join('\n\n')
m2 = result.match(/\(#.*?\)/g)
if (m2) {
  for (const link of m2) {
    result = result.replace(link, link.toLowerCase())
  }
}

fs.writeFileSync('t.md', result)
