"use client";

import { ENV } from "@/config/envs";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/userContext";

export const Login: React.FC = () => {
  const { login } = useAuth();

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string): boolean =>
    password.length >= 6;

  const isFormComplete =
    formData.email !== "" &&
    formData.password !== "" &&
    isValidEmail(formData.email) &&
    isValidPassword(formData.password);

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
      newErrors.password = "Debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      setMessage({
        type: "error",
        text: "Por favor, completá correctamente todos los campos.",
      });
      return;
    }

    submitLogin();
  };

  const submitLogin = async () => {
    try {
      const response = await fetch(`${ENV.API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        setMessage({ type: "success", text: "¡Login exitoso!" });

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setMessage({
          type: "error",
          text: "Los datos ingresados no son correctos.",
        });
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setMessage({
        type: "error",
        text: "Ocurrió un error al intentar iniciar sesión.",
      });
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">Iniciar Sesión</h2>

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
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
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

        
          <div className="mb-6">
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
              placeholder="Ingrese su contraseña"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormComplete}
            className={`w-full px-4 py-2 text-white rounded transition duration-200 ${
              isFormComplete
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
