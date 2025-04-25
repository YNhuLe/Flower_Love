import React from "react";
import Entry from "./components/Entry/Entry";
import Footer from "./components/Footer/Footer";
import flowerpedia from "./flowerpedia";

function App() {
  return (
    <div className=" text-slate-900 shadow-lg bg-[#bbf7d0]  ">
      <div className="bg-[url('https://wallpaperaccess.com/full/3234797.jpg')] w-full bg-cover bg-center justify-center h-[50vh] m-0 flex items-center">
        <h1>
          <span className="font-sans text-4xl font-bold flex items-center text-white">
            Flower Languages
          </span>
        </h1>
      </div>
      <section>
        <h2></h2>
        <dl className="p-4">
          {flowerpedia.map((flo) => (
            <Entry
              key={flo.id}
              emoji={flo.emoji}
              name={flo.name}
              meaning={flo.meaning}
            />
          ))}
        </dl>
      </section>
      <Footer />
    </div>
  );
}
export default App;
