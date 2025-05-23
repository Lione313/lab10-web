"use client";

import { useState } from "react";

export default function LaunchButton() {
  const [launching, setLaunching] = useState(false);

  const handleLaunch = () => {
    if (!launching) {
      setLaunching(true);
      setTimeout(() => setLaunching(false), 3000); // duración animación
    }
  };

  return (
    <button
      onClick={handleLaunch}
      className="relative inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition overflow-hidden w-48 h-16"
      style={{ backgroundColor: "#ffffff", color: "#2563eb" }} 
      aria-label="Comenzar"
    >
    
      <span
        className={`transition-opacity duration-300 ${
          launching ? "opacity-0" : "opacity-100"
        }`}
      >
        Comenzar
      </span>

      
      <div
        className={`absolute right-4 bottom-3 w-10 h-10 transition-transform duration-300 ${
          launching ? "animate-rocket-launch" : ""
        }`}
      >
        <img
          src="https://c0.klipartz.com/pngpicture/37/989/gratis-png-cohetes-de-contenido-de-cohetes-s-de-juguetes.png"
          alt="Cohete"
          className="w-full h-full object-contain"
          style={{ background: "transparent" }}
        />
        
        <div
          className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-6 rounded-full blur-md opacity-0 ${
            launching ? "opacity-100 animate-rocket-flame" : ""
          }`}
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.8), transparent)" }}
        />
      </div>

      <style jsx>{`
        @keyframes rocket-launch {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
          100% {
            transform: translateY(-30px) scale(1.2);
          }
        }
        @keyframes rocket-flame {
          0%, 100% {
            opacity: 0.8;
            transform: translateY(0) scaleY(1);
          }
          50% {
            opacity: 1;
            transform: translateY(4px) scaleY(1.3);
          }
        }
        .animate-rocket-launch {
          animation: rocket-launch 3s forwards;
        }
        .animate-rocket-flame {
          animation: rocket-flame 0.6s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
}
