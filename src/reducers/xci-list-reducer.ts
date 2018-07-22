import { AnyAction, Reducer } from 'redux';
import { ActionsList } from '../actions/actions-list';

export interface XCIListState {
    readonly files: Array<string>;
}

const defaultState: XCIListState = {
    files: []
};

export const xciListReducer: Reducer<XCIListState> = (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case ActionsList.CHANGE_XCI_LIST:
            return {
                ...state,
                files: action.payload
            };
        default:
            return state;
    }
};
