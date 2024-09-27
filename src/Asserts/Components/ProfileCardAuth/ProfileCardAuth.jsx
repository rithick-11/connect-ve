import React, { useState } from "react";
import { InfoCard, InputCardV1 } from "../somponents";

import { domainUrl } from "../../ServerData/apis";

const ProfileCardAuth = ({ data }) => {
  const [editProfile, setEditProfile] = useState({
    state: false,
    loader: false,
  });
  const [profileData, setProfileData] = useState({
    name: data.name,
    bio: data.bio,
    profession: data.profession,
  });

  const { avatorUrl, username, email, _id } = data;
  const { name, bio, profession } = profileData;

  const handelProfileData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData((pre) => ({ ...pre, [name]: value }));
  };

  const saveProfileData = async () => {
    setEditProfile((pre) => ({ ...pre, loader: true }));
    const method = {
      method: "PUT",
      body: JSON.stringify({ ...profileData }),
      headers: {
        "Content-type": "application/json",
      },
    };
    const loginApiCall = await fetch(
      `${domainUrl}/users//update-profilo/${_id}`,
      method
    );
    setEditProfile((pre) => ({state: false , loader: false }));
  };

  return (
    <InfoCard
      tittle="Profile"
      editState={editProfile}
      handelEdit={() => {
        setEditProfile((pre) => ({ ...pre, state: !pre.state }));
      }}
      saveFunction={saveProfileData}
    >
      <div className="flex gap-3 flex-col">
        <div className="flex flex-col justify-center items-center text-center">
          <div>
            <img
              src={avatorUrl}
              alt={username}
              className="h-24 rounded-full bg-white/25 px-1 border-[1px] border-white/40"
            />
            <h1 className="text-white font-light">@{username}</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2">
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
