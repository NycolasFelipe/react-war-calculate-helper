# War Calculate Helper
## Description
[This application](https://react-war-calculate-helper-nxmupdey5-nycolasfelipe.vercel.app/) was built using [React.Js](https://reactjs.org), and aims to help you calculate troops each round in the War Board Game.
It is able to define territories that will be used on the table, and the bonus (minimum and/or total) received when there is complete or partial dominance of a continent.

It is possible to define up to 6 players, and exchange territories between them, as well as between player and table.
All data is saved in local storage, so that the settings made by the user will persist when exiting the application.

The application is mobile friendly and has a responsive design, with a friendly look and feel to any device.

## How calculations are done
The calculation is done as follows:

````
Troops earned = Territories/2¹ + Total Bonus² or Minimum Bonus³
````
1. Number of territories divided by two (rounding down to the smallest integer).
2. Continental totality bonus defined in settings if any.
3. Minimum totality bonus, defined in settings and if active, if any

Only one bonus of each type will be added. If there is complete totality of a continent, the minimum totality bonus will not be added.


## Functionalities
### Game Settings:
- In total bonus, the user can set the number of bonus troops received by the player when they has totality on each continent;
- In minimum bonus, if active, the user can define the minimum number of territories per continent needed for the player to receive bonus troops, and how much this bonus will be on each continent.

### Available Territories:
- The user can add and remove territories from the available territories list;
- When adding a territory, it is necessary to provide the name of the territory and its continent. The territory will only be added if its name is unique.

### Trade (Change) Territories:
- You can transfer territories between players, and between table and player.

### Calculate:
Calculates the number of troops received by each player, and displays a list that displays the results

### Players:
- Up to 6 active players can be defined. Each player must have a unique name.

### Players Cards:
- Displays a list of territories owned by the corresponding player, as well as the number of territories.


## GIFS
### Edit and Reset Game Settings
![settings](https://user-images.githubusercontent.com/71052352/190274027-b7a8f646-b3d3-4dcb-be22-24edcf3b4a32.gif)

### Add and remove territories
![territories](https://user-images.githubusercontent.com/71052352/190274346-9a394979-596b-405d-b06e-073712d4e77e.gif)

### Calculate
![Sem título](https://user-images.githubusercontent.com/71052352/190280370-2cef3af6-475d-48d2-aaeb-e89378b279db.png)

### Add and remove players
![players](https://user-images.githubusercontent.com/71052352/190274908-5d6e48f5-70fc-4f72-8eee-407c32bee246.gif)

### Trade territories between players
![change-territories](https://user-images.githubusercontent.com/71052352/190275342-5b156cf2-8f40-465e-8f25-7d225f40be97.gif)

## Installing
1. `$ npm install`
2. `$ npm start`

## Used Libraries
[`react-remove-scroll`](https://www.npmjs.com/package/react-remove-scroll)
[`styled-components`](https://www.npmjs.com/package/styled-components)

### Thank you for your time!
