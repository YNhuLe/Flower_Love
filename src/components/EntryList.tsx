import React from "react";
import Entry from "./Entry";
import flowerpedia from "../flowerpedia";

function EntryList() {
  return (
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
  );
}

export default EntryList;
