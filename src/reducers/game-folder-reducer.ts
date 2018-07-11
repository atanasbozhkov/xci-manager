import { GAME_FOLDER_CHANGE, GameFolderChangeAction } from '../actions/game-folder-actions';
import { Action, AnyAction, Reducer } from 'redux';

export interface GameFolderState {
    value: string;
}

const defaultState: GameFolderState = {
    value: ''
};

// TODO: Why the hell is redux unhappy with GameChangeAction here?
export const gameFolderReducer: Reducer<GameFolderState> = (state = defaultState,
                                                            action: AnyAction) => {
    switch (action.type) {
        case GAME_FOLDER_CHANGE:
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
}