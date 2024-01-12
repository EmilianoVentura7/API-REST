require("dotenv").config();
require("./src/configs/db.configs");

const express = require('express');
const app = express();
const alumnosRouter = require('./src/routes/alumnos.router')


app.use(express.json());


app.use('/alumnos', alumnosRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.error("La api fue escuchada en el puerto: " + PORT);
});