import React from "react";
export const dynamic = 'force-static';

type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
};

export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetail({ params }: any) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, { cache: "no-store" });
  const product: Product = await res.json();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img src={product.image} alt={product.title} className="w-64 h-64 object-contain mx-auto mb-4" />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-700 my-2">{product.description}</p>
      <p className="text-lg font-semibold text-green-700">${product.price}</p>
    </div>
  );
}
