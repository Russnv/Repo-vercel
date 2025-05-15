
import "@fortawesome/fontawesome-free/css/all.min.css";

// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white p-6 mt-10">
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center justify-center mb-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <i className="text-2xl text-green-600 fab fa-x-twitter hover:text-green-400"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="text-2xl text-green-600 fab fa-facebook-f hover:text-green-400"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="text-2xl text-green-600 fab fa-instagram hover:text-green-400"></i>
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <i className="text-2xl text-green-600 fab fa-whatsapp hover:text-green-400"></i>
          </a>
          <a href="mailto:correo@ejemplo.com">
            <i className="text-2xl text-green-600 fas fa-envelope hover:text-green-400"></i>
          </a>
        </div>
        <p>© {new Date().getFullYear()} Mi Tienda - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
