import { AnyAction, Reducer } from 'redux';
import { XCI_LIST_ACTION, XciListAction } from '../actions/xci-list-action';

export interface XCIListState {
    readonly files: Array<string>;
}

const defaultState: XCIListState = {
    files: []
};

export const xciListReducer: Reducer<XCIListState> = (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case XCI_LIST_ACTION:
            return {
                ...state,
                files: action.value
            };
        default:
            return state;
    }
};
