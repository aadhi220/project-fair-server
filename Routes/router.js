const express= require('express')
const router = new express.Router()
const userController =require('../Controllers/userController')
const projectController =require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
// register
router.post('/user/register',userController.register)
//login 
router.post('/user/login',userController.login)
//add project
router.post('/project/add',jwtMiddleware,projectController.addProject)

module.exports=router