// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
