const store = (req,res)=>{
    res.status(200).send('<h1>Rotta Store</h1><p>Questa rotta crea un nuovo elemento.</p>')
}


const show= (req,res)=>{
    res.status(200).send('<h1>Rotta Show</h1><p>Questa rotta legge e restituisce un elemento.</p>')
}

const index = (req,res)=>{
    res.status(200).send('<h1>Rotta Index</h1><p>Questa rotta legge e restituisce gli elementi.</p>')
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