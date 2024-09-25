import React from "react";
import { LogoDark } from "../../Images/Logo/logos";

const Home = () => {
  return (
    <section className="home-page bg-[#ff4c1b] h-screen">
      <div className="md:grid grid-cols-5 gap-4 h-full ">
        <div className=" py-5 col-span-3 my-auto flex justify-center items-center flex-col ">
          <img src={LogoDark} alt="logo" className="h-[220px] md:h-[330px] md:mt-0 md:self-center  self-start mt-16" />
          <h1 className="text-yellow-50 ">One Link, All Profiles – Your Online World in One Place!</h1>
          <p className="hidden md:block w-[60%] mt-5 text-center text-yellow-50">managing multiple social media profiles can be overwhelming. With just one link, you can now connect your entire online presence in a seamless</p>
        </div>
        <div className="col-span-2 md:my-auto px-5 mt-16 md:block flex flex-col items-end">
          <p className=" text-yellow-50 mb-4">Chech availabity....</p>
          <div className="bg-white w-fit px-3 py-2 rounded-sm">
            <label>connect.ve/</label>
            <input type="text" className="outline-none px-1" />
          </div>
          <button className="bg-black text-white px-3 py-1 rounded-md mt-2 outline-none hover:bg-gray-800">Check</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
