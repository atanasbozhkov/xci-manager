import { action } from 'typesafe-actions';
import { ActionsList } from './actions-list';
import { XCI } from '../xci-helper/xci';

export const xciCreated = (xci: XCI) => action(ActionsList.XCI_CREATED, xci);
export const xciProcessingError = (xciFileName: string, errorMessage: string) =>
    action(ActionsList.XCI_ERROR, { xciFileName, errorMessage });