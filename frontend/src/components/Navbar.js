import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar(){

const [user,setUser] = useState({});

const token = localStorage.getItem("token");

const headers = {
authorization: token
};


// FETCH USER NAME
useEffect(()=>{
fetchUser();
},[]);


const fetchUser = async()=>{

try{

const res = await axios.get(
"https://task-management-zj4r.onrender.com/api/auth/profile",
{ headers }
);

setUser(res.data);

}
catch(err){
console.log(err);
}

};


// LOGOUT
const logout = ()=>{
localStorage.removeItem("token");
window.location.href = "/login";
};



return(

<div className="bg-white border-b px-6 py-4 flex justify-between items-center">

<h2 className="text-lg font-semibold text-gray-700">

Welcome,
<span className="text-blue-600 ml-2">
{user.name || "User"}
</span>

</h2>


<button
onClick={logout}
className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
>
Logout
</button>

</div>

);

}
