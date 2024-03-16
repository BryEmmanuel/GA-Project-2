import React from "react";
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <div className="text-black">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className=" text-[rgb(0,175,240)] md:text-7xl sm:text-5xl text-4xl font-bold md:py-3">
          OnlyBus
        </h1>
        <h2 className="leading-3 italic">"for now"</h2>
        <br />
        <p className="text-3xl font-bold p-2">Get bus arrival timings</p>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold">to&#160;</p>
          <ReactTyped
            className="md:text-5xl sm:text-4xl text-xl font-bold underline"
            strings={["your house", "GA", "haidilao"]}
            typeSpeed={80}
            backSpeed={50}
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
