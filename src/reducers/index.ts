import { combineReducers } from 'redux';

import { gameFolderReducer } from './game-folder-reducer';
import { xciListReducer } from './xci-list-reducer';

export interface RootState {
    gameFolder: {
        value: string;
    };
    xciFiles: {
        files: Array<string>;
    };
}

export const rootReducer = combineReducers<RootState | undefined>({
    gameFolder: gameFolderReducer,
    xciFiles: xciListReducer
});
