import * as React from 'react';

import { GameListView } from './game-list-view/game-list-view';
import { GameFolderSelectView } from './game-folder-select-view/game-folder-select-view';
import { MenuBar } from "./menu-bar/menu-bar";

const application = () => (
    <div>
        <MenuBar appName={'XCI-Manager'}/>
        <div>
            <GameFolderSelectView/>
        </div>
        <div>
            <GameListView/>
        </div>
    </div>
);

export default application;
