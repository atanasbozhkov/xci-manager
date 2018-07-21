import * as React from 'react';

import { GameListView } from './game-list-view/game-list-view';
import { GameFolderSelectView } from './game-folder-select-view/game-folder-select-view';

const application = () => (
    <div>
        <div>
            <GameFolderSelectView />
        </div>
        <div>
            Hello World from Electron!
            <GameListView />
        </div>
    </div>
);

export default application;
