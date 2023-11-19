const express = require("express");
const router = new express.Router();
const userController = require("../Controllers/userController");
const projectController = require("../Controllers/projectController");
const jwtMiddleware = require("../Middlewares/jwtMiddleware");
const multerConfig =require('../Middlewares/multerMiddleware')
// register
router.post("/user/register", userController.register);
//login
router.post("/user/login", userController.login);
//add project
router.post("/project/add", jwtMiddleware,multerConfig.single('thumbnail'), projectController.addProjects);

module.exports = router;
