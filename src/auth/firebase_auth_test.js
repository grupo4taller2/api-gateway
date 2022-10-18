const fastifyPlugin = require("fastify-plugin")

async function verify(fastify,options){
    
    fastify.decorate("verify", async function(request, reply) {
        return;
    });
}

module.exports =  fastifyPlugin(verify);
