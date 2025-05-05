import React from "react";

const date = new Date().getFullYear();
function Footer() {
  return (
    <footer className="text-test">
      copyright @ {date}
      <button className="bg-test text-primary px-4 py-2 rounded">
        Click Me
      </button>
    </footer>
  );
}
export default Footer;
