import { combineReducers } from 'redux';

import { gameFolderReducer } from './game-folder-reducer';
import { xciListReducer } from './xci-list-reducer';
import { XCI } from "../xci-helper/xci";

export interface RootState {
    gameFolder: {
        value: string;
    };
    xciFiles: {
        files: Array<string>;
        xci: Array<XCI>;
    };
}

export const rootReducer = combineReducers<RootState | undefined>({
    gameFolder: gameFolderReducer,
    xciFiles: xciListReducer
});
