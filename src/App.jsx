import { useMemo } from "react";
import DataContext from "./contexts/DataContext";
import * as C from "./AppStyles";
import Main from "./components/Main";

import Territories from "./components/Classes/Territories";
import Settings from "./components/Classes/Settings";
import Players from "./components/Classes/Players";

function App() {
  const territories = new Territories();
  const settings = new Settings();
  const players = new Players();

  const providerValue = useMemo(
    () => ({ territories, settings, players }),
    [territories, settings, players]
  );

  return (
    <C.Container>
      <DataContext.Provider value={providerValue}>
        <C.ContainerMain>
          <Main />
        </C.ContainerMain>
      </DataContext.Provider>
    </C.Container>
  );
}

export default App;
