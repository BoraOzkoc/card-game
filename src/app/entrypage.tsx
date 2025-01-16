import React from "react";

interface EntryProps {
  startgame: () => void;
}

const entrypage = ({ startgame }: EntryProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>Welcome to my memory game!</p>

      <button onClick={startgame} className="m-3 p-2 rounded-xl border border-[#41db5b] hover:bg-[#41db5b]">
        Start Game
      </button>
    </div>
  );
};

export default entrypage;
