import React from "react";
import EntryList from "./components/EntryList";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    // <div className=" text-slate-900 shadow-lg bg-[#355F2E]  ">
    <BrowserRouter>
      {/* <NavBar /> */}
      <Hero />
      <EntryList />
      <Footer />
      {/* </div> */}
    </BrowserRouter>
  );
}
export default App;
