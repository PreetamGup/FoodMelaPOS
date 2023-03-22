const express = require('express')

const router= express.Router()
const  {loginController, registerController} = require('./../controllers/userController') 

//routes
//method get
router.post('/login', loginController)

//method post
router.post('/register', registerController)




module.exports= router