const express = require("express");
const router= express.Router();
const {store,show,index,update,destroy}= require("../controllers/photo");
const upload = require('../middlewares/upload');

router.post('/', upload.single('img') ,store);

router.get('/:id',show)

router.get('/',index);

router.put('/:id',upload.single('img'),update)

router.delete('/:id', destroy)

module.exports= router ;