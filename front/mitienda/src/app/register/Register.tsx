"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ENV } from "@/config/envs";

export const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
  };
  useEffect(() => {
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "El correo es requerido.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida.";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.email || errors.password) {
      setMessage({ type: "error", text: "Por favor, corrige los errores." });
      return;
    }
    console.log("Form data submitted:", formData);

    toast("✅ Registro exitoso!");
    setTimeout(() => {
      router.push("/login");
    }, 1500);

    setFormData({ email: "", password: "", name: "", address: "", phone: "" });

    try {
      const fecthUser = async () => {
        await fetch(`${ENV.API_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      };

      fecthUser();
    } catch (error) {
      console.error("Error en la petición:", error);
      toast("❌ Ocurrió un error al intentar registrarse");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md ">
        <h1 className="mb-4 text-2xl font-bold text-center ">Register</h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ingrese su correo electrónico"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ingrese una contraseña"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="address">
              Direccion
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="phone">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setFormData({ ...formData, phone: value });
                }
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
