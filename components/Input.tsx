import React from "react";

const Input = (props: any) => {
  return (
    <input
      {...props}
      className="border border-stone-700 rounded-md px-4 py-2 bg-neutral-900 w-full"
    />
  );
};

export default Input;
