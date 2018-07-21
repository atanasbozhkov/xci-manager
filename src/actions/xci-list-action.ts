import { Action, ActionCreator } from 'redux';

export const XCI_LIST_ACTION = 'XCI_LIST_ACTION';

export interface XciListAction extends Action {
    type: 'XCI_LIST_ACTION';
    value: Array<string>;
}

export const changeXciList: ActionCreator<XciListAction> = (xciList: Array<string>) => {
    return {
        type: XCI_LIST_ACTION,
        value: xciList
    };
};
