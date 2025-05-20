'use client';


import toast from "react-hot-toast";
import {useAuth} from "../context/userContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Dashboard () {
    const {user,logged} = useAuth();
     const router = useRouter();



    useEffect(() => {
    if (!logged) {
      toast.error("❌Necesitás estar logueado para acceder al Dashboard");
      router.replace("/login");
    }
  }, [logged]);
  
if (!logged) return null;

   const username = user?.user.email;
const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${username}&backgroundColor=fef3c7&radius=50`;

   
    return (
       <div className="flex items-center justify-center bg-gray-100 min-w-screen">
  <div className="w-full max-w-md p-6 mt-10 bg-white border border-gray-300 shadow-lg rounded-xl">
    
      <>
        <h2 className="mb-4 text-2xl font-bold text-center text-green-600">✅ Identidad Validada</h2>
           <div className="flex items-center gap-2">
              <img
                src={avatarUrl}
                alt="Avatar de usuario"
                width={70}
                height={55}
                className="border-2 border-white rounded-full shadow-md"
              />
              <span className="text-sm font-medium text-gray-700">
                {user?.user?.name}
              </span>
              </div>
        <p><span className="text-sm font-bold text-green-600">Email:</span> {user?.user.email}</p>
        <p><span className="text-sm font-bold text-green-600">Dirección:</span> {user?.user.address}</p>
        <p><span className="text-sm font-bold text-green-600">Telefono:</span> {user?.user.phone}</p> 
      </>
  </div>
</div>

    );
}