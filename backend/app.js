const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

require('dotenv').config({path: "backend/config/config.env"});
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const user = require('./routes/user');
const page = require('./routes/page');
app.use("/api/v1", user);
app.use("/api/v1", page);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

module.exports = app;