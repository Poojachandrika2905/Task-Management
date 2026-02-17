import { useState, useEffect } from "react";
import axios from "axios";

export default function TaskManager({ refreshStats }) {

const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [search, setSearch] = useState("");

const token = localStorage.getItem("token");

const headers = {
authorization: token
};


// FETCH TASKS
useEffect(() => {
fetchTasks();
}, []);

const fetchTasks = async () => {
try {

const res = await axios.get(
"https://task-management-zj4r.onrender.com/api/tasks",
{ headers }
);

setTasks(res.data);

}
catch(err){
console.log("Fetch error:", err);
}
};


// ADD TASK
const addTask = async () => {

if (!title.trim()) return;

try {

await axios.post(
"https://task-management-zj4r.onrender.com/api/tasks",
{ title },
{ headers }
);

setTitle("");

fetchTasks();

if(refreshStats) refreshStats();

}
catch(err){
console.log("Add error:", err);
}

};


// DELETE TASK
const deleteTask = async (id) => {

try {

await axios.delete(
"https://task-management-zj4r.onrender.com/api/tasks/" + id,
{ headers }
);

fetchTasks();

if(refreshStats) refreshStats();

}
catch(err){
console.log("Delete error:", err);
}

};


// MARK AS COMPLETE
const completeTask = async (task) => {

try {

await axios.put(
"https://task-management-zj4r.onrender.com/api/tasks/" + task._id,
{
status: task.status === "completed"
? "pending"
: "completed"
},
{ headers }
);

fetchTasks();

if(refreshStats) refreshStats();

}
catch(err){
console.log("Update error:", err);
}

};


// SEARCH FILTER
const filteredTasks = tasks.filter(task =>
task.title.toLowerCase().includes(search.toLowerCase())
);


return (

<div className="bg-white p-6 rounded shadow">

<h3 className="text-lg font-semibold mb-4">
Task Manager
</h3>


{/* ADD TASK */}
<div className="flex gap-3 mb-4">

<input
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Add new task..."
className="border p-2 flex-1 rounded"
/>

<button
onClick={addTask}
className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
>
Add
</button>

</div>


{/* SEARCH */}
<input
placeholder="Search tasks..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="border p-2 w-full mb-4 rounded"
/>


{/* TASK LIST */}
<div className="space-y-2">

{filteredTasks.map(task => (

<div
key={task._id}
className={`flex justify-between items-center p-3 rounded 
${task.status === "completed"
? "bg-green-100"
: "bg-blue-50"}`}
>

<span
className={`flex-1 ${
task.status === "completed"
? "line-through text-gray-500"
: ""
}`}
>
{task.title}
</span>


<div className="flex gap-3">

<button
onClick={() => completeTask(task)}
className={`px-3 py-1 rounded text-white ${
task.status === "completed"
? "bg-gray-500"
: "bg-green-500 hover:bg-green-600"
}`}
>
{task.status === "completed"
? "Completed"
: "Complete"}
</button>


<button
onClick={() => deleteTask(task._id)}
className="text-red-500"
>
Delete
</button>

</div>

</div>

))}

</div>

</div>

);

}
