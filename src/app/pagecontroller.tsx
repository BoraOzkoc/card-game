import React, { useState } from "react";
import Entrypage from "./entrypage";
import Grid from "./grid";

const PageController = () => {
  const [isEntryPage, setEntryPage] = useState<boolean>(true);

  const handleGameState = (showEntry: boolean) => {
    setEntryPage(showEntry);
  };

  return (
    <div className="w-full h-full">
      {isEntryPage ? (
        <Entrypage startgame={() => handleGameState(false)} />
      ) : (
        <Grid onReset={() => handleGameState(true)} />
      )}
    </div>
  );
};

export default PageController;
