import React from "react";

const InputCardV1 = ({name, editData, labelText, value, type, whileEdit}) => {
  return (
    <div className="flex flex-col text-white   bg-white/20 px-2 py-1 rounded-md text-sm">
      <label htmlFor={`${name}Id`} className="font-light text-md">{labelText}</label>
      <input
      id={`${name}Id`}
        name={name}
        type={type}
        className="bg-transparent outline-none font-thin text-white/80"
        value={value}
        disabled={!editData}
        onChange={whileEdit}
      />
    </div>
  );
};

export default InputCardV1;
