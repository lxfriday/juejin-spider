const async = require('async')

const topics = require('./topics.json')
const filter = require('./filter')

function start() {
  async.eachLimit(
    topics,
    1,
    (d, callback) => {
      // console.log(d, callback)
      filter(d, callback)
    },
    err => {
      if (err) throw err
    }
  )
}

start()
