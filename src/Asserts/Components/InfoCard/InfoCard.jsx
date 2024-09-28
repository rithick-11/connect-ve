import React from "react";
import EditSaveBtn from "../EditSaveBtn/EditSaveBtn";

const InfoCard = (props) => {
  const { tittle, editState, handelEdit , saveFunction} = props;
  return (
    <div className="bg-white/30 border-[#000]/40 border-[1px] rounded-md shadow-xl text-black">
      <div className="flex items-center justify-between bg-black/10 border-b-black/40 border-[1px]  px-3 py-2">
        <h1 className="text- font-semibold">{tittle}</h1>
        <EditSaveBtn editData={editState} handelEdit={handelEdit} saveFunction={saveFunction} />
      </div>
      <hr className="" />
      <div className="px-3 py-4">{props.children}</div>
    </div>
  );
};

export default InfoCard;
