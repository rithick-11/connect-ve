import React, { useState } from "react";
import { MdAddLink } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";

import { socialMediaPlatforms } from "../../ServerData/SocialMediaLink";

const AddNewSocialLink = () => {
  const [newLinkData, setNewLinkData] = useState({ isSelected: false });
  return (
    <div>
      <p className="text-sm mb-2">Add Link</p>
      <hr />
      <div className="mt-2">
        {newLinkData.isSelected ? (
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={newLinkData.logoUrl}
                  alt={newLinkData.name}
                  className="h-8"
                />
                <h1 className="text-sm">{newLinkData.name}</h1>
              </div>
              <FaXmark
                className="text-red-600"
                onClick={() => {
                  setNewLinkData({ isSelected: false });
                }}
              />
            </div>
            <div className="mt-2 flex border-b-[1px] border-blue-500 flex-col">
              <label className="text-sm">Username</label>
              <input
                type="text"
                value={newLinkData.usename}
                className="outline-none mb-1 text-sm"
                placeholder="@rithick"
                onChange={(e) => {setNewLinkData(pre => ({...pre, usename: e.target.value}))}}
              />
            </div>
            <p className="text-sm mt-1 text-black/70">
              {newLinkData.url + newLinkData.usename}
            </p>
          </div>
        ) : (
          <ul className="max-h-[140px] flex flex-col gap-1 overflow-y-scroll">
            {socialMediaPlatforms.map((each) => (
              <li className="flex justify-between items-center py-2 pr-5">
                <div className="flex items-center gap-2">
                  <img src={each.logoUrl} alt={each.name} className="h-7" />
                  <p className="text-sm">{each.name}</p>
                </div>
                <button
                  onClick={() => {
                    setNewLinkData({ isSelected: true, ...each });
                  }}
                >
                  <MdAddLink className="h-8 w-5 text-blue-600" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddNewSocialLink;
