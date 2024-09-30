import React, { useState } from "react";
import { AddNewSocialLink, InfoCard } from "../somponents";


const SocialLinkCardAuth = () => {
  const [editSocialLink, setEditSocialLink] = useState({
    state: false,
    loader: false,
  });

  const saveSocialLinks = () => {
    console.log("called social links");
    setEditSocialLink((pre) => ({ ...pre, state: !pre.state }));
  };
  return (
    <InfoCard
      tittle="Social Links"
      //   editState={editSocialLink}
      //   handelEdit={() => {
      //     setEditSocialLink((pre) => ({ ...pre, state: !pre.state }));
      //   }}
      //   saveFunction={saveSocialLinks}
      showEditBtn={false}
    >
        <AddNewSocialLink />
    </InfoCard>
  );
};

export default SocialLinkCardAuth;
