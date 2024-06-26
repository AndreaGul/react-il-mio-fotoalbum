const express = require("express");
const router= express.Router();
const {store,show,index,update,destroy}= require("../controllers/photo");
const upload = require('../middlewares/upload');
const validator = require('../middlewares/validator');
const {bodyData} = require('../validations/photos')

router.post('/', [upload.single('img'),validator(bodyData)] ,store);

router.get('/:id',show)

router.get('/',index);

router.put('/:id',[upload.single('img'),validator(bodyData)],update)

router.delete('/:id', destroy)

module.exports= router ;