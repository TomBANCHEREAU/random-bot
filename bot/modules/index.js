const modules = {
}

async function start({ Client }) {
  for (const module in Object.keys(modules)) {
    await modules[module].start({ Client })
  }
}

async function stop({ Client }) {
  for (const module in Object.keys(modules)) {
    await modules[module].stop({ Client })
  }
}

module.exports = { start, stop }
