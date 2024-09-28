import { socialMediaPlatforms } from "../../ServerData/SocialMediaLink";

import React, { useState } from "react";
import { InfoCard } from "../somponents";

const SocailLinkAuth = (props) => {
  const { data } = props;
  const [editSocialLinks, setEditSocialLinks] = useState({
    state: false,
    loader: false,
  });
  const [addLink, setAddLink] = useState(false);
  const [selectedLink, setSelectedLnik] = useState({isSelected: false});

  const saveSocialLink = () => {
    console.log("save Socail Link");
    setEditSocialLinks((pre) => ({ ...pre, state: !pre.state }));
  };

  const renderAddLinkView = () => {
    return (
      <div className="">
        <button
            className="bg-white/80 px-2 py-1 rounded-md text-black font-semibold"
            onClick={() => {
              setAddLink(pre => !pre);
              setSelectedLnik(pre => ({isSelected: !pre.isSelected}))
            }}
          >
            {addLink ? "Cancel" : "Add Link"}
          </button>
        {selectedLink.isSelected ? (
          <div>
            <ul className="max-h-[170px] overflow-scroll">
              {socialMediaPlatforms.map((each) => (
                <li
                  key={each.name}
                  className="flex px-2 py-1 items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-white">
                    <img src={each.logoUrl} alt={each.name} className="h-8" />
                    <p>{each.name}</p>
                  </div>
                  <button
                    className="bg-white/80 px-2 py-1 rounded-md text-black font-semibold"
                    onClick={() => {
                      setSelectedLnik(pre => ({isSelected: true, ...each}));
                      setAddLink(true)
                    }}
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
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
      {data.length === 0 && (
        <div className="flex justify-center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/fintech-illustrations/1000/error___communication_message_empty_xmark_cancel_email_messages_warning-256.png"
            alt="empyt links"
            className="h-[150px]"
          />
        </div>
      )}
      {renderAddLinkView()}
    </InfoCard>
  );
};

export default SocailLinkAuth;
