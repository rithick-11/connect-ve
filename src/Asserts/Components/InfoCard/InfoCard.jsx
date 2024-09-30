import React from "react";
import EditSaveBtn from "../EditSaveBtn/EditSaveBtn";

const InfoCard = (props) => {
  const { tittle, editState, handelEdit , saveFunction, showEditBtn} = props;
  return (
    <div className="rounded-lg shadow text-black">
      <div className="flex items-center justify-between px-3 py-2">
        <h1 className="text- font-semibold">{tittle}</h1>
        {showEditBtn && <EditSaveBtn editData={editState} handelEdit={handelEdit} saveFunction={saveFunction} />}
      </div>
      <hr className="" />
      <div className="px-3 py-4">{props.children}</div>
    </div>
  );
};

export default InfoCard;
