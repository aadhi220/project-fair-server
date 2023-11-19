const projects = require("../Models/projectSchema")



// add projects



exports.addProjects = async (req,res)=>{
    console.log("inside Add project function");
    const userId = req.payload
    const thumbnail = req.file.filename
    const {title,languages,overview,gitHub,website}= req.body
    // console.log(`${title},${languages},${overview},${gitHub},${website}, ${userId}`);

    try{
        const existingProject = await projects.findOne({gitHub})
        if(existingProject){
            res.status(406).json("Projects already exist !! Upload another")
        }else{
            const newProject = new projects({
                title,languages,overview,gitHub,website,thumbnail,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(`Request failed, Error:${err}`)
    }
}