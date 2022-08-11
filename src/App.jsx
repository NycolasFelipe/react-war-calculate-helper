import { useMemo } from "react";
import DataContext from "./contexts/DataContext";
import * as C from "./AppStyles";
import ContainerSettings from "./components/ContainerSettings";

import Territories from "./components/Classes/Territories";
import Settings from "./components/Classes/Settings";

function App() {
  const territories = new Territories();
  const settings = new Settings();
  const providerValue = useMemo(
    () => ({ territories, settings }),
    [territories, settings]
  );

  return (
    <C.Container>
      <DataContext.Provider value={providerValue}>
        <C.ContainerMain>
          <ContainerSettings />
        </C.ContainerMain>
      </DataContext.Provider>
    </C.Container>
  );
}

export default App;
