import {
    combineReducers, compose, applyMiddleware, createStore, Store, Reducer, StoreEnhancer, Action,
    AnyAction
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer, RootState } from '../reducers';

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
    const middlewares: any[] = [];
    const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
    return createStore<RootState | undefined>(rootReducer, initialState, enhancer);
};

const INITIAL_STATE: RootState = {
    gameFolder: {
        value: ''
    }
};

const store = configureStore(INITIAL_STATE);

if (typeof module.hot !== 'undefined') {
    module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').rootReducer)
    );
}

export default store;
