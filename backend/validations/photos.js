const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Title è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Title deve essere una stringa.",
      bail: true,
    },
    isLength: {
      errorMessage: "Title deve essere di almeno 3 caratteri",
      options: { min: 3 },
    },
    trim: true,
  },
  description: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Description è un campo obbligatorio.",
      bail: true,
    },
    isString: {
      errorMessage: "Description deve essere una stringa.",
      bail: true,
    },
  },
  visible: {
    in: ["body"],
    isBoolean: {
      errorMessage: "Visible deve essere un booleano.",
    },
    toBoolean: true,
  },
  categories:{
    in:["body"],
    notEmpty:{
        errorMessage: 'le categorie sono un campo obbligatorio',
        bail:true,
    },
    isArray:{
        errorMessage:"le categorie devono essere un array",
    },
    custom: {
        options: async (idCercati) => {
    
            const notIntegerId = idCercati.find(id => isNaN(parseInt(id)));
            if (notIntegerId) {
                throw new Error(`Uno o più ID non sono dei numeri interi.`);
            }
    
            const categories = await prisma.category.findMany({
                //gli id vengono passati come stringa quindi bisogna ritrasformarli in numeri
                where: { id: { in: idCercati.map(id => parseInt(id)) } }
            });
    
            if (categories.length !== idCercati.length) {
                throw new Error(`Una o più categorie specificate non esistono`);
            }
    
            return true;
        }
    }
}
};

module.exports = {
  bodyData,
};