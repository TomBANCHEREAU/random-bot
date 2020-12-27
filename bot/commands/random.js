
const traits = require('../../ressources/traits')

module.exports = (msg)=>{
  msg.reply(traits[new RegExp('pbe').test(msg)?'pbe':'live'][Math.floor(Math.random() * originAndClass.length)])
}