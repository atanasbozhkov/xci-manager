import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import application from './components/application';
import store from './store';
import { XCI } from "./xci-helper/xci";

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        mainElement
    );
};

render(application);
const xciHelper = XCI.createXCI('/Users/atanasbozhkov/Desktop/XCI/test.xci',
    (xciObject) => {
        console.log(xciObject);
    },
    (onError) => {
        console.log(onError);
    });

// Hot Module Replacement API
if (typeof module.hot !== 'undefined') {
    module.hot.accept('./components/Application', () => {
        import('./components/application').then(World => {
            render(World.default);
        });
    });
}
