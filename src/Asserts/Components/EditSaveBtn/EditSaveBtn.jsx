import React from "react";
import { MdOutlineDomainVerification } from "react-icons/md";
import { SiVerizon } from "react-icons/si";
import { BsFillPenFill } from "react-icons/bs";
import { ClockLoader } from "react-spinners";

const EditSaveBtn = ({ editData, handelEdit, saveFunction }) => {
  return (
    <>
      {editData.state ? (
        <button onClick={saveFunction} className="flex items-center gap-2">
          {editData.loader ? (
            <ClockLoader color="#00000050" size={15} />
          ) : (
            <>
              <span className="text-green-700">save</span> <SiVerizon className="font-bold text-green-500 h-[15px]" />
            </>
          )}
        </button>
      ) : (
        <button className="" onClick={handelEdit}>
          <BsFillPenFill className="h-[15px] text-blue-600" />
        </button>
      )}
    </>
  );
};

export default EditSaveBtn;
