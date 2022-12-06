#!/usr/bin/env node

// packages
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

app.listen(PORT, () => {
    //console.log("[app]::Listen:%s", PORT);
});

app.get('/', (req, res) => {
    res.sendStatus(200);
});

const QueryRouter = require('./server/routes/Query');
app.use('/db', QueryRouter);