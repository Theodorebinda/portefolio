// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="fixed flex items-center justify-center m-auto inset-0 bg-blue-50 z-50  h-screen ">
      <div className="flex items-center justify-center m-auto h-[50vh]   ">
        <div
          className={` w-20 h-20 border-t-4 border-blue-600 border-solid rounded-full animate-spin `}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
