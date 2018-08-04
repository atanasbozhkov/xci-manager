import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { changeGameFolder, GameFolderChangeAction } from '../../actions/game-folder-actions';
import { Dispatch } from 'redux';
import { get } from 'lodash';
import { ipcRenderer } from 'electron';
require('./game-folder-select-view.scss');

// Little workaround to set webkit-only attrs on an element.
function addDirectory(node: HTMLElement|null): void {
    if (node) {
        (node as any).directory = true;
        (node as any).webkitdirectory = true;
    }
}

export interface GameFolderSelectViewProps {
    value: string;
    onFolderSelect: (newPath: string) => GameFolderChangeAction;
}

const GameFolderSelect: React.SFC<GameFolderSelectViewProps> = ({ onFolderSelect, value }) => {
    const openFolderSelect = () => {
        console.log(`click `);
        ipcRenderer.sendSync('folder-dialog')
    };

    const logger = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList = ((event.target) as any).files;
        const newFolder = get(fileList, ['0', 'path']);
        console.log(`User update folder preference to: ${newFolder}`);
        onFolderSelect(newFolder);
    };
    const inputView = (
        <div uk-form-custom="true">
            <button onClick={openFolderSelect} title={"Test"}> Test </button>
        </div>
    );
    const view = value ? (<span> {value} </span>):  ( inputView );

    return (
        <span>
            {view}
        </span>
    )
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
