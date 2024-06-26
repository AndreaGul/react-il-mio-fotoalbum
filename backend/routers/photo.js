const express = require("express");
const router= express.Router();

const {store,show,index,update,destroy}= require("../controllers/photo")

router.post('/',store);

router.get('/:id',show)

router.get('/',index);

router.post('/:id',update)

router.delete('/:id', destroy)

module.exports= router ;