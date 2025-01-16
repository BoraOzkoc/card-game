import React, { useState } from "react";
import Entrypage from "./entrypage";
import Grid from "./grid";

const PageController = () => {
  const [isEntryPage, setEntryPage] = useState<boolean>(true);

  const resetPage = () => {
    setEntryPage(false);
  };

  console.log(isEntryPage);
  
  if (isEntryPage) {
    return (
      <div>
        <Entrypage startgame={resetPage}/>
      </div>
    );
  } else {
    return (
      <div>
        <Grid onReset={resetPage} />
      </div>
    );
  }
};

export default PageController;