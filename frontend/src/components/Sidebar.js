import { FaTasks, FaUser } from "react-icons/fa";

export default function Sidebar({setPage}){

return(

<div className="w-64 bg-white border-r min-h-screen p-6">

<h1 className="text-2xl font-bold text-blue-600 mb-8">
Dashboard
</h1>

<ul className="space-y-4">

<li
onClick={()=>setPage("dashboard")}
className="flex items-center gap-3 p-3 rounded hover:bg-blue-50 cursor-pointer"
>
<FaTasks className="text-blue-500"/>
<span>Dashboard</span>
</li>

<li
onClick={()=>setPage("profile")}
className="flex items-center gap-3 p-3 rounded hover:bg-blue-50 cursor-pointer"
>
<FaUser className="text-blue-500"/>
<span>Profile</span>
</li>

</ul>

</div>

);

}
