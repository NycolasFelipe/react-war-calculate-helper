import * as C from './styles';
import DataContext from '../../contexts/DataContext';
import { useContext } from 'react';

function CalculateResultItem({
  playerName,
  territoriesLength,
  territoriesTotality,
}) {
  //Access bonus values and other important information stored in settings
  const { settings } = useContext(DataContext);

  //Returns a paragraph that contains information about total bonuses
  const TotalityContinentItem = (continent, value, maxValue, bonus) => {
    if (continent === 'South America') continent = 'South. A.';
    if (continent === 'North America') continent = 'North. A.';
    return (
      <p key={continent}>
        {continent} [{value}/{maxValue}] (+{bonus})
      </p>
    );
  };

  //#region Bonus by Totality
  //Sum of all bonuses received by continental totality
  let bonusByTotality = 0;

  //Stores all TotalityContinentItem elements related to each player,
  //to display them later
  let infoTotality = [];

  //Calculates the values and adds them to infoTotality to be displayed later
  for (let i in territoriesTotality) {
    let item = territoriesTotality[i];
    let continent = item['continent'];
    let totalValue = settings.getTotalValueContinent(continent);
    let totalBonus = settings.getTotalBonusContinent(continent);
    let minBonus = settings.getMinBonusContinent(continent);
    let minValue = item['count'];

    if (item['totality']) {
      bonusByTotality += totalBonus;
      infoTotality.push(
        TotalityContinentItem(continent, totalValue, totalValue, totalBonus)
      );
    } else if (item['minTotality']) {
      bonusByTotality += minBonus;
      infoTotality.push(
        TotalityContinentItem(continent, minValue, totalValue, minBonus)
      );
    }
  }
  //#endregion

  //Troop bonuses by number of territories
  const bonusByTerritories = Math.floor(territoriesLength / 2);

  return (
    <C.Container>
      <C.Header>
        <C.HeaderTitle>{playerName}</C.HeaderTitle>
      </C.Header>
      <C.Content>
        <C.SectionCount>
          <C.SectionCountHeader>Troops by territory count</C.SectionCountHeader>
          <C.SectionCountContent>
            {territoriesLength + ' ⭢'}
            <span>+{bonusByTerritories}</span>
          </C.SectionCountContent>
        </C.SectionCount>
        <C.SectionPlus>+</C.SectionPlus>
        <C.SectionTotality>
          <C.SectionTotalityHeader>
            Troops by continent totality
          </C.SectionTotalityHeader>
          <C.SectionTotalityContent>
            <C.TotalityContentInfo>{infoTotality}</C.TotalityContentInfo>
            <C.TotalityContentSummation>➾</C.TotalityContentSummation>
            <C.TotalityContentResult>
              +{bonusByTotality}
            </C.TotalityContentResult>
          </C.SectionTotalityContent>
        </C.SectionTotality>
        <C.SectionEqual>=</C.SectionEqual>
        <C.SectionResult>
          <C.SectionResultHeader>Total</C.SectionResultHeader>
          <C.SectionResultValue>
            +{bonusByTerritories + bonusByTotality}
          </C.SectionResultValue>
        </C.SectionResult>
      </C.Content>
    </C.Container>
  );
}

export default CalculateResultItem;
