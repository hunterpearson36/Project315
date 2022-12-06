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
const HTTP_PORT = 5001;


// app routing

app.listen(PORT);

app.on("listening", () => {
    console.log("[app]::Listen:%s", HTTP_PORT);
});

app.on("error", error => {
    throw new Error(`[app]::ERROR:${error.message}`);
});

app.all('/', (req, res) => {
    console.log("server has received a get request on port 5000");
    res.sendStatus(200);
});

const QueryRouter = require('./server/routes/Query');
app.use('/db', QueryRouter);


// create http server and set it up
const SERVER = http.createServer(app);

SERVER.listen(HTTP_PORT);

SERVER.on("listening", () => {
    console.log("[Http]::Listen:%s", HTTP_PORT);
});

SERVER.on("error", error => {
    throw new Error(`[Http]::ERROR:${error.message}`);
});