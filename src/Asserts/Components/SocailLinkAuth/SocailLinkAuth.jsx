import React, { useState } from "react";
import { MdOutlineAddLink } from "react-icons/md";
import Cookies from "js-cookie";
import { socialMediaPlatforms } from "../../ServerData/SocialMediaLink";
import { InfoCard, SocialMediaAuth } from "../somponents";
import { domainUrl } from "../../ServerData/apis";
import { useNavigate } from "react-router-dom";

const SocailLinkAuth = (props) => {
  const { data, username } = props;
  const [editSocialLinks, setEditSocialLinks] = useState({
    state: false,
    loader: false,
  });
  const [addLink, setAddLink] = useState(false);
  const [selectedLink, setSelectedLnik] = useState({ isSelected: false });

  const navigate = useNavigate();

  const saveSocialLink = () => {
    setEditSocialLinks((pre) => ({ ...pre, state: !pre.state }));
  };

  const onAddNewLink = async (newLinkData) => {
    console.log("add new link called");
    console.log(newLinkData);
    const method = {
      method: "post",
      body: JSON.stringify({ username, newLinkData }),
      headers: {
        "Content-type": "application/json",
        Authoriaztion: `Bearer ${Cookies.get("authtoken")}`,
      },
    };
    const addLinkRes = await fetch(
      `${domainUrl}/users/add-social-link`,
      method
    );
    if (addLinkRes.status === 401) {
      Cookies.remove("authtoken");
      navigate(`/${username}/login`);
    }
  };

  const renderAddLinkView = () => {
    return (
      <div className="">
        <button
          className="bg-[#000]/50 px-2 py-1 rounded-md text-black font-semibold"
          onClick={() => {
            setAddLink((pre) => !pre);
            setSelectedLnik((pre) => ({ ...pre, isSelected: false }));
          }}
        >
          {addLink ? "Cancel" : "Add Link"}
        </button>
        {addLink ? (
          <div className="shadow-sm border-[.5px] mt-3 rounded-md">
            {selectedLink.isSelected ? (
              <SocialMediaAuth
                selectedLink={selectedLink}
                edit={true}
                addLinkFun={onAddNewLink}
              />
            ) : (
              <ul className="max-h-[170px] overflow-scroll">
                {socialMediaPlatforms.map((each) => (
                  <li
                    key={each.name}
                    className="flex px-3 py-1 items-center justify-between "
                  >
                    <div className="flex items-center gap-3">
                      <img src={each.logoUrl} alt={each.name} className="h-8" />
                      <p className="text-sm">{each.name}</p>
                    </div>
                    <button
                      className="bg-black/40 px-2 py-1 rounded-md text-black font-semibold"
                      onClick={() => {
                        setSelectedLnik((pre) => ({
                          isSelected: true,
                          ...each,
                        }));
                        setAddLink(true);
                      }}
                    >
                      <MdOutlineAddLink />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <InfoCard
      tittle="Social links"
      editState={editSocialLinks}
      handelEdit={() => {
        setEditSocialLinks((pre) => ({ ...pre, state: !pre.state }));
      }}
      saveFunction={saveSocialLink}
    >
      {data.length === 0 ? (
        <div className="flex justify-center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/fintech-illustrations/1000/error___communication_message_empty_xmark_cancel_email_messages_warning-256.png"
            alt="empyt links"
            className="h-[150px]"
          />
        </div>
      ) : (
        <ul>
          {data.map(each => <li>
            <img src={each.logoUrl} alt={each.name} className="h-7" />
          </li>) }
        </ul>
      )}

      {renderAddLinkView()}
    </InfoCard>
  );
};

export default SocailLinkAuth;
