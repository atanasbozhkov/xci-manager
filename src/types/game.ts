export class Game {
    titleId: string;
    name: string;
    size: number;

    // TODO: Add all sub properties to an enriched game obj?
    // like language, developer, masterkey, game version, etc.
    constructor(titleId: string, name: string, size: number) {
        this.titleId = titleId;
        this.name = name;
        this.size = size;
    }
}