import React from "react";

export default function Header() {
  return (
    <header className="flex items-center p-4 bg-white shadow-md">
      <img
        src="/bigger.jpg"
        alt="Logo"
        className="h-20 w-25 object-cover rounded-full mr-4"
      />
      <h1 className="text-3xl font-bold text-gray-800">CivicLink</h1>
    </header>
  );
}