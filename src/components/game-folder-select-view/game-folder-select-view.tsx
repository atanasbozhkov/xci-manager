import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { changeGameFolder, GameFolderChangeAction } from '../../actions/game-folder-actions';
import { Dispatch } from 'redux';
import { get } from 'lodash';
import { ipcRenderer } from 'electron';
require('./game-folder-select-view.scss');

export interface GameFolderSelectViewProps {
    value: string;
    onFolderSelect: (newPath: string) => GameFolderChangeAction;
}

const GameFolderSelect: React.SFC<GameFolderSelectViewProps> = ({ onFolderSelect, value }) => {
    const openFolderSelect = () => {
        ipcRenderer.on('directoryLocation', (event: any, data: string) => {
            // TODO: Add error handling
            onFolderSelect(get(data, [ '0' ]));
        });
        ipcRenderer.send('openSelectFolderDialog');
    };

    const inputView = (
        <div uk-form-custom="true">
            <button onClick={openFolderSelect} title={"Select XCI Folder"}> Select Folder </button>
        </div>
    );
    const view = value ? (<span> {value} </span>):  ( inputView );

    return (<span> {view} </span>);
};


const mapStateToProps = (state: RootState) => ({
    value: state.gameFolder.value
});

const mapDispatchToProps = (dispatch: Dispatch<GameFolderChangeAction>) => ({
    onFolderSelect: (newFolder: string) => {
        if (newFolder !== undefined) {
            dispatch(changeGameFolder(newFolder));
        }
    }
});

export const GameFolderSelectView = connect(mapStateToProps, mapDispatchToProps)(GameFolderSelect);
