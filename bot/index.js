if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const Client = new (require('discord.js').Client)();
const eventToPromise = require('event-to-promise');
const modules = require('./modules');

async function start() {
  if (!process.env.TOKEN) {
    throw 'The discord bot token need to be provided in order to start the application'
  }
  await modules.start({ Client })
  Client.login(process.env.TOKEN);
  await eventToPromise(Client, 'ready');
  console.log(`Logged in as ${Client.user.tag}!`);
}

async function stop() {
  Client.destroy();
}



start().then(() => { }).catch(error => {
  console.error('Failure', error)
})
process.on('SIGTERM', async () => {
  await stop()
  process.exit()
})



// Router.addRoute('^!jackalcon', (msg) => {
//   if (msg.author.id === "223537937608998912" || msg.author.id === "259740597336670209") {
//     muted = !muted
//     msg.guild.members.resolve(id).voice.setMute(muted)
//   }
// })
// client.on('voiceStateUpdate', (oldS, newS) => {
//   if (newS.member.id === id && newS.member.voice.mute !== muted && muted) {
//     // console.log("test")
//     newS.member.voice.setMute(muted)
//   }
// })



// Router.addRoute('!stardew', (msg) => {
//   const singles = ['Alex', 'Elliott', 'Harvey', 'Sam', 'Sebastian', 'Shane', 'Abigail', 'Emily', 'Haley', 'Leah', 'Maru', 'Penny']
//   msg.reply(singles[Math.floor(Math.random() * singles.length)])
// })




