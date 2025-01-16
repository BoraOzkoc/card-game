// src/components/LoadingScreen.tsx
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="text-center flex flex-col justify-cente items-center">
        <div className="flex justify-center items-center loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
        <p className="mt-4 text-lg font-semibold">Loading Data...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
