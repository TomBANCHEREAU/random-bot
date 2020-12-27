const modules = [
  require('./teamfight-tactics'),
  require('./alcohol')
]

async function start({ Client }) {
  await Promise.all(modules.map(m => m.start({ Client })))
}

async function stop({ Client }) {
  await Promise.all(modules.map(m => m.stop({ Client })))
}

module.exports = { start, stop }
