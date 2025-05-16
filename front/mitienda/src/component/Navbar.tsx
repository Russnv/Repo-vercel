"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from '../app/context/userContext';
import { useCart } from '../app/context/CartContext'

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const {user, logout, logged} = useAuth();
  const {cart,getCart} = useCart();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const router = useRouter();

useEffect(()=>{
 getCart();
},[]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/productos/search/${search}`);
    }
  };

const username: string = user?.user?.email ?? "default";
const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${username}&backgroundColor=fef3c7&radius=50`;

console.log("Navnar : " + cart.length);


  return (
    <nav className="text-white bg-green-600">
    <div className="flex items-center justify-between p-4">
      
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="w-12 h-12 border-2 border-white rounded-full shadow-md"
        />
        <span className="text-xl font-bold">MiTienda</span>
      </Link>
  
      <button
        className="text-3xl text-white md:hidden focus:outline-none"
        onClick={toggleMobileMenu}
      >
        ☰
      </button>
    </div>
  
   
    <div
      className={`${
        isMobileMenuOpen ? "block" : "hidden"
      } md:flex md:items-center md:justify-between px-4 pb-4 md:pb-0`}
    >
     
      <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <li>
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
  
        {!logged && (
          <>
            <li>
              <Link href="/register" className="hover:text-gray-300">
                Crear Cuenta
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          </>
        )}
  
        <li>
          <Link href="/productos" className="hover:text-gray-300">
            Productos
          </Link>
        </li>
      </ul>
  
     
      <form
        onSubmit={handleSearch}
        className="items-center gap-2 px-3 py-1 mb-4 bg-white rounded-full mt-4flex md:mt-0"
      >
        <input
          type="text"
          placeholder="Buscar producto..."
          className="px-2 py-1 text-gray-700 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="text-gray-900 hover:text-green-600"
        >
          🔍
        </button>
      </form>
  
     
      <ul className="flex flex-col gap-4 mt-4 md:flex-row md:items-center md:gap-6 md:mt-0">
        {logged && (
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:text-gray-300 focus:outline-none"
            > <div className="flex items-center gap-2">
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
            </button>
  
            {showDropdown && (
              <ul className="absolute right-0 z-10 w-48 py-2 mt-2 text-gray-700 bg-white rounded shadow-lg">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/Dashboard">Mi perfil</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/favoritos">Favoritos</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/historial">Historial de Compras</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <button
                    onClick={() => {                      
                      logout();
                      router.push("/login");
                    }}
                    className="w-full text-left"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            )}
          </li>
        )}
        
        <li>
          <Link href="/carrito" className="text-3xl hover:text-gray-300">
            🛒
          </Link>
          {logged && (
          <div><p className="flex items-center justify-center w-6 h-6 text-white bg-red-700 rounded-full">{cart.length}</p></div>
          )}
        </li>
      </ul>
    </div>
  </nav>
  );
}  

