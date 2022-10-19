const { After, AfterAll, BeforeAll, AfterStep} = require('@cucumber/cucumber');

const settings = require('../../../src/conf/config');

const builder = require('../../../src/server');

const app = builder.buildTestServer();

var {setDefaultTimeout} = require('@cucumber/cucumber');

setDefaultTimeout(60 * 1000);


//Rollback hooks, tambien se pueden setear variables de entorno y obtener informacion sobre el escenario
BeforeAll(async function(){
  await app.inject({
    method: 'POST',
    url: '/reset',
  });
})

After(function() {
    settings.reset();
})

AfterAll(async function() {
  await app.inject({
    method: 'POST',
    url: '/reset',
  });
})