import React from "react";
import { FaPen } from "react-icons/fa";
import { MdOutlineDomainVerification } from "react-icons/md";
import { ClockLoader } from "react-spinners";

const EditSaveBtn = ({ editData, handelEdit, saveFunction }) => {
  return (
    <>
      {editData.state ? (
        <button
          className="bg-green-600/80 px-3 py-1 text-white/90 rounded-md flex items-center gap-2"
          onClick={saveFunction}
        >
          <span className="font-light">Save</span>{" "}
          <MdOutlineDomainVerification className="font-light" />{" "}
          {editData.loader && <ClockLoader color="#fff" size={15} />}
        </button>
      ) : (
        <button
          className="bg-blue-600/80 px-3 py-1 text-white/90 rounded-md flex items-center gap-2"
          onClick={handelEdit}
        >
          <span className="font-light">Edit</span>{" "}
          <FaPen className="font-light" />
        </button>
      )}
    </>
  );
};

export default EditSaveBtn;
