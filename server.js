const config = require('./config')[process.env.NODE_ENV];
const express = require('express');
const http = require('http');

const app = express();
const port = config.PORT;
const cors = require('cors');

let corsOptions = {
	origin: '*', 
	credential: true, 
};

app.use(cors(corsOptions));

const autoRoute = require('./autoRoute');
autoRoute('/api',app);

const webServer = http.createServer(app);
webServer.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})