import { useContext, useState } from 'react';
import DataContext from '../../contexts/DataContext';
import { RemoveScroll } from 'react-remove-scroll';
import * as C from './styles';
import Title from '../Title';
import Input from '../Input';
import Button from '../Button';
import Select from '../Select';
import CheckBox from '../CheckBox';
import ButtonInfo from '../ButtonInfo';
import TerritoryItem from '../TerritoryItem';
import TitleCase from '../Functions/TitleClase';
import Player from '../Player';
import CalculateResultItem from '../CalculateResultItem';

function Main() {
  //#region Territories Settings
  //Get territories list
  const { territories } = useContext(DataContext);
  const { currentTerritories } = useContext(DataContext);

  const [territoriesList, setTerritoriesList] = useState(
    territories.territoriesList
  );

  const availableTerritories = (count = false) => {
    let territories = currentTerritories.getOwnerTerritories('none');
    if (count) {
      return territories.length;
    }
    let list = [];

    for (let item in territories) {
      list.push(
        <TerritoryItem
          key={territories[item]['territory']}
          continent={territories[item]['continent']}
          territory={territories[item]['territory']}
          deleteItemActive={deleteItemActive}
          onClick={() => [
            deleteTerritory(
              territories[item]['territory'],
              territories[item]['continent']
            ),
            setUpdateTerritories(!updateTerritories),
          ]}
        />
      );
    }
    return list;
  };

  //Flag for Add Territory Window
  const [addTerritoryWindow, setAddTerritoryWindow] = useState(false);

  //#region Alerts and related
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showInputAlert, setShowInputAlert] = useState(false);
  const [inputAlertText, setInputAlertText] = useState('');

  const inputAlert = (text) => {
    setInputAlertText(text);
    // Exibe alerta de erro
    setShowInputAlert(true);
    // Depois de um tempo, esconde o alerta novamente
    setTimeout(() => setShowInputAlert(false), 5000);
  };

  //Delete is active at the current moment
  const [deleteItemActive, setDeleteItemActive] = useState(false);

  //Delete territory
  const deleteTerritory = (territory, continent) => {
    if (deleteItemActive) {
      //Update territories list
      currentTerritories.deleteTerritory(territory);
      setBonusSettings(continent);
    }
  };
  //#endregion

  //#region Add Territory
  const [territoryName, setTerritoryName] = useState('');
  const [territoryContinent, setTerritoryContinent] = useState('Africa');

  const addTerritory = (territory, continent) => {
    const error = currentTerritories.addTerritory(
      TitleCase(territory),
      continent
    );
    //If an error has occurred, displays a message
    if (error) {
      inputAlert(error);
    }
    //If the addition is successful, displays a message.
    else if (!error) {
      //Shows confirmation that the territory has been added
      setTerritoryName('');
      setShowAddAlert(true);
      //After a while, hide the alert again
      setTimeout(() => setShowAddAlert(false), 3000);
      setBonusSettings(territoryContinent);
      setLocalStorage('territories');
    }
  };
  //#endregion
  //#endregion

  //#region Bonus Settings
  const { settings } = useContext(DataContext);

  const setBonusSettings = (territoryContinent) => {
    let totalValue = currentTerritories.territoriesList.filter((item) => {
      if (item.continent === territoryContinent) return item;
    }).length;

    settings.setTotalValue(territoryContinent, totalValue);
    setTotalBonus(settings.getTotalBonus());
  };

  //Min Bonus Settings
  const [minBonus, setMinBonus] = useState(settings.getMinBonus());
  const [minBonusActive, setMinBonusActive] = useState(
    settings.minBonusActive()
  );

  //Total Bonus Settings
  const [totalBonus, setTotalBonus] = useState(settings.getTotalBonus());

  //#region Input Item model
  const inputItem = (type, subtype, index, text) => {
    if (type === 'totalBonus') {
      if (subtype === 'value') {
        return (
          <Input
            value={totalBonus[index].value}
            readOnly={true}
            text={text}
            type={'number'}
            lockValue={true}
            borderRadius={'0'}
          />
        );
      } else if (subtype === 'bonus') {
        return (
          <Input
            label={`${type}-${subtype}-${index}`}
            defaultValue={totalBonus[index].bonus}
            text={text}
            type={'number'}
            borderRadius={'0'}
            onChange={(e) =>
              changeBonus(
                'totalBonus',
                totalBonus[index].continent,
                e.target.value
              )
            }
          />
        );
      }
    } else if (type === 'minBonus') {
      return (
        <Input
          label={`${type}-${subtype}-${index}`}
          defaultValue={minBonus[index][subtype]}
          text={text}
          type={'number'}
          borderRadius={'0'}
          onChange={(e) =>
            changeBonus(
              type,
              minBonus[index].continent,
              e.target.value,
              subtype
            )
          }
        />
      );
    }
  };
  //#endregion

  //Territory item
  const territoryItem = (continent) => {
    return (
      <TerritoryItem
        divHeight={'19px'}
        hideTerritory={true}
        continent={continent}
      />
    );
  };

  //Changing input values
  const changeBonus = (type, continent, input, subtype) => {
    const inputValue = input ? parseInt(input) : '';
    if (type === 'totalBonus') {
      for (let item in totalBonus) {
        if (totalBonus[item].continent === continent) {
          totalBonus[item].bonus = inputValue;
        }
      }
    }
    if (type === 'minBonus') {
      for (let item in minBonus) {
        if (minBonus[item].continent === continent) {
          minBonus[item][subtype] = inputValue;
        }
      }
    }
    setSaveSettingsActive(true);
  };

  //Settings button and warning flags
  const [saveSettingsActive, setSaveSettingsActive] = useState(false);
  const [saveSettingsWarning, setSaveSettingsWarning] = useState(false);
  const [settingsWarningMessage, setSettingsWarningMessage] = useState('');

  const handleSettingsWarning = (warningMessage) => {
    setSettingsWarningMessage(warningMessage);
    setSaveSettingsWarning(true);
    setTimeout(() => {
      setSaveSettingsWarning(false);
    }, 5000);
  };

  //Saving user changes
  const saveSettings = () => {
    //Save Settings if provided valid data
    const error = settings.setBonus(minBonus, totalBonus, minBonusActive);
    if (error) {
      handleSettingsWarning(error);
    } else if (!error) {
      setSaveSettingsActive(false);
      setSaveSettingsWarning(false);
      setLocalStorage('settings');
    }
  };
  //#endregion

  //#region Players
  const { players } = useContext(DataContext);
  const [playersList, setPlayersList] = useState(players.getPlayers());

  const playerItem = (playerId) => {
    const player = players.getPlayer(playerId);
    return (
      <C.Player
        editPlayersActive={editPlayersActive}
        playerActive={player.active}
      >
        <CheckBox
          onClick={() => changePlayerActive(playerId)}
          checked={player.active}
        />
        <Title text={`Player ${playerId.slice(-1)}`} />
        <Input
          defaultValue={player.playerName}
          placeholder={'Player name...'}
          borderRadius={'0'}
          onChange={(e) => changePlayerName(e.target.value, playerId)}
          maxLength={12}
        />
      </C.Player>
    );
  };

  const changePlayerName = (value, playerId) => {
    setPlayersList(
      playersList.filter((item) => {
        if (item.playerId === playerId) {
          item.playerName = value;
          return item;
        } else return item;
      })
    );
  };

  const changePlayerActive = (playerId) => {
    setPlayersList(
      playersList.filter((item) => {
        if (item.playerId === playerId) {
          item.active = !item.active;
          return item;
        } else return item;
      })
    );
  };

  const [editPlayersActive, setEditPlayersActive] = useState(false);
  const [savePlayersWarning, setSavePlayersWarning] = useState(false);
  const [settingsPlayersMessage, setSettingsPlayersMessage] = useState('');

  const handlePlayersWarning = (warningMessage) => {
    setSettingsPlayersMessage(warningMessage);
    setSavePlayersWarning(true);
    setTimeout(() => {
      setSavePlayersWarning(false);
    }, 5000);
  };

  const savePlayers = () => {
    setEditPlayersActive(true);
    let error;
    if (editPlayersActive) {
      error = players.setPlayers(playersList);
      if (error) handlePlayersWarning(error);
      else {
        setEditPlayersActive(false);
        setSavePlayersWarning(false);
        setLocalStorage('players');
      }
    }
  };
  //#endregion

  //#region Calculate Territories [SIDE]
  const [calculatedList, setCalculatedList] = useState(null);
  const [calculateActive, setCalculateActive] = useState(false);

  const calculateTerritories = () => {
    let playersActive = players.getPlayers('active');
    let playersActiveList = [];

    for (let item in playersActive) {
      let id = playersActive[item]['playerId'];
      let name = playersActive[item]['playerName'];
      let territoriesOwned = territories.getOwnerTerritories(id);
      let territoriesLength = territoriesOwned.length;
      let territoriesTotality =
        settings.checkTerritoriesTotality(territoriesOwned);

      playersActiveList.push(
        <CalculateResultItem
          key={id}
          playerName={name}
          territoriesLength={territoriesLength}
          territoriesTotality={territoriesTotality}
        />
      );
    }
    setCalculatedList(playersActiveList);
    setRemoveScroll(true);
    setBackgroundBlur(true);
  };

  const exitCalculation = () => {
    setCalculateActive(false);
    setRemoveScroll(false);
    setBackgroundBlur(false);
  };
  //#endregion

  //#region Change Territories
  const { territoriesTrade } = useContext(DataContext);
  const [saveTradesActive, setSaveTradesActive] = useState(false);
  const [changeActive, setChangeActive] = useState(false);
  const [changeAlertActive, setChangeAlertActive] = useState(false);
  const [updateTerritories, setUpdateTerritories] = useState(true);
  const [playersTradeList, setPlayersTradeList] = useState(
    territoriesTrade.getPlayersTrade()
  );
  territoriesTrade.loadPlayersTradeActive(players.getPlayers());

  const changeTerritoryItem = (name, playerId, selected, type) => {
    let disabled = territoriesTrade.checkPlayersTradeDuplicate(playerId, type);
    return (
      <Button
        key={playerId}
        text={name}
        padding={'6px 8px'}
        fontSize={'0.8rem'}
        buttonHeight={'auto'}
        buttonWidth={'auto'}
        buttonBorderColor={selected ? '#228be6' : '#424242'}
        buttonBgColor={'#228be6'}
        disabled={disabled}
        onClick={() => [changePlayerTradeSelected(playerId, type)]}
      />
    );
  };

  const changeTerritorieSwitch = () => {
    let disabled = true;
    let playersSelected = territoriesTrade.checkPlayersTradeSelected();
    if (playersSelected) {
      disabled = false;
    }
    return (
      <Button
        text={'⮂'}
        fontSize={'1.5rem'}
        buttonBgColor={'#228be6'}
        buttonWidth={'2rem'}
        onClick={() => [
          territoriesTrade.switchPlayersTrade(),
          setPlayersTradeList(territoriesTrade.getPlayersTrade()),
          territories.setTerritorySelected('', 'deselect'),
        ]}
        disabled={disabled}
      />
    );
  };

  const changeTerritoriesAdd = () => {
    let disabled = true;
    let playerFrom = territoriesTrade.checkPlayerTradeSelected('from');
    let playerFromTerritories = territories.checkOwnerTerritories(
      playerFrom,
      true
    );
    let playersSelected = territoriesTrade.checkPlayersTradeSelected();
    let territoriesCount = playerFromTerritories['count'];
    let territoriesSelected = playerFromTerritories['anySelected'];

    if (playersSelected && territoriesSelected && territoriesCount > 0) {
      disabled = false;
    }
    return (
      <Button
        text={'⭢'}
        fontSize={'1.5rem'}
        buttonBgColor={'#2e8b2e'}
        buttonWidth={'2rem'}
        onClick={() => changeTerritoriesOwner()}
        disabled={disabled}
      />
    );
  };

  const changeTerritoriesCancel = () => {
    let disabled = true;
    let playerFrom = territoriesTrade.checkPlayerTradeSelected('from');
    let playerFromTerritories = territories.checkOwnerTerritories(
      playerFrom,
      true
    );
    let territoriesSelected = playerFromTerritories['anySelected'];

    if (territoriesSelected) {
      disabled = false;
    }
    return (
      <Button
        text={'🗑'}
        fontSize={'1.5rem'}
        buttonBgColor={'#ca1e1e'}
        buttonWidth={'2rem'}
        disabled={disabled}
        onClick={() => [changeTerritoriesSelected('deselect')]}
      />
    );
  };

  const changeTerritoriesSelectAll = () => {
    let disabled = true;
    let playerFrom = territoriesTrade.checkPlayerTradeSelected('from');
    let playerFromTerritories = territories.checkOwnerTerritories(
      playerFrom,
      true
    );
    let territoriesCount = playerFromTerritories['count'];

    if (territoriesCount > 0) {
      disabled = false;
    }
    return (
      <Button
        text={'🞻'}
        fontSize={'1.5rem'}
        buttonBgColor={'#228be6'}
        buttonWidth={'2rem'}
        onClick={() => [changeTerritoriesSelected('selectAll', playerFrom)]}
        disabled={disabled}
      />
    );
  };

  const changeTerritoriesOwner = () => {
    let list = territoriesList;

    let playerSelected = playersTradeList[1].filter((item) => {
      if (item['selected']) return item;
    })[0]['playerId'];

    for (let item in list) {
      if (list[item]['selected']) {
        list[item]['selected'] = false;
        list[item]['owner'] = playerSelected;
      }
    }

    setUpdateTerritories(!updateTerritories);
    setSaveTradesActive(true);
  };

  const changeTerritoriesSelected = (type, owner) => {
    territories.setTerritorySelected([], type, owner);
    setUpdateTerritories(!updateTerritories);
  };

  const changePlayerTradeSelected = (playerId, type) => {
    territoriesTrade.setPlayersTradeSelected(playerId, type);
    setPlayersTradeList(territoriesTrade.getPlayersTrade());
  };

  const changeTerritoriesPlayers = (type) => {
    let items = [];
    let playerIdTrade;
    let playerName;
    let playerSelected;
    let playersTrade = territoriesTrade.getPlayersTrade(type);

    for (let item in playersTrade) {
      playerIdTrade = playersTrade[item]['playerId'];
      playerSelected = playersTrade[item]['selected'];

      if (playerIdTrade === 'none') {
        playerName = 'Available';
        items.unshift(
          changeTerritoryItem(playerName, playerIdTrade, playerSelected, type)
        );
      } else {
        playerName = players.getPlayer(playerIdTrade)['playerName'];
        items.push(
          changeTerritoryItem(playerName, playerIdTrade, playerSelected, type)
        );
      }
    }
    return items;
  };

  const compareTerritoriesSelected = (a, b) => {
    if (a.selected === b.selected) {
      return a.selected < b.selected ? -1 : 1;
    }
    if (a.selected > b.selected) {
      return -1;
    }
    if ((a.selected && b.selected) || (!a.selected && !b.selected)) {
      if (a.continent > b.continent) {
        return 1;
      }
      if (a.continent < b.continent) {
        return -1;
      }
    }
  };

  const territoriesListItems = (type) => {
    let items = [];
    let sortedItems = [];
    let list = territories.territoriesList;
    let playersTradeList = territoriesTrade.getPlayersTrade(type);
    let playerSelected = '';

    //Get player that is currently selected
    for (let item in playersTradeList) {
      if (playersTradeList[item]['selected']) {
        playerSelected = playersTradeList[item]['playerId'];
      }
    }

    for (let item in list) {
      if (list[item]['owner'] === playerSelected) {
        sortedItems.push(list[item]);
      }
    }
    sortedItems.sort(compareTerritoriesSelected);

    //Get territories owned by this player
    sortedItems.forEach((item, index) => {
      if (item['owner'] === playerSelected) {
        if (type === 'from') {
          items.push(
            <TerritoryItem
              key={index}
              continent={item['continent']}
              territory={item['territory']}
              addTerritory={true}
              onClick={() => [
                territories.setTerritorySelected(item['territory']),
                setUpdateTerritories(!updateTerritories),
              ]}
              selected={item['selected']}
            />
          );
        } else {
          items.push(
            <TerritoryItem
              key={index}
              continent={item['continent']}
              territory={item['territory']}
            />
          );
        }
      }
    });
    return items;
  };

  const saveTradesChanges = () => {
    let changes = JSON.parse(JSON.stringify(territoriesList));
    currentTerritories.saveTradeChanges(changes);
    setUpdateTerritories(!updateTerritories);
    setChangeAlertActive(false);
    setSaveTradesActive(false);
  };

  const cancelTradesChanges = () => {
    let previousChanges = JSON.parse(
      JSON.stringify(currentTerritories.territoriesList)
    );
    territories.saveTradeChanges(previousChanges);
    setTerritoriesList(territories.territoriesList);
    setChangeAlertActive(false);
    setChangeActive(false);
    setSaveTradesActive(false);
    setBackgroundBlur(false);
    setRemoveScroll(false);
  };

  const exitTradesWindow = () => {
    if (saveTradesActive) {
      setChangeAlertActive(true);
    } else {
      territories.setTerritorySelected('', 'deselect');
      setChangeActive(false);
      setRemoveScroll(false);
      setBackgroundBlur(false);
    }
  };

  //Show Change Territories window
  const changeTerritories = () => {
    const requiredSaved = !(editPlayersActive || saveSettingsActive);
    if (addTerritoryWindow || deleteItemActive) {
      setAddTerritoryWindow(false);
      setDeleteItemActive(false);
      setTerritoryName('');
    }
    if (editPlayersActive) {
      handlePlayersWarning('You must save changes first.');
    }
    if (saveSettingsActive) {
      handleSettingsWarning('You must save changes first.');
    }
    if (requiredSaved) {
      cancelTradesChanges();
      setChangeActive(true);
      setRemoveScroll(true);
      setBackgroundBlur(true);
    }
  };
  //#endregion

  //#region Players Cards
  const playersCards = () => {
    let items = [];
    let list = players.getPlayers();

    for (let player in list) {
      let playerId = list[player]['playerId'];

      if (list[player]['active']) {
        let playerName = list[player]['playerName'];
        let playerFromTerritories = currentTerritories.checkOwnerTerritories(
          playerId,
          true
        );
        let playerTerritories =
          currentTerritories.getOwnerTerritories(playerId);
        let territoriesCount = playerFromTerritories['count'];

        items.push(
          <Player
            key={playerId}
            playerName={playerName}
            playerActive={true}
            playerTerritories={playerTerritories}
            territoriesCount={territoriesCount}
          />
        );
      } else {
        items.push(<C.PlayerCardPlaceholder key={playerId} />);
      }
    }
    return items;
  };
  //#endregion

  //#region Reset Settings
  //Reset Settings Alert Window Flag
  const [resetAlertActive, setResetAlertActive] = useState(false);

  const resetSettings = () => {
    settings.resetDefaultSettings();
    setMinBonus(settings.getMinBonus());
    setMinBonusActive(settings.minBonusActive());
    setTotalBonus(settings.getTotalBonus());

    //Reset Min Bonus Settings
    for (let i = 0; i < 5; i++) {
      document.getElementById(`minBonus-bonus-${i}`).value =
        settings.getDefaultMinBonus()[i]['bonus'];
    }

    //Reset Min Bonus Values
    for (let i = 0; i < 5; i++) {
      document.getElementById(`minBonus-value-${i}`).value =
        settings.getDefaultMinBonus()[i]['value'];
    }

    //Reset Total Bonus Values
    for (let i = 0; i < 5; i++) {
      document.getElementById(`totalBonus-bonus-${i}`).value =
        settings.getDefaultTotalBonus()[i]['bonus'];
    }

    //Reset Min Bonus Active Checkbox
    document.getElementById('minBonusCheckbox').checked =
      settings.getDefaultMinBonusActive();

    //Save Changes in the Local Storage
    setLocalStorage('settings');
  };
  //#endregion

  //#region Save Local Storage
  const setLocalStorage = (keyName) => {
    let storageItem;
    switch (keyName) {
      case 'settings':
        storageItem = {
          minBonus: {
            active: settings.minBonusActive(),
            values: settings.getMinBonus(),
          },
          totalBonus: settings.getTotalBonus(),
        };
        break;

      case 'players':
        storageItem = {
          players: players.getPlayers(),
        };
        break;

      case 'territories':
        storageItem = {
          territories: currentTerritories.territoriesList,
        };
        break;
    }
    localStorage.setItem(keyName, JSON.stringify(storageItem));
  };
  //#endregion
  //#endregion

  const [removeScroll, setRemoveScroll] = useState(false);
  const [backgroundBlur, setBackgroundBlur] = useState(false);

  return (
    <>
      <C.Main changeActive={changeActive || calculateActive}>
        <C.ContainerBonus saveSettingsActive={saveSettingsActive}>
          <Title text={'Game Settings'} fontSize={'1rem'} />
          <C.SaveSettingWarning saveSettingsWarning={saveSettingsWarning}>
            {settingsWarningMessage}
          </C.SaveSettingWarning>
          <C.ButtonSaveSettings>
            <Button
              text={'Reset'}
              buttonBgColor={'#228be6'}
              onClick={() => [
                setResetAlertActive(true),
                setBackgroundBlur(true),
                setRemoveScroll(true),
              ]}
            />
            <Button
              text={saveSettingsActive ? 'Save Settings*' : 'Save Settings'}
              fontSize={'0.8rem'}
              buttonHeight='20px'
              buttonBgColor='#2e8b2e'
              disabled={!saveSettingsActive}
              onClick={() => saveSettings()}
            />
          </C.ButtonSaveSettings>
          <C.BonusSettings>
            <C.BonusContinent>
              <C.BonusHeader>
                <C.Title>Continent</C.Title>
              </C.BonusHeader>
              <C.TerritoryItems>
                {territoryItem('Africa')}
                {territoryItem('Asia')}
                {territoryItem('Europe')}
                {territoryItem('North America')}
                {territoryItem('Oceania')}
                {territoryItem('South America')}
              </C.TerritoryItems>
            </C.BonusContinent>
            <C.BonusMin>
              <C.BonusHeader>
                <C.Title>Min. Bonus</C.Title>
                <CheckBox
                  onClick={() => [
                    setMinBonusActive(!minBonusActive),
                    setSaveSettingsActive(true),
                  ]}
                  id={'minBonusCheckbox'}
                  checked={minBonusActive}
                />
                <ButtonInfo
                  text={
                    'MIN.: Minimum number of territories on this continent required to earn bonus troops.'
                  }
                  textAdditional={
                    'BONUS: Number of troops granted by minimum required domain of this continent.'
                  }
                />
              </C.BonusHeader>
              <C.BonusMinLeft minBonusActive={minBonusActive}>
                {inputItem('minBonus', 'value', 0, 'Min.')}
                {inputItem('minBonus', 'value', 1)}
                {inputItem('minBonus', 'value', 2)}
                {inputItem('minBonus', 'value', 3)}
                {inputItem('minBonus', 'value', 4)}
                {inputItem('minBonus', 'value', 5)}
              </C.BonusMinLeft>
              <C.BonusMinRight minBonusActive={minBonusActive}>
                {inputItem('minBonus', 'bonus', 0, 'Bonus')}
                {inputItem('minBonus', 'bonus', 1)}
                {inputItem('minBonus', 'bonus', 2)}
                {inputItem('minBonus', 'bonus', 3)}
                {inputItem('minBonus', 'bonus', 4)}
                {inputItem('minBonus', 'bonus', 5)}
              </C.BonusMinRight>
            </C.BonusMin>
            <C.BonusTotal>
              <C.BonusHeader>
                <C.Title>Total Bonus</C.Title>
                <ButtonInfo
                  text={'TOTAL: Total number of territories on this continent.'}
                  textAdditional={
                    'BONUS: Number of troops granted by the entire domain of this continent.'
                  }
                />
              </C.BonusHeader>
              <C.BonusTotalLeft>
                {inputItem('totalBonus', 'value', 0, 'Total')}
                {inputItem('totalBonus', 'value', 1)}
                {inputItem('totalBonus', 'value', 2)}
                {inputItem('totalBonus', 'value', 3)}
                {inputItem('totalBonus', 'value', 4)}
                {inputItem('totalBonus', 'value', 5)}
              </C.BonusTotalLeft>
              <C.BonusTotalRight>
                {inputItem('totalBonus', 'bonus', 0, 'Bonus')}
                {inputItem('totalBonus', 'bonus', 1)}
                {inputItem('totalBonus', 'bonus', 2)}
                {inputItem('totalBonus', 'bonus', 3)}
                {inputItem('totalBonus', 'bonus', 4)}
                {inputItem('totalBonus', 'bonus', 5)}
              </C.BonusTotalRight>
            </C.BonusTotal>
          </C.BonusSettings>
        </C.ContainerBonus>
        <C.ContainerPlayers editPlayersActive={editPlayersActive}>
          <Button
            text={editPlayersActive ? 'Save Players' : 'Edit Players'}
            onClick={() => savePlayers()}
            color={editPlayersActive ? '#fff' : '#808080'}
            buttonBgColor={'#2e8b2e'}
          />
          <Title text={'Players'} fontSize={'1rem'} />
          <C.SavePlayersWarning savePlayersWarning={savePlayersWarning}>
            {settingsPlayersMessage}
          </C.SavePlayersWarning>
          <C.Players>
            {playerItem('player1')}
            {playerItem('player4')}
            {playerItem('player2')}
            {playerItem('player5')}
            {playerItem('player3')}
            {playerItem('player6')}
          </C.Players>
        </C.ContainerPlayers>
        <C.ContainerTerritories
          editingActive={addTerritoryWindow || deleteItemActive}
        >
          <C.TerritoriesContent>
            <C.AddAlert showAddAlert={showAddAlert}>
              Territory Added!
            </C.AddAlert>
            <C.TerritoriesTitle>
              <Title
                text={`Available Territories | Count: ${availableTerritories(
                  true
                )}`}
                titleWidth={'100%'}
              />
              <Title text={'Continent'} />
              <Title text={'| Territory'} />
            </C.TerritoriesTitle>
            <C.TerritoriesItems>{availableTerritories()}</C.TerritoriesItems>
            <C.TerritoriesAddWindow addTerritoryWindow={addTerritoryWindow}>
              <C.InputAlert showInputAlert={showInputAlert}>
                {inputAlertText}
              </C.InputAlert>
              <Input
                label={'labelAddTerritoryName'}
                text={"Territory's Name"}
                placeholder={'Ex.: Canada'}
                value={territoryName}
                onChange={(e) => setTerritoryName(e.target.value)}
                maxLength={14}
              />
              <Select
                label={'labelAddTerritoryContinent'}
                text={'Continent'}
                options={[
                  ['Africa', 'africa'],
                  ['Asia', 'asia'],
                  ['Europe', 'europe'],
                  ['North America', 'northAmerica'],
                  ['Oceania', 'oceania'],
                  ['South America', 'southAmerica'],
                ]}
                onChange={(e) =>
                  setTerritoryContinent(
                    e.target.options[e.target.selectedIndex].text
                  )
                }
              />
              <Button
                text={'Add'}
                buttonBgColor={'#228be6'}
                buttonWidth={'100%'}
                buttonHeight={'1.6rem'}
                onClick={() => addTerritory(territoryName, territoryContinent)}
              />
            </C.TerritoriesAddWindow>
          </C.TerritoriesContent>
          <C.TerritoriesButtons>
            <Button
              text={addTerritoryWindow ? 'Finish' : 'Add New Territory'}
              buttonBgColor={'#2e8b2e'}
              buttonWidth={'100%'}
              disabled={deleteItemActive}
              onClick={() => setAddTerritoryWindow(!addTerritoryWindow)}
            />
            <Button
              text={deleteItemActive ? 'Cancel' : 'Delete Item'}
              buttonBgColor={'#ca1e1e'}
              buttonWidth={'100%'}
              disabled={addTerritoryWindow}
              onClick={() => [
                setDeleteItemActive(!deleteItemActive),
                setLocalStorage('territories'),
              ]}
            />
          </C.TerritoriesButtons>
        </C.ContainerTerritories>
        <C.ContainerCalculate>
          <C.ContainerCalculateItem>
            <C.ContainerCalculateTitle>
              Change Territories
            </C.ContainerCalculateTitle>
            <Button
              text={'🖉'}
              buttonBgColor={'#228be6'}
              onClick={() => changeTerritories()}
            />
          </C.ContainerCalculateItem>
          <C.ContainerCalculateItem>
            <C.ContainerCalculateTitle>Calculate</C.ContainerCalculateTitle>
            <Button
              text={'✓'}
              buttonBgColor={'#2e8b2e'}
              onClick={() => [calculateTerritories(), setCalculateActive(true)]}
            />
          </C.ContainerCalculateItem>
        </C.ContainerCalculate>
      </C.Main>
      <C.ContainerPlayersCards>
        <C.ContainerCards>
          {playersCards()}
          {updateTerritories}
          <C.CardPlaceholder card={1} />
          <C.CardPlaceholder card={2} />
          <C.CardPlaceholder card={3} />
          <C.CardPlaceholder card={4} />
        </C.ContainerCards>
      </C.ContainerPlayersCards>
      <C.ContainerBlur backgroundBlur={backgroundBlur} />
      <RemoveScroll enabled={removeScroll}>
        <C.ResetSettingsAlert resetAlertActive={resetAlertActive}>
          <C.ResetSettingsAlertHeader>
            <Title text={'⚠ Reset settings...'} />
            <Button
              text={'x'}
              buttonBgColor={'#ca1e1e'}
              onClick={() => [
                setResetAlertActive(false),
                setBackgroundBlur(false),
                setRemoveScroll(false),
              ]}
            />
          </C.ResetSettingsAlertHeader>
          <C.ResetSettingsAlertMessage>
            <Title
              text={
                'All changes made will be lost and replaced with default values.'
              }
            />
          </C.ResetSettingsAlertMessage>
          <C.ResetSettingsAlertButtons>
            <Button
              text={'Reset Default Settings'}
              buttonBgColor={'#2e8b2e'}
              onClick={() => [
                resetSettings(),
                setResetAlertActive(false),
                setBackgroundBlur(false),
                setRemoveScroll(false),
              ]}
            />
            <Button
              text={'Cancel'}
              buttonBgColor={'#ca1e1e'}
              onClick={() => [
                setResetAlertActive(false),
                setBackgroundBlur(false),
                setRemoveScroll(false),
              ]}
            />
          </C.ResetSettingsAlertButtons>
        </C.ResetSettingsAlert>

        <C.CalculateTerritoriesResult calculateActive={calculateActive}>
          <C.CalculateHeader>
            <Title text={'Troop Calculation'} />
            <Button
              text={'x'}
              buttonBgColor={'#ca1e1e'}
              buttonWidth={'1.4rem'}
              buttonHeight={'1.3rem'}
              onClick={() => exitCalculation()}
            />
          </C.CalculateHeader>
          <C.CalculateContent>{calculatedList}</C.CalculateContent>
        </C.CalculateTerritoriesResult>
        <C.ChangeTerritoriesAlert changeAlertActive={changeAlertActive}>
          <C.ChangeTerritoriesAlertHeader>
            <Title text={'⚠ You have pending changes...'} />
            <Button
              text={'x'}
              buttonBgColor={'#ca1e1e'}
              buttonWidth={'1.4rem'}
              buttonHeight={'1.3rem'}
              onClick={() => setChangeAlertActive(!changeAlertActive)}
            />
          </C.ChangeTerritoriesAlertHeader>
          <C.ChangeTerritoriesAlertMessage>
            <Title
              text={
                'Canceling will cause **all** the changes you have made to be lost. Do you want to save?'
              }
            />
          </C.ChangeTerritoriesAlertMessage>
          <C.ChangeTerritoriesAlertButtons>
            <Button
              text={'Save Changes'}
              buttonBgColor={'#2e8b2e'}
              onClick={() => [
                saveTradesChanges(),
                setChangeActive(false),
                setBackgroundBlur(false),
                setRemoveScroll(false),
              ]}
            />
            <Button
              text={'Exit'}
              buttonBgColor={'#ca1e1e'}
              onClick={() => cancelTradesChanges()}
            />
          </C.ChangeTerritoriesAlertButtons>
        </C.ChangeTerritoriesAlert>
        <C.ChangeTerritories
          changeActive={changeActive}
          changeAlertActive={changeAlertActive}
        >
          <C.ChangeTerritoriesHeader>
            <Title text={'Change Territories'} fontSize={'1rem'} />
            <C.ChangeTerritoriesButtons>
              <Button
                text={saveTradesActive ? 'Save Changes*' : 'Save Changes'}
                buttonBgColor={'#2e8b2e'}
                buttonWidth={'120px'}
                buttonHeight={'1.3rem'}
                fontSize={'0.8rem'}
                disabled={!saveTradesActive}
                onClick={() => saveTradesChanges()}
              />
              <Button
                text={'x'}
                buttonBgColor={'#ca1e1e'}
                buttonWidth={'1.4rem'}
                buttonHeight={'1.3rem'}
                onClick={() => exitTradesWindow()}
              />
            </C.ChangeTerritoriesButtons>
          </C.ChangeTerritoriesHeader>
          <C.ChangeTerritoriesSelect>
            <C.ChangeTerritoriesFrom>
              <C.TerritoriesContainerTitle>
                <Title text={'From'} fontSize={'0.9rem'} />
              </C.TerritoriesContainerTitle>
              <C.TerritoriesFromContainer>
                {changeTerritoriesPlayers('from')}
              </C.TerritoriesFromContainer>
            </C.ChangeTerritoriesFrom>
            <C.ChangeTerritoriesSwitch>
              {changeTerritorieSwitch()}
            </C.ChangeTerritoriesSwitch>
            <C.ChangeTerritoriesTo>
              <C.TerritoriesContainerTitle>
                <Title text={'To'} fontSize={'0.9rem'} />
              </C.TerritoriesContainerTitle>
              <C.TerritoriesToContainer>
                {changeTerritoriesPlayers('to')}
              </C.TerritoriesToContainer>
            </C.ChangeTerritoriesTo>
          </C.ChangeTerritoriesSelect>
          <C.ChangeTerritoriesList>
            <C.TerritoriesListFrom>
              {territoriesListItems('from')}
              {updateTerritories}
            </C.TerritoriesListFrom>
            <C.TerritoriesListTools>
              {changeTerritoriesAdd()}
              {changeTerritoriesCancel()}
              {changeTerritoriesSelectAll()}
            </C.TerritoriesListTools>
            <C.TerritoriesListTo>
              {territoriesListItems('to')}
            </C.TerritoriesListTo>
          </C.ChangeTerritoriesList>
        </C.ChangeTerritories>
      </RemoveScroll>
    </>
  );
}

export default Main;
