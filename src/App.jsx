import { useMemo } from 'react';
import DataContext from './contexts/DataContext';
import * as C from './AppStyles';
import Main from './components/Main';
import Footer from './components/Footer';

import Territories from './components/Classes/Territories';
import TerritoriesTrade from './components/Classes/TerritoriesTrade';
import Settings from './components/Classes/Settings';
import Players from './components/Classes/Players';

function App() {
  const territories = new Territories();
  const currentTerritories = new Territories();
  const territoriesTrade = new TerritoriesTrade();
  const settings = new Settings();
  const players = new Players();

  const providerValue = useMemo(
    () => ({
      territories,
      currentTerritories,
      territoriesTrade,
      settings,
      players,
    }),
    [territories, currentTerritories, territoriesTrade, settings, players]
  );

  return (
    <C.Container>
      <DataContext.Provider value={providerValue}>
        <C.ContainerMain>
          <Main />
          <Footer />
        </C.ContainerMain>
      </DataContext.Provider>
    </C.Container>
  );
}

export default App;
