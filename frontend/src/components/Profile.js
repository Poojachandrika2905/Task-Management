import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile(){

const [user,setUser] = useState({});
const [editMode,setEditMode] = useState(false);
const [name,setName] = useState("");
const [email,setEmail] = useState("");

const token = localStorage.getItem("token");

const headers = {
authorization: token
};


// FETCH PROFILE
useEffect(()=>{
fetchProfile();
},[]);


const fetchProfile = async()=>{

try{

const res = await axios.get(
"https://task-management-zj4r.onrender.com/api/auth/profile",
{headers}
);

setUser(res.data);
setName(res.data.name);
setEmail(res.data.email);

}
catch(err){
console.log(err);
}

};


// UPDATE PROFILE
const updateProfile = async()=>{

try{

const res = await axios.put(
"https://task-management-zj4r.onrender.com/api/auth/profile",
{
name,
email
},
{headers}
);

setUser(res.data);
setEditMode(false);

alert("Profile updated successfully");

}
catch(err){
console.log(err);
}

};


return(

<div className="bg-white p-6 rounded shadow max-w-md">

<h2 className="text-xl font-semibold mb-4">
User Profile
</h2>


{/* Avatar */}
<div className="flex items-center gap-4 mb-4">

<div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">

{user.name ? user.name.charAt(0).toUpperCase() : "U"}

</div>

</div>


{/* Edit Mode */}
{editMode ? (

<div className="space-y-3">

<input
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-2 w-full rounded"
/>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border p-2 w-full rounded"
/>

<button
onClick={updateProfile}
className="bg-green-500 text-white px-4 py-2 rounded"
>
Save
</button>

<button
onClick={()=>setEditMode(false)}
className="ml-2 text-gray-500"
>
Cancel
</button>

</div>

) : (

<div>

<p className="font-semibold">
{user.name}
</p>

<p className="text-gray-500 mb-4">
{user.email}
</p>

<button
onClick={()=>setEditMode(true)}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Edit Profile
</button>

</div>

)}

</div>

);

}
