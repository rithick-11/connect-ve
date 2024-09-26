import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { LogoDark } from "../../Images/Logo/logos";

const loginFrom = {
  email:"",
  password:""
}

const Register = () => {
  const [register, setRegister] = useSearchParams();
  const [loginFormData, setLoginForm] = useState(loginFrom)

  const username = register.get("username");

  const handelLoginForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm(pre => ({...pre, [name]: value}))
  }

  const toLogin = async (e) => {
    e.preventDefault()
    console.log(loginFormData)
  }

  return (
    <section className="h-screen bg-[#ff4c1b] px-4 sm:px-8 md:px-28 py-3">
      <div className="h-full flex flex-col items-center justify-center">
        <div>
          <img src={LogoDark} alt="logo" className="h-[80px] md:h-[120px]" />
          <h1 className="text-sm md:text-lg text-white text-center">
            Hey @{username} 👋
          </h1>
        </div>
        <form className="mt-5 md:w-1/2 flex flex-col justify-center items-start gap-3 " onSubmit={toLogin}>
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
          <button type="submit" className="bg-black text-white px-3 py-1 rounded-md outline-none hover:bg-gray-800 flex items-center justify-center gap-3">
            Connect
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
