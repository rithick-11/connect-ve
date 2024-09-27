import React from 'react'
import { FaPen } from 'react-icons/fa'
import { MdOutlineDomainVerification } from 'react-icons/md'

const EditSaveBtn = ({editData, handelEdit, saveFunction}) => {
  return (
    <button
            className={`${
              editData ? "bg-green-600" : "bg-blue-600"
            } px-2 py-1 rounded-md flex items-center gap-2`}
            onClick={handelEdit}
          >
            {editData ? (
              <>
                <p>save</p>
                <MdOutlineDomainVerification />
              </>
            ) : (
              <>
                <p>edit</p>
                <FaPen />
              </>
            )}
          </button>
  )
}

export default EditSaveBtn