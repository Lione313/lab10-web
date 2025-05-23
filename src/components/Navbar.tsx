"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Sobre Nosotros" },
  { href: "/products", label: "Productos" },
  { href: "/contact", label: "Contacto" },
  { href: "/client", label: "Clientes" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/90 via-black/80 to-blue-950/90 backdrop-blur-md shadow-lg",
        "text-white font-semibold transition-colors duration-300"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo o título */}
        <div className="text-xl font-bold">Toma tu Gaaa</div>

        {/* Botón hamburguesa - solo visible en móvil */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {/* Icono hamburguesa / cruz */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menú escritorio */}
        <div className="hidden md:flex gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "relative px-3 py-2 transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-white after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300",
                {
                  "text-red-300 after:scale-x-100": pathname === href,
                  "hover:text-red-200 hover:after:scale-x-100": pathname !== href,
                }
              )}
              onClick={() => setIsOpen(false)} // cerrar menú si se hace click en móvil
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden bg-blue-950/95 backdrop-blur-md shadow-inner">
          <div className="flex flex-col gap-4 px-6 py-4">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "block px-3 py-2 rounded transition-colors duration-300",
                  {
                    "text-red-300 bg-blue-900": pathname === href,
                    "hover:text-red-200 hover:bg-blue-800": pathname !== href,
                  }
                )}
                onClick={() => setIsOpen(false)} // cerrar menú al click
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
