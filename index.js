
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/post.js');


app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api', postRoutes);


app.listen(port, () => console.log(`Listening on port ${port}`));