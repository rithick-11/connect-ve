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
    const { data } = apiResponse;
    const { userinfo } = data;
    const { username, name, bio, profession, avatorUrl, email } = userinfo;
    const { socialLink } = userinfo;

    return (
      <>
        <div class="absolute top-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <section className="h-screen flex justify-center items-center text-white">
          <div className="">
            <div className="flex items-center">
              <div className="bg-white/30 rounded-lg px-2 pr-8 -mr-3">
                <h1>{name}</h1>
                <p>{bio}</p>
              </div>
              <img
                src={avatorUrl}
                alt={username}
                className="h-32 bg-white rounded-full relative z-3"
              />
            </div>
            {socialLink.length !== 0 && (
              <ul className="flex justify-around px-2 py-1 rounded-lg mt-3 bg-white/30">
                {socialLink.map((each) => (
                  <a href={each.url} target="_blank" key={each.url} rel="noreferrer">
                    <img src={each.logoUrl} alt={name} className="h-10" />
                  </a>
                ))}
              </ul>
            )}
          </div>
        </section>
      </>
    );
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
