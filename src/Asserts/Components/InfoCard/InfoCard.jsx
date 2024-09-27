import React from "react";
import EditSaveBtn from "../EditSaveBtn/EditSaveBtn";

const InfoCard = (props) => {
  const { tittle, editState, handelEdit , saveFunction} = props;
  return (
    <div className="bg-black/30 border-white/70 border-[1px] rounded-md shadow-lg">
      <div className="flex items-center justify-between  px-3 py-2">
        <h1 className="text-lg text-white">{tittle}</h1>
        <EditSaveBtn editData={editState} handelEdit={handelEdit} saveFunction={saveFunction} />
      </div>
      <hr className="" />
      <div className="px-3 py-4">{props.children}</div>
    </div>
  );
};

export default InfoCard;
