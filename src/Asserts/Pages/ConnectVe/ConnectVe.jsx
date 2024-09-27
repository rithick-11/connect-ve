import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { domainUrl } from "../../ServerData/apis";
import { LoaderF, ProfileCardAuth } from "../../Components/somponents";

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

    return(
        <section>
            wecome to connect ve
        </section>
    )
  }

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
