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
router.post("/projects/add",jwtMiddleware,multerConfig.single('thumbnail'), projectController.addProjects);


//getuserprojects
router.get('/user/all-projects' , jwtMiddleware, projectController. allUserProjects)
//getallprojects
router.get('/projects/all' , jwtMiddleware, projectController. getallProjects)
//gethomeprojects
router.get('/projects/home-projects', projectController.getHomeProjects)
module.exports = router;
//edit user projects
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single('thumbnail'), projectController.editUserProjects)
module.exports = router;

router.delete('/projects/delete/:id', jwtMiddleware, projectController.deleteUserProject)

