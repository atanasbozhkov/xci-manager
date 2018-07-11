import * as React from 'react';

import { GameListView } from "./game-list-view/game-list-view";
import { Game } from "../types/game";
import { GameFolderSelectView } from './game-folder-select-view/game-folder-select-view';

const gamesList = [
    new Game('a', 'Super Mario', 1024)
];

const Application = () => (
    <div>
        <div>
            <GameFolderSelectView />
        </div>
        <div>
            Hello World from Electron!
            <GameListView games={gamesList} />
        </div>
    </div>
);

export default Application;
