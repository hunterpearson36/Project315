const express = require('express');
const dbConnector = require('../database/dbConnector');

// create router
const router = express.Router();

/// yes, I know, they are both POSTS. HTTP GET doesn't allow including a JSON body, so this is my work around. Sorry for any future confusion.

// for getting data (POST http://localhost:5000/db/query)
router.post('/query', (req, res) => {
    const { query } = req.body;
    dbConnector.executeQuery(query).then(rows => {
        //console.log(rows);
        res.json(rows);
    });
});

// for updating data (POST http://localhost:5000/db/update)
router.post('/update', (req, res) => {
    const { query } = req.body;
    dbConnector.executeUpdate(query).then(success => {
        if (success) res.status(200).json({ success: "true" });
        else res.status(500).json({ success: "false" });
    });
});

module.exports = router;