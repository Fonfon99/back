require('dotenv').config
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const {LogUser} = require('./controllers/users');


app.use(bodyParser.json());


app.post("/login", LogUser)

app.listen(port, () => console.log(`Listening on port ${port}`));