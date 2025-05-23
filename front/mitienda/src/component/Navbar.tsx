"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../app/context/userContext";
import { useCart } from "../app/context/CartContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, logged } = useAuth();
  const { cart, getCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    getCart();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/productos/search/${search}`);
    }
  };

  const username: string = user?.user?.email ?? "default";
  const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${username}&backgroundColor=fef3c7&radius=50`;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
          className="flex items-center gap-2 px-3 py-1 mt-4 mb-4 bg-white rounded-full md:mt-0"
        >
          <input
            type="text"
            placeholder="Buscar producto..."
            className="px-2 py-1 text-gray-700 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="text-gray-900 hover:text-green-600">
            🔍
          </button>
        </form>

     
        <ul className="flex flex-col gap-4 mt-4 md:flex-row md:items-center md:gap-6 md:mt-0">
          {logged && (
            <li
              className="relative"
              onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
              onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
            >
              <div
                className="flex items-center gap-2 cursor-pointer hover:opacity-90"
                onClick={() => isMobile && setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={avatarUrl}
                  alt="Avatar de usuario"
                  width={50}
                  height={50}
                  className="border-2 border-white rounded-full shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-amber-50">
                    {user?.user?.name}
                  </span>
                  <span className="text-xs text-white">Mi cuenta ▼</span>
                </div>
              </div>

              {isDropdownOpen && (
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

          <li className="relative">
            <button
              onClick={() => {
                if (!logged) {
                  toast("❌Debes iniciar sesión para agregar al carrito 😢");
                  setTimeout(() => {
                    router.push("/login");
                  }, 2000);
                } else {
                  router.push("/carrito");
                }
              }}
              className="relative text-3xl hover:text-gray-300 focus:outline-none"
            >
              🛒
            </button>

            {logged && cart.length > 0 && (
                <p className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-700 rounded-full shadow-md -bottom-3 -right-2">
                  {cart.length}
                </p>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
