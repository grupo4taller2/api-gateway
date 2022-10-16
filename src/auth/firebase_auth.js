
const fastifyPlugin = require("fastify-plugin")


//var key = require(serviceAccount = './key_sdk.json');

async function verify(fastify,options){
    
    let firebase_app = require('./firebase_app.js');
    const { getAuth } = require( 'firebase-admin/auth');
    
    fastify.decorate("verify", async function(request, reply) {
        try{
            await getAuth()
            .verifyIdToken(request.headers["authorization"].split(" ")[1]) //FUNCIONA PARA PROBA HAY QUE HACER ESTO
            //.verifyIdToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkMzQwZGRiYzNjNWJhY2M0Y2VlMWZiOWQxNmU5ODM3ZWM2MTYzZWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlmaS11YmVyLTQiLCJhdWQiOiJmaWZpLXViZXItNCIsImF1dGhfdGltZSI6MTY2NTY3ODU1NiwidXNlcl9pZCI6Ik4wSjFrYmhNU1poZEZqamx3R3lNQllwekVzMDIiLCJzdWIiOiJOMEoxa2JoTVNaaGRGampsd0d5TUJZcHpFczAyIiwiaWF0IjoxNjY1Njc4NTU2LCJleHAiOjE2NjU2ODIxNTYsImVtYWlsIjoicHJ1ZWJhbWFpbDExQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInBydWViYW1haWwxMUBtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.qF6nUqPM2V-3FaP2SxLSs_bf8JCVeGSSD_X25fLMbrvNkJ1GnStrFgboal3JW2cWPhSj0zRN--lupwxtAwPPBDrjWejeygakJyR68hWky2XNoP73PW8FGREicqSEgPiQFSUQ3xQ5NHXv8itP1CxsTp5iE9ACGOkDFppbcdTIUo5YhCwUfBpPoWSrl08B4R40maRuxaXpPqT8Es3L2uJXMoyXNtQVRsRJ7gFIWb_rFfHbMOa99uPsxSwIFTYkdFtHhAJV_1tFcqMdRcqKxqrOTqzWidP8_Uh-j27yLV3XPq9B78A7CwRO0awyqkjufWStFu_bBymqszVq6JAefxBkyw")
            .then((decodedToken) => {
                console.log("EL TOKEN ES CORRECTO");
                const uid = decodedToken.uid;
                // ...
            })
            .catch((error) => {
                console.log("ERROR EN EL TOKEN");
                console.log(error);
                reply.status(401).send(error);
                return reply;
            });
        }catch(error){
            console.log("ERROR NO SE ENVIO EL TOKEN");
            console.log(error);
            reply.status(401).send({
                error:"The request sent doesnt has an authorization token",
                status: 401,
            }
            );
            return reply;
        }
        //getAuth();
        //console.log(request.headers)
    });
}

module.exports =  fastifyPlugin(verify);
