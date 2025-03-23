import React from "react";

const Progressbar = ({ timeProgress }) => {
  return (
    <div className="relative bg-white h-2 rounded-md w-[300px] mt-3">
      <div className="absolute h-2 rounded-md bg-yellow-500" style={{ width: `${timeProgress}px` }}></div>
    </div>
  );
};

export default Progressbar;
