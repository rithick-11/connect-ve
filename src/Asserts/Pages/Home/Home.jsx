import React, { useState } from "react";
import { HashLoader} from "react-spinners";
import { LogoDark } from "../../Images/Logo/logos";
import { useNavigate } from "react-router-dom";

import { domainUrl } from "../../ServerData/apis";

const Home = () => {
  const [username, setUsername] = useState("");
  const [chechLoader, setCheckLoader] = useState(false);
  const [respoanse, setResopanse] = useState({ msg: "" });

  const navigate = useNavigate()

  const chechUserAvailabity = async () => {
    if(username === ""){
      setResopanse({msg:"enter username"})
      return
    }
    setCheckLoader(true);
    setResopanse({msg:""})
    if (["register"].includes(username)) {
      setResopanse({ msg: "this is realted to official porpuse" });
      setCheckLoader(false)
      return
    }

    const apiCheckApiCall = await fetch(`${domainUrl}/register/check?username=${username}`)
    const {status} = await apiCheckApiCall.json()

    if(status){
      setCheckLoader(false)
      setResopanse({msg:"enjoy"})
      navigate(`/register?username=${username}&signup=false`, { replace: true })
    }else{
      setCheckLoader(false)
      setResopanse({msg:"try something new !!"})
      return
    }
  };

  return (
    <section className="home-page bg-[#ff4c1b] h-screen">
      <div className="md:grid grid-cols-5 gap-4 h-full ">
        <div className="px-3 py-5 col-span-3 my-auto flex justify-center items-center flex-col gap-4 ">
          <img
            src={LogoDark}
            alt="logo"
            className="h-[150px] md:h-[270px] md:mt-0 md:self-center  self-start mt-16"
          />
          <h1 className="text-yellow-50 ">
            One Link, All Profiles - Your Online World in One Place!
          </h1>
          <p className="hidden text-sm font-light md:block w-[60%] mt-5 text-center text-yellow-50">
            managing multiple social media profiles can be overwhelming. With
            just one link, you can now connect your entire online presence in a
            seamless
          </p>
        </div>
        <div className="col-span-2 md:my-auto px-5 mt-16 md:block flex flex-col items-end">
          <p className=" text-yellow-50 mb-4">Chech availabity....</p>
          <div className="bg-white w-fit px-3 py-2 rounded-sm">
            <label>connect.ve/</label>
            <input
              type="text"
              className="outline-none px-1"
              onChange={(e) => {
                setUsername(e.target.value.toLowerCase());
              }}
              value={username}
              placeholder="rithick"
            />
          </div>
          <button
            className="bg-black text-white px-3 py-1 rounded-md mt-2 outline-none hover:bg-gray-800 flex items-center justify-center gap-3"
            onClick={chechUserAvailabity}
          >
            Check{" "}
            {chechLoader && (
              <HashLoader color="#fff" size={10} speedMultiplier={2} />
            )}
          </button>
          <p className="mt-3">{respoanse.msg}</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
