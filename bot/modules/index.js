const modules = {
}

async function start({ Client }) {
  modules.keys().forEach(module => {
    await modules[module].start({ Client })
  });
}

async function stop({ Client }) {
  modules.keys().forEach(module => {
    await modules[module].stop({ Client })
  });
}

module.exports = { start, stop }
