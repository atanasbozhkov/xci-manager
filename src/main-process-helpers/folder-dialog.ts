import { ipcMain, dialog } from 'electron'
import { IpcEvents } from "./ipc-events";

// Register folder-dialog listener
export const setupIPCListeners = () => {
    ipcMain.on(IpcEvents.OPEN_SELECT_FOLDER_DIALOG, () => {
        dialog.showOpenDialog({
            properties: [ "openDirectory" ]
        });
    });
};
