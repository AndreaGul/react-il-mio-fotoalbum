const express = require("express");
const router = express.Router();

const {store,index}= require("../controllers/message");

router.post('/', store);

 router.get('/', index);

// router.get('/:id', show);

// router.put('/:id', update);

// router.delete('/:id', destroy);


module.exports = router;