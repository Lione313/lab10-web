"use client";

import { useEffect, useState } from "react";
import Navbar from '../../components/Navbar';

type User = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
  login: {
    uuid: string;
  };
};

export default function ClientPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://randomuser.me/api/?results=6&nat=us");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.results);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    }

    fetchUsers();

    // Siempre mostrar loading al menos 5 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Cleanup por si desmonta antes
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 text-gray-900 p-6 min-h-screen mt-16">
        <h1 className="text-3xl font-bold mb-8">Clients</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {loading
            ? Array(6).fill(0).map((_, i) => (
                <div
                  key={i}
                  role="status"
                  className="flex items-center justify-center h-56 max-w-2xl bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 mx-auto w-full"
                >
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ))
            : users.map((user) => (
                <div
                  key={user.login.uuid}
                  className="bg-white p-8 shadow rounded-lg text-center max-w-2xl mx-auto w-full"
                >
                  <img
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h2 className="font-semibold text-xl">
                    {user.name.first} {user.name.last}
                  </h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
