import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { domainUrl } from "../../ServerData/apis";
import { LoaderF } from "../../Components/somponents";

const constApiData = {
  initail: "initail",
  peding: "pending",
  success: "success",
  fail: "fail",
};

const ConnectVe = () => {
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
    feedUserDAta();
  }, []);

  const renderConnectVePage = () => {
    const {data} =  apiResponse
    const {userinfo} = data
    const {username, name,bio, profession, avatorUrl, email} = userinfo

    return <section className="h-screen flex justify-center items-center ">
      <div>
        <img src={avatorUrl} alt={username} className="h-32 " />
        <div>
          <h1>{name}</h1>
          <p>{bio}</p>
          <h3>{profession}</h3>
          <h1>{email}</h1>
        </div>
      </div>
    </section>
  };

  const renderViews = () => {
    const { status } = apiResponse;
    switch (status) {
      case constApiData.peding:
        return <LoaderF />;

      case constApiData.success:
        return renderConnectVePage();
      default:
        return;
    }
  };

  return renderViews();
};

export default ConnectVe;
