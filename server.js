const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');
const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const app = express();

dotEnv.config();

// request payload midlleware

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// cors

app.use(cors());

// routes

app.get('/', (req, res) => {
  res.send('Working');
});

const privateKey = fs.readFileSync( '/etc/letsencrypt/live/invoice4u.site/privkey.pem','utf8')
const certificate = fs.readFileSync(  '/etc/letsencrypt/live/invoice4u.site/cert.pem', 'utf8')
const ca = fs.readFileSync( '/etc/letsencrypt/live/invoice4u.site/fullchain.pem', 'utf8')

const credentials={
	key: privateKey,
	cert: certificate,
	ca: ca
}

https.createServer(credentials, app).listen( 443,  ()=>{
	console.log('Https Server 443')
})

http.createServer(function(req, res){
	res.writeHead(301,{"Location":"https://" + req.headers["host"] + req.url})
	res.end()
}).listen(80)

// error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
