import React from "react";

function NavBar() {
  return (
    <div
      className="flex flex-row 
    justify-between items-center max-w-[calc(100% - 2rem)]  m-4 
    "
      style={{ width: "calc(100% - 2rem)" }}>
      <img
        src="/Flower_Love/images/logo.png"
        alt="logo2"
        className="w-[3rem] h-[3rem] rounded-full"
      />
      <img
        src="/Flower_Love/images/menu.svg"
        alt="menu"
        className="filter hue-rotate-180"
      />
    </div>
  );
}

export default NavBar;
