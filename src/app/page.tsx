import './globals.css'
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import LaunchButton from '@/components/LaunchButton'  // <-- Importa aquí

export const metadata = {
  title: 'Lab 10 - Web',
  description: 'Lab using Next.js routing con Tailwind',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-10">
          <section className="text-center max-w-3xl mx-auto mt-20">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
              Bienvenido a Lab 10 - Web
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Aquí aprenderás a usar Next.js con routing y Tailwind CSS para crear aplicaciones web modernas y rápidas.
            </p>
          </section>

          <div className="mt-12">{children}</div>
        </main>

        <footer className="w-full py-20 flex justify-center">
          <LaunchButton />
        </footer>
      </body>
    </html>
  )
}
