import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer, RootState } from '../reducers';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../epics';

const epicMiddleware = createEpicMiddleware();

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
    const enhancer = composeWithDevTools(applyMiddleware(epicMiddleware));
    const store = createStore<RootState | undefined>(rootReducer, initialState, enhancer);
    epicMiddleware.run(rootEpic);
    return store;
};

const INITIAL_STATE: RootState = {
    gameFolder: {
        value: ''
    },
    xciFiles: {
        files: [],
        xci: []
    }
};

const store = configureStore(INITIAL_STATE);
if (typeof module.hot !== 'undefined') {
    module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').rootReducer)
    );
}

export default store;
