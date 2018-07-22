import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Action } from 'redux';
import { GAME_FOLDER_CHANGE } from '../actions/game-folder-actions';
import { mergeMap } from 'rxjs/operators';
import * as fs from 'fs';
import { changeXCIList } from '../actions/change-xci-list-action';

const getFileExtension = (fileName: string): string => {
    return fileName.split('.')[1];
};
const XCI_EXTENSION = 'XCI';
const isXCI = (fileName: string): boolean => {
    return getFileExtension(fileName).toUpperCase() === XCI_EXTENSION;
};

const readDirObservable = (directory: string): Observable<Action> => {
    return new Observable<Action>(subscriber => {
        fs.readdir(directory, (err, files: Array<string>) => {
            const xciFiles = files.filter(file => isXCI(file));
            console.log(`New XCI files ${xciFiles}`);
            subscriber.next(changeXCIList(xciFiles));
        });
    });
};

const gameFolderChangeEpic: Epic = (action, state): Observable<Action> => {
    return action.pipe(
        ofType(GAME_FOLDER_CHANGE),
        mergeMap(action => {
            return readDirObservable(action.value);
        })
    );
};

export const rootEpic = combineEpics(gameFolderChangeEpic);
