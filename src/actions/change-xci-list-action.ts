import { action } from 'typesafe-actions';
import { ActionsList } from './actions-list';

export const changeXCIList = (xciList: Array<string>) => action(ActionsList.CHANGE_XCI_LIST, xciList);