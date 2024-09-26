import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { domainUrl } from "../../ServerData/apis";

const UserDetail = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const feedUserDAta = async () => {
    const getUserDataApi = await fetch(`${domainUrl}/users/${username}`);
    if (getUserDataApi.status === 400) {
      navigate("/");
    } else if (getUserDataApi.status === 200) {
      const res = await getUserDataApi.json();
      console.log(res);
    }
  };

  useEffect(() => {
    feedUserDAta();
  }, []);
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
};

export default UserDetail;
