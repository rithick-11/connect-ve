import React, { useState } from "react";

const SocialMediaAuth = (props) => {
    const {addLinkFun} = props
    const [selectedLink, setSelectedLink] = useState(props.selectedLink) 

    const onAdd = () => {
        addLinkFun({name: selectedLink.name, url:selectedLink.url + selectedLink.usename, visible: selectedLink.visible, logoUrl: selectedLink.logoUrl})
    }

  return (
    <div className="px-3 py-2">
      <div className="flex items-center gap-2">
        <img
          src={selectedLink.logoUrl}
          alt={selectedLink.name}
          className="h-7"
        />
        <h1>{selectedLink.name}</h1>
      </div>
      <div className="flex gap-[2px]">
        <label htmlFor="socialUsername">username :</label>
        <input
          id="socialUsername"
          type="text"
          placeholder="@example"
          className="outline-none bg-transparent"
          onChange={(e) => {
            setSelectedLink((pre) => ({ ...pre, usename: e.target.value }));
          }}
          disabled={!props.edit}
        />
      </div>
      <p>{selectedLink.url + selectedLink.usename}</p>
      <button onClick={onAdd}>Add </button>
    </div>
  );
};

export default SocialMediaAuth;
