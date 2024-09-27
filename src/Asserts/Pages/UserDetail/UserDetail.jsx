import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { domainUrl } from "../../ServerData/apis";
import { LoaderF, InfoCard, InputCardV1 } from "../../Components/somponents";

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

  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({});

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
      const profileDataRes = {
        name: res.userinfo.name,
        bio: res.userinfo.bio,
        profession: res.userinfo.profession,
      };
      setProfileData(profileDataRes);
    } else {
      setApiResponse((pre) => ({ ...pre, status: constApiData.fail }));
    }
  };

  const saveProfileData = async () => {
    console.log("save function called");
    
    const _id = apiResponse.data.userinfo._id
    const method = {
      method: "PUT",
      body: JSON.stringify({...profileData}),
      headers: {
        "Content-type": "application/json",
      },
    };
    const loginApiCall = await fetch(`${domainUrl}/users//update-profilo/${_id}`, method);
  }

  useEffect(() => {
    feedUserDAta();
  }, []);

  const renderUserPage = () => {
    const { data } = apiResponse;
    const { userinfo } = data;
    const { username, avatorUrl, email} = userinfo;
    const { name,  bio, profession } = profileData;

    const handelProfileData = (e) => {
      const name = e.target.name;
      const value = e.target.value
      setProfileData(pre => ({...pre, [name]:value}))
    }

    return (
      <section className="h-screen bg-[#ff4c1b]">
        <nav className="px-4 sm:px-8 md:px-28 py-2 bg-black text-white flex justify-between items-center">
          <h1 className="text-lg">@{username}</h1>
        </nav>
        <div className="px-4 sm:px-8 md:px-28 py-2 mt-2 flex flex-col items-stretch">
          <InfoCard
            tittle="Profile"
            editState={editProfile}
            handelEdit={() => {
              setEditProfile((pre) => !pre);
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
                  editData={editProfile}
                  whileEdit={handelProfileData}
                />
                <InputCardV1
                  name={"bio"}
                  value={bio}
                  labelText={"Bio"}
                  editData={editProfile}
                  whileEdit={handelProfileData}
                />
                <InputCardV1
                  name={"profession"}
                  value={profession}
                  labelText={"Profession"}
                  editData={editProfile}
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
          <button onClick={saveProfileData}>Save</button>
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
