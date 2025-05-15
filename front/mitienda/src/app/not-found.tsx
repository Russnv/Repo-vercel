// app/not-found.tsx
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <p className="text-gray-700 text-lg mt-4">¡Oops! Página no encontrada.</p>
      <p className="text-gray-500">Parece que la página que buscas no existe.</p>
      <Link href="/" className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        Volver al inicio
      </Link>
    </div>
  );
}
