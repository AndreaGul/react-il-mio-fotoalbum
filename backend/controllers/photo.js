const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const errorHandler = require("../middlewares/errorHandler")

//store per salvare una foto
const store = async (req,res)=>{
    const {title,description,img,categories,userId}= req.body;

    try{
            const data = {
            title,
            description,
            img,
            visible: req.body.visible ? true : false,
            categories:{
                connect: categories.map(id=>({id:parseInt(id)}))
            },
            userId: parseInt(userId),
        }

        try{
            const photo = await  prisma.photo.create({data});
            res.status(200).send(photo);

        }catch(err){
            errorHandler(err,req,res);
        }
    }
    catch(err){
        errorHandler(err,req,res);
    }

  
   }


const show= (req,res)=>{
    res.status(200).send('<h1>Rotta Show</h1><p>Questa rotta legge e restituisce un elemento.</p>')
}

const index = async (req,res)=>{
try{
    const photos = await prisma.photo.findMany({
        include: {
            categories: {
                select: {
                    name: true
                }
           }
            // ,
            // user: {
            //     select: {
            //         name: true
            //     }
            // }
            
        }
    });
    if(photos.length ===0){
        res.json(`Nessuna foto trovata`)
    }else{
        res.json({
            photos
        });
    }
  
}catch(err){
    errorHandler(err,req,res)
}
    
}
const update = (req,res)=>{
    res.status(200).send('<h1>Rotta Update</h1><p>Questa rotta aggiorna un elemento esistente.</p>')
}
const destroy = (req,res)=>{
    res.status(200).send('<h1>Rotta Delete</h1><p>Questa rotta elimina un elemento.</p>')
}


module.exports = {
    store,
    show,
    index,
    update,
    destroy

}