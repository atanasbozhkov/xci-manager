import { dialog, ipcMain } from 'electron'
import { IpcEvents } from "./ipc-events";

// Register folder-dialog listener
export const setupIPCListeners = () => {
    ipcMain.on(IpcEvents.OPEN_SELECT_FOLDER_DIALOG, (event: any) => {
        dialog.showOpenDialog({
            properties: [ "openDirectory" ]
        },
        (filePaths) => {
            event.sender.send('directoryLocation', filePaths);
        });
    });
};
