import React from "react";

const InputCardV1 = ({name, editData, labelText, value, type, whileEdit}) => {
  return (
    <div className={`flex flex-col ${editData ?  "bg-white/20 shadow-md border-green-700 border-[1px]" : "bg-black/20" }   px-2 py-1 rounded-md text-sm`}>
      <label htmlFor={`${name}Id`} className="font-medium text-md">{labelText}</label>
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
