import React from "react";

const InputCardV1 = ({name, editData, labelText, value, type, whileEdit}) => {
  return (
    <div className={`flex flex-col border-b-[1px] ${editData ? "border-blue-400" : "border-black/30"}`}>
      <label htmlFor={`${name}Id`} className={`font-medium text-sm  ${editData ? "text-blue-500" : "text-black/80"}`}>{labelText}</label>
      <input
      id={`${name}Id`}
        name={name}
        type={type}
        className="bg-transparent outline-none font-thin "
        value={value}
        disabled={!editData}
        onChange={whileEdit}
      />
    </div>
  );
};

export default InputCardV1;
