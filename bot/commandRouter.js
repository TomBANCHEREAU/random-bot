






const routes=[]

// const defaultRoute=undefined


const processMessage = function(msg){
  const route = routes.find(route => route.pattern.test(msg) && (typeof(route.validation)!=="function" || route.validation(msg)))// || defaultRoute
  if(route)
    route.onMessage(msg)
}


const addRoute = function(pattern,onMessage,validation){
  if(typeof(pattern) === "string" && typeof(onMessage) === "function")
    routes.push({pattern:new RegExp(pattern),onMessage,validation})
}


const listen = function(client){
  if(client && typeof(client.on)==='function'){
    client.on('message',processMessage)
  }
}



module.exports = {processMessage,addRoute,listen}