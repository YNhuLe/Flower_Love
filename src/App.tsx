import React from "react";
import Entry from "./components/Entry/Entry";
import Footer from "./components/Footer/Footer";
import flowerpedia from "./flowerpedia";

function App() {
  return (
    <div>
      <h1>
        <span>Flower Languages</span>
      </h1>

      <dl className="dictionary">
        {flowerpedia.map((flo) => (
          <Entry
            key={flo.id}
            emoji={flo.emoji}
            name={flo.name}
            meaning={flo.meaning}
          />
        ))}
      </dl>
      <Footer />
    </div>
  );
}
export default App;
