"use client";

import Navbar from "../../components/Navbar";
import { useState } from "react";
import { showMessage } from "@/services/messageService";

type Social = {
  name: string;
  icon: React.ReactNode;
  infoFront: string;
  infoBack: string;
  url?: string;
};

const socials: Social[] = [
  {
    name: "Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-pink-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" />
      </svg>
    ),
    infoFront: "Instagram",
    infoBack: "@miusuario",
    url: "https://instagram.com/miusuario",
  },
  {
    name: "Twitter",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-blue-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.97-2.48 9.07 9.07 0 01-2.87 1.1 4.52 4.52 0 00-7.69 4.12A12.8 12.8 0 013 4.8a4.52 4.52 0 001.4 6.03 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.62 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.21 3.13A9.05 9.05 0 012 19.54 12.78 12.78 0 008.29 21c7.54 0 11.68-6.25 11.68-11.68 0-.18 0-.35-.01-.53A8.18 8.18 0 0023 3z" />
      </svg>
    ),
    infoFront: "Twitter",
    infoBack: "@mitwitter",
    url: "https://twitter.com/mitwitter",
  },
  {
    name: "Facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-blue-700"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M22 12a10 10 0 10-11.5 9.86v-6.96h-2.3v-2.9h2.3v-2.2c0-2.27 1.35-3.53 3.42-3.53.99 0 2.02.18 2.02.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42v1.92h2.5l-.4 2.9h-2.1v6.96A10 10 0 0022 12z" />
      </svg>
    ),
    infoFront: "Facebook",
    infoBack: "facebook.com/mipagina",
    url: "https://facebook.com/mipagina",
  },
  {
    name: "Gmail",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a3 3 0 003.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    infoFront: "Gmail",
    infoBack: "contacto@ejemplo.com",
  },
];

export default function ContactPage() {
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Estado para mostrar el mensaje temporal
  const [message, setMessage] = useState("");

  function toggleFlip(name: string) {
    setFlipped((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    showMessage(
      setMessage,
      `Mensaje enviado:\nNombre: ${formData.name}\nEmail: ${formData.email}\nMensaje: ${formData.message}`,
      4000
    );

    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-6 mt-20 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Contáctanos</h1>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded border border-green-300 whitespace-pre-line">
            {message}
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
          {socials.map(({ name, icon, infoFront, infoBack, url }) => (
            <div
              key={name}
              onClick={() => toggleFlip(name)}
              className="relative cursor-pointer perspective h-32"
              aria-label={`Ver información de ${name}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleFlip(name)}
            >
              <div
                className={`relative w-full h-full text-center transition-transform duration-700 transform-style-preserve-3d ${
                  flipped[name] ? "rotate-y-180" : ""
                }`}
              >
              
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-md border border-gray-300 p-4 backface-hidden">
                  {icon}
                  <span className="mt-4 font-semibold text-lg">{infoFront}</span>
                </div>


                <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50 rounded-lg shadow-md border border-gray-300 p-4 rotate-y-180 backface-hidden">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {infoBack}
                    </a>
                  ) : (
                    <span className="text-gray-700">{infoBack}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Envía un mensaje</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-300"
          >
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-gray-600">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </form>
        </section>
      </main>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </>
  );
}
