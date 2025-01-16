import React from "react";

interface EntryProps { startgame: () => void }

const entrypage = ( { startgame }: EntryProps) => {
  return (
    <div className="flex flex-col">
      <p>Welcome to my memory game!</p>

      <button onClick={startgame} className="border border-[#41db5b]">Start Game</button>
    </div>
  );
};

export default entrypage;
