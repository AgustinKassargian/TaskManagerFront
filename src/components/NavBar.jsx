import React, { useState, useRef, useEffect } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // Icono de "X" para cerrar el menú
import { useAuth } from "./AuthContext";

function NavBar({ handleLogout }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referencia al contenedor del menú móvil
  const { user } = useAuth();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // useEffect para manejar clics fuera del menú móvil
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false); // Cierra el menú si el clic está fuera del contenedor
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Escucha clics fuera
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Limpia el listener
    };
  }, []);

  return (
    <nav className="bg-zinc-600 w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <label className="text-white text-xl font-bold">
              Bienvenid@ a TaskManager {user?.username}!
            </label>
          </div>

          <div className="hidden md:flex space-x-4">
            <a className="flex flex-row items-center gap-2 cursor-pointer hover:bg-zinc-500 px-3 py-2 rounded-md text-sm font-medium">
              <FaGithub className="text-xl" />
              <span>GitHub</span>
            </a>
            <a className="flex flex-row items-center gap-2 cursor-pointer hover:bg-zinc-500 px-3 py-2 rounded-md text-sm font-medium">
              <FaLinkedin className="text-xl" />
              <span>LinkedIn</span>
            </a>
            <div
              className="flex flex-row items-center gap-2 cursor-pointer hover:bg-zinc-500 px-3 py-2 rounded-md text-sm font-medium"
              onClick={handleLogout}
            >
              <RiLogoutBoxRLine className="text-xl" />
              <span>Cerrar Sesión</span>
            </div>
          </div>

          {/* Botón para menú móvil */}
          <div className="md:hidden">
            <button
              id="mobile-menu-button"
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <IoClose className="h-6 w-6" /> // Icono de "X"
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        ref={menuRef} // Agrega la referencia al contenedor
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 w-full bg-zinc-600 z-50`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a className="flex flex-row items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            <FaGithub className="text-xl" />
            <span>GitHub</span>
          </a>
          <a className="flex flex-row items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            <FaLinkedin className="text-xl" />
            <span>LinkedIn</span>
          </a>
          <div
            className="flex flex-row items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={handleLogout}
          >
            <RiLogoutBoxRLine className="text-xl" />
            <span>Cerrar Sesión</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
