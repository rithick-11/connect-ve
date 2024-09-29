import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie"

import { domainUrl } from "../../ServerData/apis";
import { LoaderF, ProfileCardAuth, SocailLinkAuth } from "../../Components/somponents";

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
    } else {
      setApiResponse((pre) => ({ ...pre, status: constApiData.fail }));
    }
  };

  useEffect(() => {
    if(Cookies.get("authtoken") === undefined){
      navigate(`/${username}/login`)
      return
    }
    feedUserDAta();
  }, []);


  

  const renderUserPage = () => {
    const { data } = apiResponse;
    const { userinfo } = data;
    const { username, socialLink } = userinfo;

    console.log(socialLink);
    

    return (
      <section className="min-h-screen bg-[#fff]">
        <nav className="px-4 sm:px-8 md:px-28 py-3 bg-[#ff4c1b] text-white flex justify-between items-center">
          <h1 className="text-xl">@{username}</h1>
        </nav>
        <div className="px-4 sm:px-8 md:px-28 py-2 mt-2 flex flex-col gap-4 items-stretch">
          <ProfileCardAuth data={userinfo} />
          <SocailLinkAuth data={socialLink} username={userinfo.username} />
        </div>
      </section>
    );
  };

  const renderViews = () => {
    const { status } = apiResponse;
    switch (status) {
      case constApiData.peding:
        return <LoaderF />;

      case constApiData.success:
        return renderUserPage();
      default:
        return;
    }
  };

  return renderViews();
};

export default UserDetail;
