const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require('../utils/restError.js');
const prisma = new PrismaClient();

const store = async (req, res) => {

    const {email,content} = req.body;

    const data = {
        email: email,
        content: content
    }
console.log(data)
    try{
        const message = await prisma.message.create({data});
        res.status(200).send(message);
    }catch(err){
        errorHandler(err, req, res);
    }

}

const index = async (req,res)=>{
    try{
        const messages= await prisma.message.findMany();
        res.json(messages);
    } catch(err){
        errorHandler(err,req,res);
    }
}

const show = async(req,res)=>{
    try{const id =}
}

module.exports = {
    store,index
}