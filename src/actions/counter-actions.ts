import { Action, ActionCreator } from 'redux';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
// TODO: Delete
export interface IncrementAction extends Action {
    type: 'INCREMENT';
}
export interface DecrementAction extends Action {
    type: 'DECREMENT';
}

export const increment: ActionCreator<IncrementAction> = () => ({
    type: INCREMENT
});

export const decrement: ActionCreator<DecrementAction> = () => ({
    type: DECREMENT
});

export type CounterAction = IncrementAction | DecrementAction;
