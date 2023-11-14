const users = require("../Models/userSchema");

exports.register = async (req, res) => {
  console.log("inside yu");
  const { username, email, password } = req.body;
 
 try {
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      res.status(406).json("account already exist , plz login");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkdin: "",
        profile: "",
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
 } catch (error) {
    res.status(401).json('Register api failed error:',error)
 }
};

exports.login = async (req,res)=> {
  console.log("inside login function");
  const {email,password}= req.body
  try {
    const existingUser = await users.findOne({email,password})
    if(existingUser){
      res.status(200).json({
        existingUser
      })

    }else{
      res.status(401).json(`Incorrect Email / Password`)
    }
  }catch(err){
    res.status(401).json(`login api failed, Error: ${err}`)

  }
}
