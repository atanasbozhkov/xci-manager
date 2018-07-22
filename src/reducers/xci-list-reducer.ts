import { AnyAction, Reducer } from 'redux';
import { ActionsList } from '../actions/actions-list';
import { XCI } from '../xci-helper/xci';

export interface XCIListState {
    readonly files: Array<string>;
    readonly xci: Array<XCI>;
}

const defaultState: XCIListState = {
    files: [],
    xci: []
};

export const xciListReducer: Reducer<XCIListState> = (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case ActionsList.CHANGE_XCI_LIST:
            return {
                ...state,
                files: action.payload
            };
        case ActionsList.XCI_CREATED:
            return {
                ...state,
                xci: [ action.payload, ...state.xci ]
            };
        default:
            return state;
    }
};
