import React, { useState } from "react";

const Input = ({ label, onChange, min, max, ...props } : any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e :any) => {
    let newValue = e.target.value;
    if (props.type === "number" && newValue !== "") {
      newValue = Math.max(min ?? newValue, Math.min(newValue, max ?? newValue));
    }
    setValue(newValue);
    onChange && onChange({ ...e, target: { ...e.target, value: newValue } });
  };

  return (
    <div className="relative">
      <input
        {...props}
        value={value}
        className="block w-full px-3 py-2 text-gray-900 placeholder-transparent bg-transparent border border-gray-200 rounded focus:border-black focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <label
        htmlFor={props.id}
        className={`absolute top-1/2 left-3 px-1 py-0.5 transition-all duration-300 ease-in-out bg-white transform -translate-y-1/2 pointer-events-none ${
          (isFocused || value) && "-top-1 text-xs"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
