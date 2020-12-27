
const traits = require('../../ressources/teamfight-tactics/traits')
const Discord = require('discord.js');



const singleCommand = (msg) => {
  msg.reply(traits[new RegExp('pbe').test(msg) ? 'pbe' : 'live'][Math.floor(Math.random() * originAndClass.length)])
}

const squadCommand = async function (msg) {
  // check if the message has been sent on a guild
  if (!msg.guild) return

  // sending the message where people can react to participate
  const newMessage = await msg.channel.send(
    new Discord.MessageEmbed()
      .setTitle('TFT Squad Randomizer')
      .setColor(0xFFAA00)
      .addField('requested by ' + (msg.guild.member(msg.author).nickname || msg.author.username), 'React with 🖐️ to participate')
      .setFooter('React with ❌ to cancel or ✅ to start the randomization')
  )

  // removing user's random reaction
  newMessage.createReactionCollector((reaction, user) => !reaction.me)
    .on('Collect', (reaction, user) => reaction.remove())

  // collecting participation
  const playerCollector = newMessage.createReactionCollector((reaction, user) =>
    reaction.emoji.name === '🖐️' &&
    !user.bot &&
    !user.equals(newMessage.author)
  )



  playerCollector.on('end', (collection, reason) => {
    if (reason !== 'randomize') return
    const players = collection.get('🖐️').users.cache.filter(user => !user.bot)
    // generating a randomised Array
    const traitsTmp = traits[new RegExp('pbe').test(msg) ? 'pbe' : 'live'].slice()
    const randomizedTraits = []
    while (traitsTmp.length)
      randomizedTraits.push(
        traitsTmp.splice(Math.floor(Math.random() * traitsTmp.length), 1)
      )
    msg.channel.send(
      new Discord.MessageEmbed()
        .setTitle("TFT Squad Randomizer")
        .setColor(0xFFAA00)
        .addField("RESULTS :",
          players.map((user) => (msg.guild.member(user).nickname || user.username) + ' : ' + randomizedTraits.shift()).join('\n')
        )
    )
    newMessage.delete()
    msg.delete()
  })

  newMessage.createReactionCollector((reaction, user) => !user.equals(newMessage.author) && reaction.me && !user.bot).on('collect', (reaction, user) => {
    if (reaction.emoji.name === '❌') {
      if (user.equals(msg.author)) {
        newMessage.delete()
        msg.delete()
      } else {
        reaction.users.remove(user)
      }
    } else if (reaction.emoji.name === '✅') {
      if (playerCollector.total > 0 && user.equals(msg.author)) {
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
  if (new RegExp('^!tft').test(message)) singleCommand(message)
  if (new RegExp('^!tfts').test(message)) squadCommand(message)
}

async function start({ Client }) {
  Client.on('message', messageListener)
}

async function stop({ Client }) {
  Client.off('message', messageListener)
}

module.exports = { start, stop }
