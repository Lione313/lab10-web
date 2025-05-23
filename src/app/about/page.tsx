import Navbar from '../../components/Navbar';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white p-6 flex items-center justify-center">
        <section className="max-w-3xl w-full bg-black bg-opacity-40 backdrop-blur-md shadow-lg rounded-xl p-10 text-gray-100">
          <h1 className="text-4xl font-extrabold text-white mb-6 border-b border-white/50 pb-3">
            Sobre Nosotros
          </h1>
          <p className="text-lg leading-relaxed">
            ¡Bienvenido a nuestra tienda demo! Somos una empresa ficticia creada para mostrar las técnicas
            modernas de enrutamiento usando{" "}
            <span className="font-semibold text-teal-300">Next.js</span>.
          </p>
          <p className="mt-5 text-base text-gray-200">
            Este proyecto demuestra enrutamiento estático y dinámico, integración con APIs, y estilos con{" "}
            <span className="font-medium text-teal-400">Tailwind CSS</span>. Esperamos que disfrutes explorándolo.
          </p>
        </section>
      </main>
    </>
  );
}
