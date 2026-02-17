import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskManager from "../components/TaskManager";
import Profile from "../components/Profile";
import axios from "axios";

export default function Dashboard(){

const [page,setPage]=useState("dashboard");

const [stats,setStats]=useState({
total:0,
completed:0,
pending:0
});

const token = localStorage.getItem("token");

useEffect(()=>{
fetchStats();
},[]);


const fetchStats = async()=>{

const res = await axios.get(
"http://localhost:5000/api/tasks",
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

};


return(

<div className="flex bg-slate-50">

<Sidebar setPage={setPage}/>

<div className="flex-1">

<Navbar/>

<div className="p-6">

{page==="dashboard" && (

<>

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

<TaskManager refreshStats={fetchStats}/>

</>

)}

{page==="profile" && <Profile/>}

</div>

</div>

</div>

);

}
