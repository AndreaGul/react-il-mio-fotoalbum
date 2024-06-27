const express = require ("express");
const app = express();
const photoRouter = require("./routers/photo");
const authRouter = require("./routers/auth");
const categoryRouter = require("./routers/category");
const messageRouter = require("./routers/message");

require("dotenv").config();
const {PORT} = process.env;
const port = PORT||3000;

app.use(express.static("public"));

app.use(express.json());

app.use('/auth', authRouter);
app.use('/photos', photoRouter);
app.use('/categories', categoryRouter);
app.use('/messages',messageRouter)

app.listen(port, ()=>{
    console.log(`server attivo su http://localhost:${port}`);
})