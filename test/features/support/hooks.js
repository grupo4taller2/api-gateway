const { After, AfterAll, BeforeAll, AfterStep} = require('@cucumber/cucumber');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

var {setDefaultTimeout} = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000);


//Rollback hooks, tambien se pueden setear variables de entorno y obtener informacion sobre el escenario
BeforeAll(async function(){
  await await app.inject({
    method: 'POST',
    url: '/reset',
  });
})
