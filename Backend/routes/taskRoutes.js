const router = require("express").Router();
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");


// middleware
function verifyToken(req,res,next){

const token = req.headers.authorization;

if(!token)
return res.status(401).json("Access denied");

try{

const verified = jwt.verify(
token,
process.env.JWT_SECRET
);

req.user = verified;

next();

}
catch(err){

res.status(400).json("Invalid token");

}

}


// ADD TASK
router.post("/", verifyToken, async(req,res)=>{

const task = new Task({

title:req.body.title,
userId:req.user.id

});

await task.save();

res.json(task);

});


// GET TASKS
router.get("/", verifyToken, async(req,res)=>{

const tasks = await Task.find({
userId:req.user.id
});

res.json(tasks);

});

// UPDATE TASK STATUS
router.put("/:id", verifyToken, async(req,res)=>{

await Task.findByIdAndUpdate(
req.params.id,
{
status:req.body.status
}
);

res.json("Task updated");

});


// DELETE TASK
router.delete("/:id", verifyToken, async(req,res)=>{

await Task.findByIdAndDelete(req.params.id);

res.json("Task deleted");

});


module.exports = router;
