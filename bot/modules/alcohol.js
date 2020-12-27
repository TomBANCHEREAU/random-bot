const alcohol = require('../../ressources/alcohol')


const messageListener = (message) => {
  if (new RegExp('^!alcoh?ol').test(message)) message.reply(alcohol[Math.floor(Math.random() * alcohol.length)])
}

async function start({ Client }) {
  Client.on('message', messageListener)
}

async function stop({ Client }) {
  Client.off('message', messageListener)
}

module.exports = { start, stop }