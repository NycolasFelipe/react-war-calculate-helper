import { useMemo } from 'react';
import DataContext from './contexts/DataContext';
import * as C from './AppStyles';
import Main from './components/Main';
import Footer from './components/Footer';

import Territories from './components/Classes/Territories';
import TerritoriesTrade from './components/Classes/TerritoriesTrade';
import Settings from './components/Classes/Settings';
import Players from './components/Classes/Players';
import Header from './components/Header';

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

  //Load App Components
  const loadApp = () => {
    //Load stored values, if any
    loadLocalStorage();
    return (
      <C.Container onLoad={() => loadLocalStorage()}>
        <DataContext.Provider value={providerValue}>
          <C.ContainerMain>
            <Header />
            <Main />
            <Footer />
          </C.ContainerMain>
        </DataContext.Provider>
      </C.Container>
    );
  };

  //#region Load local storage
  const loadLocalStorage = () => {
    //Get local stored values
    let storedSettings = localStorage.getItem('settings');
    let storedTerritories = localStorage.getItem('territories');
    let storedPlayers = localStorage.getItem('players');

    //#region Load local stored values
    //Load Settings
    if (storedSettings) {
      let parsedMinBonus = JSON.parse(storedSettings)['minBonus'];
      let parsedMinBonusActive = parsedMinBonus['active'];
      let parsedMinBonusValues = parsedMinBonus['values'];
      let parsedTotalBonus = JSON.parse(storedSettings)['totalBonus'];
      settings.setBonus(
        parsedMinBonusValues,
        parsedTotalBonus,
        parsedMinBonusActive
      );
    }
    //Load Territories
    if (storedTerritories) {
      let parsedTerritories = JSON.parse(storedTerritories)['territories'];
      territories.territoriesList = parsedTerritories;
      currentTerritories.territoriesList = parsedTerritories;
    }
    //Load players
    if (storedPlayers) {
      let parsedPlayers = JSON.parse(storedPlayers)['players'];
      players.setPlayers(parsedPlayers);
    }
  };
  //#endregion

  return <>{loadApp()}</>;
}

export default App;
