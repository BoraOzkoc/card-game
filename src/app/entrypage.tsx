import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

interface EntryProps {
  startgame: () => void;
}

const entrypage = ({ startgame }: EntryProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p className=" p-6 text-xl font-bold text-center">Welcome to my memory game!</p>

        <button
          onClick={startgame}
          className=" font-bold m-3 p-2 rounded-xl border border-[#41db5b] hover:bg-[#41db5b]"
        >
          Start Game
        </button>
        <div className=" w-2/3 flex flex-col justify-center items-center">
          <p className="text-sm mt-5 underline">How to play</p>
          <p className="text-center text-xs	">
            Click on a card to flip it over. If you match two cards, they will
            disappear. The game is over when all the cards are matched.
          </p>
        </div>
        <div className="mt-8 flex gap-4 items-center">
          <a
            href="https://linkedin.com/in/bora-ozkoc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-[#41db5b] transition-colors"
          >
            <FaLinkedin size={20} />
            LinkedIn
          </a>
          <a
            href="https://github.com/BoraOzkoc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-[#41db5b] transition-colors"
          >
            <FaGithub size={20} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default entrypage;
