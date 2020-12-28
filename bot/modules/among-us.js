const colors = ["Rouge", "Marron", "Orange", "Jaune", "Rose", "Violet", "Bleu", "Cyan", "Vert", "Blanc", "Noir"]
const Discord = require('discord.js');




const randomColor = async (message) => {


  // check if the message has been sent on a guild
  if (!message.guild) return

  // sending the message where people can react to participate
  const newMessage = await message.channel.send(
    new Discord.MessageEmbed()
      .setTitle('Among us color Randomizer')
      .setColor(0xFFAA00)
      .setThumbnail('https://cdn.clc2l.com/t/A/m/Among-Us-oAEaxX.png')
      .addField('requested by ' + (message.guild.member(message.author).nickname || message.author.username), 'React with 🖐️ to participate')
      .setFooter('React with ❌ to cancel or ✅ to start the randomization')
  )

  // removing user's random reaction
  newMessage.createReactionCollector((reaction, user) => !reaction.me)
    .on('Collect', (reaction, user) => reaction.remove())

  // collecting participation
  const playerCollector = newMessage.createReactionCollector((reaction, user) =>
    reaction.emoji.name === '🖐️' &&
    !user.bot
  )

  playerCollector.on('end', (collection, reason) => {
    if (reason !== 'randomize') return
    const players = collection.get('🖐️').users.cache.filter(user => !user.bot).array()

    // generating a randomised Array
    const Names = colors.slice()
    const randomizedNames = []
    while (randomizedNames.length !== players.length)
      randomizedNames.push(Names.splice(Math.floor(Math.random() * Names.length), 1)[0])
    const randomizedColors = [randomizedNames[randomizedNames.length - 1]].concat(randomizedNames.slice(0, randomizedNames.length - 1))

    players.forEach(user => {
      user.send(new Discord.MessageEmbed()
        .setTitle("Among us color Randomizer")
        .setColor(0xFFAA00)
        .setThumbnail('https://cdn.clc2l.com/t/A/m/Among-Us-oAEaxX.png')
        .addField("Your name :", randomizedNames.shift())
        .addField("Your color :", randomizedColors.shift())
      )
    });
    // message.channel.send(
    //   
    // )
    //newMessage.delete()
    //message.delete()
  })

  newMessage.createReactionCollector((reaction, user) => reaction.me && !user.bot).on('collect', (reaction, user) => {
    if (reaction.emoji.name === '❌') {
      if (user.equals(message.author)) {
        newMessage.delete()
        message.delete()
      } else {
        reaction.users.remove(user)
      }
    } else if (reaction.emoji.name === '✅') {
      if (playerCollector.total > 0 && user.equals(message.author)) {
        playerCollector.stop('randomize')
      } else {
        reaction.users.remove(user)
      }
    }
  })

  // adding reaction on the message
  newMessage.react('❌')
  newMessage.react('🖐️')
  newMessage.react('✅')

}


const messageListener = (message) => {
  if (new RegExp('^!among-us\ color').test(message)) randomColor(message)
}

async function start({ Client }) {
  Client.on('message', messageListener)
}

async function stop({ Client }) {
  Client.off('message', messageListener)
}

module.exports = { start, stop }