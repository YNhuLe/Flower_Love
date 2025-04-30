import React from "react";
import EntryList from "./components/EntryList";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
function App() {
  return (
    // <div className=" text-slate-900 shadow-lg bg-[#355F2E]  ">
    <div>
      {/* <NavBar /> */}
      <Hero />
      <EntryList />
      <Footer />
    </div>
  );
}
export default App;
