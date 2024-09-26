import React from "react";
import { PacmanLoader } from "react-spinners";

const LoaderF = () => {
  return (
    <section className="h-screen bg-[#ff4c1b] flex justify-center items-center">
      <PacmanLoader margin={1} size={20} speedMultiplier={1} />
    </section>
  );
};

export default LoaderF;
