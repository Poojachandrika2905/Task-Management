import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskManager from "../components/TaskManager";
import Profile from "../components/Profile";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Dashboard(){

const [page,setPage]=useState("dashboard");

const [stats,setStats]=useState({
total:0,
completed:0,
pending:0
});

const [username,setUsername]=useState("");

const token = localStorage.getItem("token");


/* GET USERNAME FROM TOKEN */
useEffect(()=>{

if(token){
try{
const decoded = jwtDecode(token);
setUsername(decoded.name);
}
catch(err){
console.log(err);
}
}

fetchStats();

},[]);



/* FETCH TASK STATS */
const fetchStats = async()=>{

try{

const res = await axios.get(
"https://task-management-zj4r.onrender.com/api/tasks",
{
headers:{authorization:token}
}
);

const tasks = res.data;

const total = tasks.length;

const completed = tasks.filter(
task=>task.status==="completed"
).length;

const pending = tasks.filter(
task=>task.status==="pending"
).length;

setStats({
total,
completed,
pending
});

}
catch(err){
console.log(err);
}

};



return(

<div className="flex bg-slate-50 min-h-screen">

<Sidebar setPage={setPage}/>

<div className="flex-1">

{/* PASS USERNAME TO NAVBAR */}
<Navbar username={username}/>

<div className="p-6">

{page==="dashboard" && (

<>

{/* WELCOME MESSAGE */}
<h2 className="text-xl font-semibold mb-4">
Welcome, <span className="text-blue-600">{username}</span>
</h2>


{/* STATS */}
<div className="grid grid-cols-3 gap-6 mb-6">

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Total Tasks</p>
<p className="text-2xl font-bold text-blue-600">
{stats.total}
</p>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Completed</p>
<p className="text-2xl font-bold text-green-500">
{stats.completed}
</p>
</div>

<div className="bg-white p-6 rounded shadow">
<p className="text-gray-500">Pending</p>
<p className="text-2xl font-bold text-orange-500">
{stats.pending}
</p>
</div>

</div>


{/* TASK MANAGER */}
<TaskManager refreshStats={fetchStats}/>

</>

)}

{page==="profile" && <Profile/>}

</div>

</div>

</div>

);

}
