// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]  ">
      <div
        className={` w-20 h-20 border-t-4 border-blue-600 border-solid rounded-full animate-spin `}
      ></div>
    </div>
  );
};

export default Loader;
