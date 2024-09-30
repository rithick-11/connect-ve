import React, { useState } from "react";
import Cookies from "js-cookie"

import { InfoCard, InputCardV1 } from "../somponents";
import { domainUrl } from "../../ServerData/apis";
import { useNavigate } from "react-router-dom";

const ProfileCardAuth = ({ data }) => {

  const navigate = useNavigate()

  const [editProfile, setEditProfile] = useState({
    state: false,
    loader: false,
  });
  const [profileData, setProfileData] = useState({
    name: data.name,
    bio: data.bio,
    profession: data.profession,
  });


  const { avatorUrl, username, email} = data;
  const { name, bio, profession } = profileData;

  const handelProfileData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData((pre) => ({ ...pre, [name]: value }));
  };

  const saveProfileData = async () => {
    setEditProfile((pre) => ({ ...pre, loader: true }));
    const method = {
      method: "put",
      body: JSON.stringify({ ...profileData, username }),
      headers: {
        "Content-type": "application/json",
        Authoriaztion: `Bearer ${Cookies.get("authtoken")}`,
      },
    };
    const loginApiCall = await fetch(
      `${domainUrl}/users/update-profilo`,
      method
    );
    if(loginApiCall.status === 401){
      Cookies.remove("authtoken")
      navigate(`/${username}/login`)
    }
    setEditProfile({state: false , loader: false });
  };

  return (
    <InfoCard
      tittle="Profile"
      editState={editProfile}
      handelEdit={() => {
        setEditProfile((pre) => ({ ...pre, state: !pre.state }));
      }}
      saveFunction={saveProfileData}
      showEditBtn={true}
    >
      <div className="flex gap-3 flex-col">
        <div className="flex flex-col justify-center items-center text-center">
          <div>
            <img
              src={avatorUrl}
              alt={username}
              className="h-24 rounded-full bg-black/25 px-1 border-[1px] border-white/40"
            />
            <h1 className=" font-light">@{username}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <InputCardV1
            name={"name"}
            value={name}
            labelText={"Name"}
            editData={editProfile.state}
            whileEdit={handelProfileData}
          />
          <InputCardV1
            name={"bio"}
            value={bio}
            labelText={"Bio"}
            editData={editProfile.state}
            whileEdit={handelProfileData}
          />
          <InputCardV1
            name={"profession"}
            value={profession}
            labelText={"Profession"}
            editData={editProfile.state}
            whileEdit={handelProfileData}
          />
          <InputCardV1
            name={"email"}
            value={email}
            labelText={"Email"}
            editData={false}
            whileEdit={handelProfileData}
          />
        </div>
      </div>
    </InfoCard>
  );
};

export default ProfileCardAuth;
