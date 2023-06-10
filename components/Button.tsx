import React from "react";

const Button = (props: any) => {
  return (
    <button
      className="text-white px-4 py-2 border rounded-md bg-zinc-900 hover:bg-zinc-600"
      {...props}
    ></button>
  );
};

export default Button;
