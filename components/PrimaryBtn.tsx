import React from "react";

const PrimaryBtn = ({
  title,
  type,
}: {
  title: string;
  type?: "submit" | "reset" | "button";
}) => {
  return (
    <button
      className="bg-white text-red-700 font-bold rounded-lg py-2 px-4 my-3 shadow-md"
      type={type || "button"}
    >
      {title}
    </button>
  );
};

export default PrimaryBtn;
