# RPG Dice Roller and Player Sheet Manager
## Description
...

## Screenshots
![main](https://user-images.githubusercontent.com/71052352/190033021-0e5c4e01-4ba9-41df-b1e0-0b3d7fcde70b.jpg)
![players](https://user-images.githubusercontent.com/71052352/190033200-8e23a4ad-4485-4719-bc0e-8f492fb6016a.jpg)


## Installing
1. `$ npm install`
2. `$ npm start`


## How the app works
### Game Settings:
- In total bonus, the user can set the number of bonus troops received by the player when they has totality on each continent;
- In minimum bonus, if active, the user can define the minimum number of territories per continent needed for the player to receive bonus troops, and how much this bonus will be on each continent.

### Available Territories:
- The user can add and remove territories from the available territories list;
- When adding a territory, it is necessary to provide the name of the territory and its continent. The territory will only be added if its name is unique.

### Players:
- Up to 6 active players can be defined. Each player must have a unique name.

### Players Cards:
- Displays a list of territories owned by the corresponding player, as well as the number of territories.


## Used Libraries
`react-remove-scroll`
`styled-components`
