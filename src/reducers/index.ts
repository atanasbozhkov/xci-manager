import { Reducer, combineReducers } from 'redux';

import { gameFolderReducer } from './game-folder-reducer';

export interface RootState {
    gameFolder: {
        value: string
    }
}

export const rootReducer = combineReducers<RootState | undefined>({
    gameFolder: gameFolderReducer
});
