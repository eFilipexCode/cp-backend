const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes.js');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);