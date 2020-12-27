const client = new (require('discord.js').Client)();


const Router = require('./commandRouter')

const id = '466612804984504320'

var muted = false;

//Router.addRoute('^!((tftrandom|rtft)\ squad)|(alexlecon)|(lolalad�bile)|(fermela)', require('./commands/tftrandom_squad'))
Router.addRoute('^!alexlecon', require('./commands/tftrandom_squad'))
Router.addRoute('^!(tftrandom|rtft)', require('./commands/random'))
Router.addRoute('^!jackalcon', (msg) => {
  if (msg.author.id === "223537937608998912" || msg.author.id === "259740597336670209") {
    muted = !muted
    msg.guild.members.resolve(id).voice.setMute(muted)
  }
})
Router.addRoute('!alcool', (msg) => {
  const alcohol = ['Vodka', 'Rhum', 'Gin', 'Bières', 'Vin', 'Tequila', 'Ricard', 'Mezcal', 'Jet 27', 'sky', 'Eau de vie', 'Absinthe', 'Chartreuse', 'Armagna', 'Cognac', 'Pastis', 'Cointreau', 'Kirsh', 'Grand Marnier', 'Génépi', 'Triple Sec', 'Calvados', 'Jagger']
  msg.reply(alcohol[Math.floor(Math.random() * alcohol.length)])
})
Router.addRoute('!stardew', (msg) => {
  const singles = ['Alex', 'Elliott', 'Harvey', 'Sam', 'Sebastian', 'Shane', 'Abigail', 'Emily', 'Haley', 'Leah', 'Maru', 'Penny']
  msg.reply(singles[Math.floor(Math.random() * singles.length)])
})

Router.listen(client)

client.on('voiceStateUpdate', (oldS, newS) => {
  if (newS.member.id === id && newS.member.voice.mute !== muted && muted) {
    // console.log("test")
    newS.member.voice.setMute(muted)
  }
})
client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));
client.login('NzEwMjA0NDQ2MjczMDQ0NTAx.XrxDfQ.-DG-wW3_MRInyEUcp1DWDG_2OhA');


