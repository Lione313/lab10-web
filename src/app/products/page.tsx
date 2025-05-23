"use client";

import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingProduct from "../../components/LoadingProduct";
type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

 useEffect(() => {
  async function fetchProducts() {
    setLoadingProducts(true);
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);

    // Esperar 10 segundos para simular carga lenta
    await new Promise((resolve) => setTimeout(resolve, 10000));

    setLoadingProducts(false);
  }
  fetchProducts();
}, []);


  useEffect(() => {
    const url = new URL(window.location.href);
    const productId = url.searchParams.get("product");
    if (productId) {
      openModal(+productId);
    } else {
      setSelectedProduct(null);
    }
  }, [pathname]);

  async function openModal(id: number) {
    setLoadingProduct(true);
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    setSelectedProduct(data);
    setLoadingProduct(false);
    router.push(`?product=${id}`);
  }

  function closeModal() {
    setSelectedProduct(null);
    router.push("/products", );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-6 mt-20">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Productos</h1>

          {loadingProducts ? (
  <LoadingProduct />
) : (
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Título</th>
                  <th className="border border-gray-300 px-4 py-2 text-center text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">{product.title}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <button
                        onClick={() => openModal(product.id)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        aria-label={`Ver detalles de ${product.title}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal */}
        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col md:flex-row opacity-0 animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold transition"
                onClick={closeModal}
                aria-label="Cerrar modal"
              >
                ×
              </button>

              {loadingProduct ? (
                <div className="flex-1 p-6 flex flex-col space-y-4 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-48 bg-gray-300 rounded"></div>
                  <div className="h-20 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <>
                  <div className="md:w-1/2 bg-gray-100 p-6 flex items-center justify-center">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                      className="max-h-64 object-contain"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 overflow-y-auto">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedProduct.title}</h2>
                    <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(-10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </>
  );
}
