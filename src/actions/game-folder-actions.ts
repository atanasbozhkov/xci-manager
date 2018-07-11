import { Action, ActionCreator } from 'redux';

export const GAME_FOLDER_CHANGE = 'GAME_FOLDER_CHANGE';

export interface GameFolderChangeAction extends Action {
    type: 'GAME_FOLDER_CHANGE',
    value: string
}

export const changeGameFolder: ActionCreator<GameFolderChangeAction> = (newFolder: string) => {
    return {
        type: GAME_FOLDER_CHANGE,
        value: newFolder
    }
};
