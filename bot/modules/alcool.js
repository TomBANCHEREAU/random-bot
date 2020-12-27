const alcohol = [
  'Vodka',
  'Rhum',
  'Gin',
  'Bières',
  'Vin',
  'Tequila',
  'Ricard',
  'Mezcal',
  'Jet 27',
  'sky',
  'Eau de vie',
  'Absinthe',
  'Chartreuse',
  'Armagna',
  'Cognac',
  'Pastis',
  'Cointreau',
  'Kirsh',
  'Grand Marnier',
  'Génépi',
  'Triple Sec',
  'Calvados',
  'Jagger'
]


const messageListener = (message) => {
  if (new RegExp('^!alcool').test(message)) message.reply(alcohol[Math.floor(Math.random() * alcohol.length)])
}

async function start({ Client }) {
  Client.on('message', messageListener)
}

async function stop({ Client }) {
  Client.off('message', messageListener)
}

module.exports = { start, stop }


