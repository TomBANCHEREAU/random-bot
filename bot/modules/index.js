const modules = [
  require('./teamfight-tactics'),
  require('./alcool')
]

async function start({ Client }) {
  await Promise.all(modules.map(m => m.start({ Client })))
}

async function stop({ Client }) {
  await Promise.all(modules.map(m => m.stop({ Client })))
}

module.exports = { start, stop }
