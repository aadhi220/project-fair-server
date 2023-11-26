const projects = require("../Models/projectSchema");

// add projects

exports.addProjects = async (req, res) => {
  console.log("inside Add project function");
  const userId = req.payload;
  const thumbnail = req.file.filename;
  const { title, languages, overview, github, website } = req.body;
  // console.log(`${title},${languages},${overview},${github},${website}, ${userId}`);

  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("Projects already exist !! Upload another");
    } else {
      const newProject = new projects({
        title,
        languages,
        overview,
        github,
        website,
        thumbnail,
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(`Request failed, Error:${err}`);
  }
};

//getuserprojects - token required

exports.allUserProjects = async (req, res) => {
  const userId = req.payload;
  try {
    const userProjects = await projects.find({ userId });
    res.status(200).json(userProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

// getallprojects- token required
exports.getallProjects = async (req, res) => {
  const searchKey = req.query.search;
  const query = {
    languages: { $regex: searchKey, $options: "i" },
  };
  try {
    const allProjects = await projects.find(query);
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.getHomeProjects = async (req, res) => {
  try {
    const homeprojects = await projects.find().limit(3);
    res.status(200).json(homeprojects);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.editUserProjects = async (req, res) => {
  const { id } = req.params;

  const userId = req.payload;

  const { title, languages, overview, github, website ,thumbnail    } = req.body;

  const uploadedImage = req.file ? req.file.filename : thumbnail;

  try {
    const updateProject = await projects.findByIdAndUpdate(
      { _id: id },
      {
        title,
        languages,
        overview,
        github,
        website,
        thumbnail: uploadedImage,
        userId,
      },
      { new: true }
    );
    await updateProject.save();
    res.status(200).json(updateProject);
    console.log(updateProject);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.deleteUserProject =async (req, res) => {
  const { id } = req.params;
  const userId = req.payload;
  try{const deleteProject =await projects.findByIdAndDelete({_id: id});
  await deleteProject.delete();
  
  }catch(err) {console.log(err);}
}
