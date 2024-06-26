const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const errorHandler = require("../middlewares/errorHandler");
const deletePic = require("../utils/deletePic.js");

require("dotenv").config();
const{PORT,HOST}=process.env;
const port = PORT || 3000;


//store per salvare una foto
const store = async (req,res)=>{
    const {title,description,categories,userId}= req.body;

    try{
            const data = {
            title,
            description,
            visible: req.body.visible ? true : false,
            categories:{
                connect: categories.map(id=>({id:parseInt(id)}))
            },
            userId: parseInt(userId),
        }

        if(req.file){
            data.img= `${HOST}:${port}/photo_pics/${req.file.filename}`;
        }

        try{
            const photo = await  prisma.photo.create({data});
            res.status(200).send(photo);

        }catch(err){
            if (req.file) {
                deletePic('photo_pics', req.file.filename);
            }
            errorHandler(err,req,res);
        }
    }
    catch(err){
        errorHandler(err,req,res);
    }

  
   }


const show= async (req,res)=>{
    try{
        const {id}=req.params;
        const photo = await prisma.photo.findUnique({
            where:{id: parseInt(id)},
            include: {
                categories: {
                    select: {
                        id:true,
                        name: true
                    }
               }
                ,
                user: {
                    select: {
                        name: true,
                        email:true
                   }
                }
                
            }
        });
        if(photo){
            res.json({
                photo
            });
        }else{
            res.status( 404).send(`post con id ${id} non trovata.`);
        }
      
    }catch(err){
        errorHandler(err,req,res)
    }
        
}

const index = async (req,res)=>{
try{
    const photos = await prisma.photo.findMany({
        include: {
            categories: {
                select: {
                    name: true
                }
           },
           user: {
            select: {
                id:true,
                name: true,
                email:true
                }
            }
            
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
};

const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, categories } = req.body;

    try {
        // Preparare i dati di aggiornamento
        const data = {
            title,
            description,
            visible: req.body.visible ? true : false,
        };

        // Controllare se categories è presente e aggiornarle
        if (categories) {
            data.categories = {
                set: categories.map(id => ({ id: parseInt(id) })),
            };
        }

        // Controllare se è stata fornita una nuova immagine
        if (req.file) {
            data.img = `${HOST}:${port}/photo_pics/${req.file.filename}`;
            
            // Trovare la foto esistente per eliminare l'immagine precedente
            const existingPhoto = await prisma.photo.findUnique({
                where: { id: parseInt(id) },
            });

            if (existingPhoto && existingPhoto.img) {
                const filename = existingPhoto.img.split('/').pop(); // Ottieni il nome del file dall'URL
                deletePic('photo_pics', filename); // Elimina l'immagine precedente
            }
        }

        // Effettuare l'aggiornamento della foto
        const updatedPhoto = await prisma.photo.update({
            where: { id: parseInt(id) },
            data,
        });

        res.status(200).send(updatedPhoto);
    } catch (err) {
        // Gestione degli errori
        if (req.file) {
            deletePic('photo_pics', req.file.filename); // Elimina l'immagine caricata in caso di errore
        }
        errorHandler(err, req, res);
    }
};


  
const destroy = async(req,res)=>{
    try{
        const { id }= req.params;
        await prisma.photo.delete({
            where:{id:parseInt(id)},
        });
        res.json(`foto con id ${id} eliminato`)
    }catch(err){
        errorHandler(err,req,res);
    }
}


module.exports = {
    store,
    show,
    index,
    update,
    destroy

}