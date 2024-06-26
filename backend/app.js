const express = require ("express");
const app = express();
const photoRouter = require("./routers/photo");


require("dotenv").config();
const {PORT} = process.env;
const port = PORT||3000;

app.use(express.json());

app.use('/photos', photoRouter);

app.listen(port, ()=>{
    console.log(`server attivo su http://localhost:${port}`);
})