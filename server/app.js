const weatherRouter = require('./routes/api');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4000;
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', weatherRouter)
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to mongoose")
);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});