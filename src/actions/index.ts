import { GameFolderChangeAction } from './game-folder-actions';

export type RootActions = GameFolderChangeAction[keyof GameFolderChangeAction]
