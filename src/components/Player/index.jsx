import { useState } from "react";
import * as C from "./styles";
import TerritoryItem from "../TerritoryItem";

function Player({
  playerName,
  playerActive,
  playerTerritories,
  territoriesCount,
}) {
  return (
    <C.ContainerPlayer playerActive={playerActive}>
      <C.PlayerHeader>
        <C.PlayerTitle>
          {"Player "}
          <C.DottedLine />
          {playerName}
        </C.PlayerTitle>
        <C.Territories>
          {"Territories"}
          <C.DottedLine />
          {territoriesCount}
        </C.Territories>
      </C.PlayerHeader>
      <C.PlayerTerritories>
        {playerTerritories.map((item, index) => (
          <TerritoryItem
            key={index}
            continent={item.continent}
            territory={item.territory}
          />
        ))}
      </C.PlayerTerritories>
    </C.ContainerPlayer>
  );
}

export default Player;
