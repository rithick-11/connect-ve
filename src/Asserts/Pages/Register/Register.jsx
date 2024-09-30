import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HashLoader} from "react-spinners";
import Cookies from "js-cookie";

import { LogoDark } from "../../Images/Logo/logos";

import { domainUrl } from "../../ServerData/apis";

const loginFrom = {
  email: "",
  password: "",
};

const Register = () => {
  const [register] = useSearchParams();
  const [loginFormData, setLoginForm] = useState(loginFrom);

  const [errMsg, setErrMsg] = useState({errMsg: "", isLoading: false});

  console.log(errMsg);
  

  const username = register.get("username");
  const navigate = useNavigate();

  const handelLoginForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm((pre) => ({ ...pre, [name]: value }));
  };

  const toLogin = async (e) => {
    e.preventDefault();
    const method = {
      method: "post",
      body: JSON.stringify({ ...loginFormData, username }),
      headers: {
        "Content-type": "application/json",
      },
    };
    setErrMsg({errMsg: "", isLoading: true})
    const loginApiCall = await fetch(`${domainUrl}/register/add-user`, method);
    const data = await loginApiCall.json();
    if (loginApiCall.status === 202) {
      Cookies.set("authtoken", data.token, { expires: 2 });
      navigate(`/${username}/auth`, { replace: true });
    } else if (loginApiCall.status === 400) {
      setErrMsg({errMsg:data.msg, isLoading: false});
    }
  };

  return (
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
          <h1 className="text-white md:text-xl">Create an accout</h1>
          <div className="flex w-full px-2 py-1 md:w-[270px] rounded-md shadow-sm gap-2 bg-white text-black">
            <label className="text-sm self-baseline">email</label>
            <input
              type="email"
              name="email"
              className="outline-none"
              placeholder="example@mail.com"
              onChange={handelLoginForm}
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
              placeholder="example@mail.com"
              onChange={handelLoginForm}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-3 py-1 rounded-md outline-none hover:bg-gray-800 flex items-center justify-center gap-3"
          >
            Connect {errMsg.isLoading && <HashLoader color="#fff" size={10} speedMultiplier={2} />}
          </button>
          <p>{errMsg.errMsg}</p>
        </form>
      </div>
    </section>
  );
};

export default Register;
