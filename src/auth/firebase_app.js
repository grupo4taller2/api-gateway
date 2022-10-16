
FB_TYPE=process.env.FB_TYPE
FB_PROJECT_ID=process.env.FB_PROJECT_ID
FB_PRIVATE_KEY_ID=process.env.FB_PRIVATE_KEY_ID
FB_PRIVATE_KEY=process.env.FB_PRIVATE_KEY
FB_CLIENT_EMAIL=process.env.FB_CLIENT_EMAIL
FB_CLIENT_ID=process.env.FB_CLIENT_ID
FB_AUTH_URI=process.env.FB_AUTH_URI
FB_TOKEN_URI=process.env.FB_TOKEN_URI
FB_AUTH_PROVIDER_CERT_URL=process.env.FB_AUTH_PROVIDER_CERT_URL
FB_CLIENT_CERT_URL=process.env.FB_CLIENT_CERT_URL



const firebase_admin = require('firebase-admin');
//const serviceAccount = require('./key_sdk.json')
const admin = firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert({
  "type": FB_TYPE,
  "project_id": FB_PROJECT_ID,
  "private_key_id": FB_PRIVATE_KEY_ID,
  "private_key": FB_PRIVATE_KEY
  ?FB_PRIVATE_KEY.replace(/\\n/gm, "\n")
  : undefined,
  "client_email": FB_CLIENT_EMAIL,
  "client_id": FB_CLIENT_ID,
  "auth_uri": FB_AUTH_URI,
  "token_uri": FB_TOKEN_URI,
  "auth_provider_x509_cert_url": FB_AUTH_PROVIDER_CERT_URL,
  "client_x509_cert_url": FB_CLIENT_CERT_URL

  })
});


module.exports = admin