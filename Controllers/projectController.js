const projects =require('../Models/projectSchema')

//add project 

exports.addProject =(req,res)=> {
    console.log("inside add project function");
    res.status(200).json("add Project request recived!!!")
}