import React from "react";

export default function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative max-w-4xl w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-400"
        >
          ✖
        </button>

        {/* Full image */}
        <img
          src={image}
          alt="Full Issue"
          className="w-full max-h-[90vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
}
