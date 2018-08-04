import { ipcMain, dialog } from 'electron'

// Register folder-dialog listener
export const setupIPCListeners = () => {
    ipcMain.on('folder-dialog', (event: any, arg: any) => {
        console.log('hello from folder dialog');
        dialog.showOpenDialog({
            properties: [ "openDirectory" ]
        });
    });
};
