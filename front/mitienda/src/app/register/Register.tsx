"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { newRegister } from "../services/Auth";

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
    phone: "",
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) => password.length >= 6;

  const isPhoneValid = (phone: string) => /^\d+$/.test(phone);

  const isFormComplete = Object.values(formData).every((value) => value !== "") &&
    isValidEmail(formData.email) &&
    isValidPassword(formData.password) &&
    isPhoneValid(formData.phone);

  useEffect(() => {
    const newErrors = { email: "", password: "", phone: "" };

    if (!formData.email) {
      newErrors.email = "El correo es requerido.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida.";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = "Debe tener al menos 6 caracteres.";
    }

    if (!formData.phone) {
      newErrors.phone = "El teléfono es requerido.";
    } else if (!isPhoneValid(formData.phone)) {
      newErrors.phone = "El teléfono solo debe contener números.";
    }

    setErrors(newErrors);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {

      const stringForm = JSON.stringify(formData)
      const UserForm = await newRegister(stringForm);
       if(UserForm)
      toast.success("✅ Registro exitoso!");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
    } catch (error) {
      console.error("Error en la petición:", error);
      toast.error("❌ Ocurrió un error al intentar registrarse");
    }
     if (!isFormComplete) {
      setMessage({
        type: "error",
        text: "Por favor, completá todos los campos correctamente.",
      });
      return;
    }
    setFormData({ email: "", password: "", name: "", address: "", phone: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Register</h1>

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
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Correo electrónico"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

        
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
          </div>

       
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

     
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2 text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

       
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Solo números"
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
          </div>

      
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded ${
              isFormComplete ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
