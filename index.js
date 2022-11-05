#!/usr/bin/env node

// packages
const http = require('http');
const express = require('express');
const cors = require('cors');

// express
const app = express();
app.use(cors());
app.use(express.json());

// configs
const PORT = 5000;

// create http server and set it up
const SERVER = http.createServer(app);

SERVER.listen(PORT);

SERVER.on("listening", () => {
    console.log("[Server]::Listen:%s", PORT);
});

SERVER.on("error", error => {
    throw new Error(`[Server]::ERROR:${error.message}`);
});

// app routing

app.get('/', (req, res) => {
    console.log("server has received a get request on port 5000");
});