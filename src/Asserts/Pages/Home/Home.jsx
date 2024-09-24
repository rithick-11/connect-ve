import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div class="absolute top-0 -z-10 h-full w-full bg-white">
        <div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1>Connect ve</h1>
        <p>Grow your connect with us</p>
        <div>
          <div>
            <div className="bg-slate-300">
              <label>connect-ve/</label>
              <input className="bg-transparent px-1" placeholder="rithick" />
            </div>

          </div>
           <Link to={`/register`}>Get Started</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
