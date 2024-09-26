import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdOutlineDomainVerification } from "react-icons/md";

import { domainUrl } from "../../ServerData/apis";
import { LoaderF } from "../../Components/somponents";

const constApiData = {
  initail: "initail",
  peding: "pending",
  success: "success",
  fail: "fail",
};

const UserDetail = () => {
  const { username } = useParams();
  const [apiResponse, setApiResponse] = useState({
    status: constApiData.initail,
    data: {},
  });
  const [editData, setEdit] = useState(false)

  const navigate = useNavigate();

  const feedUserDAta = async () => {
    setApiResponse((pre) => ({ ...pre, status: constApiData.peding }));
    const getUserDataApi = await fetch(`${domainUrl}/users/${username}`);
    if (getUserDataApi.status === 400) {
      navigate("/");
    } else if (getUserDataApi.status === 200) {
      const res = await getUserDataApi.json();
      setApiResponse((pre) => ({
        ...pre,
        status: constApiData.success,
        data: res,
      }));
    }else{
      setApiResponse((pre) => ({ ...pre, status: constApiData.fail }));
    }
  };

  useEffect(() => {
    feedUserDAta();
  }, []);

  const handelEdit = () =>{
    setEdit(pre => !pre)
  }


  const renderUserPage = () => {
    const {data} = apiResponse
    const {userinfo} = data
    const {username, name, avatorUrl, email} = userinfo

    const inputClassName = "outline-none border-[1px] rounded-md bg border-[#ffffff50] px-2 py-1 bg-transparent"

    return(
      <section className="h-screen bg-[#ff4c1b]">
        <nav className="px-4 sm:px-8 md:px-28 py-2 bg-black text-white flex justify-between items-center">
          <h1 className="text-lg">@{username}</h1>
          <button className={`${editData ?  "bg-green-600" : "bg-blue-600"} px-2 py-1 rounded-md flex items-center gap-2`} onClick={handelEdit}>
            {editData ? <>
              <p>save</p>
              <MdOutlineDomainVerification />
            </>: <>
              <p>edit</p><FaPen />
            </>}
          </button>
        </nav>
        <div className="px-4 sm:px-8 md:px-28 py-2 mt-2 flex flex-col items-start">
          <div className="self-center text-center flex flex-col gap-2">
            <img src={avatorUrl} alt={username} className="bg-[#ffffff50] rounded-full p-1 h-24 md:h-32 mx-auto " />
            {editData ? <input className={inputClassName}  value={name} /> : <h1>{name}</h1>}
            <p>{email}</p>
          </div>
        </div>
      </section>
    )
  }

  const renderViews = () => {
    const { status } = apiResponse;
    switch (status) {
      case constApiData.peding:
        return <LoaderF/>

      case constApiData.success:
        return renderUserPage()
      default:
        return;
    }
  };

  return renderViews();
};

export default UserDetail;
