import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import { LogoDark } from "../../Images/Logo/logos";
import { domainUrl } from "../../ServerData/apis";
import { LoaderF } from "../../Components/somponents";

const LoginAuth = () => {
  const { username } = useParams();

  const [loader, setLoader] = useState(true);

  const [loginFormData, setLoginForm] = useState({ username, password: "" });

  const navigate = useNavigate();

  const handelLoginForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm((pre) => ({ ...pre, [name]: value }));
  };

  const cheackUser = async () => {
    const apiCheckApiCall = await fetch(
      `${domainUrl}/register/check?username=${username}`
    );
    const { status } = await apiCheckApiCall.json();

    if (status) {
      navigate("/");
    } else {
      setLoader(false);
      return;
    }
  };

  useEffect(() => {
    cheackUser();
    if (Cookies.get("authtoken") !== undefined) {
      navigate(`/${username}/auth`)
      return
    }
  }, []);

  const toLogin = async (e) => {
    e.preventDefault();
    const method = {
      method: "post",
      body: JSON.stringify({ ...loginFormData, username }),
      headers: {
        "Content-type": "application/json",
      },
    };
    const loginApiCall = await fetch(`${domainUrl}/register/add-user`, method);
    const { token } = await loginApiCall.json();
    Cookies.set("authtoken", token, { expires: 2 });
    navigate(`/${username}/auth`);
  };

  const renderView = () => {
    return loader ? (
      <LoaderF />
    ) : (
      <section className="h-screen bg-[#ff4c1b] px-4 sm:px-8 md:px-28 py-3">
        <div className="h-full flex flex-col items-center justify-center">
          <div>
            <img src={LogoDark} alt="logo" className="h-[80px] md:h-[120px]" />
            <h1 className="text-sm md:text-lg text-white text-center">
              Hey @{username} 👋
            </h1>
          </div>
          <form
            className="mt-5 md:w-1/2 flex flex-col justify-center items-start gap-3 "
            onSubmit={toLogin}
          >
            <h1 className="text-white md:text-xl">Login to Continue</h1>
            <div className="flex w-full px-2 py-1 md:w-[270px] rounded-md shadow-sm gap-2 bg-white text-black">
              <label className="text-sm self-baseline">username</label>
              <input
                type="text"
                name="usename"
                className="outline-none"
                placeholder="rithick"
                value={username}
                onChange={handelLoginForm}
                disabled={true}
                required
              />
            </div>
            <div className="flex w-full px-2 py-1 md:w-[270px] rounded-md shadow-sm gap-2 bg-white text-black">
              <label className="text-sm">password</label>
              <input
                type="password"
                name="password"
                className="outline-none"
                ame="outline-none"
                placeholder=""
                onChange={handelLoginForm}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-3 py-1 rounded-md outline-none hover:bg-gray-800 flex items-center justify-center gap-3"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    );
  };

  return renderView();
};

export default LoginAuth;
