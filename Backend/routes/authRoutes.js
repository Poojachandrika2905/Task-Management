const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
router.post("/register", async(req,res)=>{

try{

const hashedPassword = await bcrypt.hash(req.body.password,10);

const user = new User({

name:req.body.name,
email:req.body.email,
password:hashedPassword

});

await user.save();

const token = jwt.sign(
{id:user._id},
process.env.JWT_SECRET
);

res.json({token});

}
catch(err){

res.status(500).json("Register error");

}

});


// LOGIN
router.post("/login", async (req,res)=>{

try{

const { email, password } = req.body;

if(!email || !password)
return res.status(400).json("Email and password required");

const user = await User.findOne({ email });

if(!user)
return res.status(400).json("User not found");

const validPassword = await bcrypt.compare(
password,
user.password
);

if(!validPassword)
return res.status(400).json("Wrong password");

const token = jwt.sign(
{id:user._id},
process.env.JWT_SECRET
);

res.json({token});

}
catch(err){

console.log(err);
res.status(500).json("Server error");

}

});


// GET PROFILE
router.get("/profile", async (req,res)=>{

try{

const token = req.headers.authorization;

const verified = jwt.verify(
token,
process.env.JWT_SECRET
);

const user = await User.findById(
verified.id
).select("-password");

res.json(user);

}
catch(err){

res.status(400).json("Invalid token");

}

});

// UPDATE PROFILE
router.put("/profile", async (req,res)=>{

try{

const token = req.headers.authorization;

const verified = jwt.verify(
token,
process.env.JWT_SECRET
);

const updatedUser = await User.findByIdAndUpdate(
verified.id,
{
name:req.body.name,
email:req.body.email
},
{new:true}
);

res.json(updatedUser);

}
catch(err){

res.status(400).json("Profile update failed");

}

});


module.exports = router;
