#!/usr/bin/env node

// packages
const http = require('http');
const express = require('express');
const cors = require('cors');

// express
const app = express();
app.use(cors());
app.use(express.json());

// dbConnector
const dbConnector = require('./server/database/dbConnector');
process.on('SIGINT', function() {
    dbConnector.close();
    console.log('Application successfully shutdown');
    process.exit(0);
});

// configs
const PORT = 5000;


// app routing

app.all('/', (req, res) => {
    console.log("server has received a get request on port 5000");
    res.status(200).send(null);
});

const QueryRouter = require('./server/routes/Query');
app.use('/db', QueryRouter);


// create http server and set it up
const SERVER = http.createServer(app);

SERVER.listen(PORT);

SERVER.on("listening", () => {
    console.log("[Server]::Listen:%s", PORT);
});

SERVER.on("error", error => {
    throw new Error(`[Server]::ERROR:${error.message}`);
});