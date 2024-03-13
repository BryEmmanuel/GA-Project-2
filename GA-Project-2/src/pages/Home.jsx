import React from "react";
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <div className="text-black underline">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2">Get bus arrival timings</p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Fast & Simple
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold">
            Suitable for bus
          </p>
          <ReactTyped
            className="md:text-5xl sm:text-4xl text-xl font-bold"
            strings={["STOPS", "CODES"]}
            typeSpeed={120}
            backSpeed={70}
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
