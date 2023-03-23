const express = require('express')

const router= express.Router()
const  {deleteItemController, getItemController, addItemController, editItemController} = require('./../controllers/itemController') 

//routes
//method get
router.get('/get-item', getItemController)

//method post
router.post('/add-item', addItemController)

//method put
router.put('/edit-item', editItemController)

//method delete
router.delete('/delete-item', deleteItemController)


module.exports= router