import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [errors,setErrors] = useState({});


// VALIDATE FUNCTION
const validate = () => {

let newErrors = {};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!email)
newErrors.email = "Email is required";
else if(!emailRegex.test(email))
newErrors.email = "Invalid email format";

if(!password)
newErrors.password = "Password is required";

return newErrors;

};


const handleLogin = async(e)=>{

e.preventDefault();

const validationErrors = validate();

if(Object.keys(validationErrors).length > 0){

setErrors(validationErrors);
return;

}

setErrors({});

try{

const res = await axios.post(
"https://task-management-zj4r.onrender.com/api/auth/login",
{email,password}
);

localStorage.setItem("token",res.data.token);

navigate("/dashboard");

}
catch(err){

setErrors({
general: err.response?.data || "Login failed"
});

}

};


return(

<div className="min-h-screen flex justify-center items-center bg-gray-100">

<div className="bg-white p-8 rounded shadow w-96">

<h2 className="text-xl font-bold mb-4">
Login
</h2>


{/* GENERAL ERROR */}
{errors.general && (
<p className="text-red-500 mb-3">
{errors.general}
</p>
)}


{/* EMAIL */}
<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Email"
className={`border p-2 w-full mb-1 rounded
${errors.email ? "border-red-500" : email ? "border-green-500" : ""}`}
/>

{errors.email && (
<p className="text-red-500 text-sm mb-2">
{errors.email}
</p>
)}


{/* PASSWORD */}
<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
placeholder="Password"
className={`border p-2 w-full mb-1 rounded
${errors.password ? "border-red-500" : password ? "border-green-500" : ""}`}
/>

{errors.password && (
<p className="text-red-500 text-sm mb-2">
{errors.password}
</p>
)}


<button
onClick={handleLogin}
className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded mt-2"
>
Login
</button>


<p className="mt-3">

No account?

<button
onClick={()=>navigate("/register")}
className="text-blue-500 ml-1"
>
Register
</button>

</p>

</div>

</div>

);

}
