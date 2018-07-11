import { GameListView } from '../../../src/components/game-list-view/game-list-view';
import { Game } from '../../../src/types/game';
import * as renderer from 'react-test-renderer';
import * as React from 'react';


describe('GIVEN a GameListView', () => {
    it('SHOULD be defined', () => {
        expect(GameListView).toBeDefined();
    });

    describe('AND given a list of games', () => {
        let games: Array<Game>;
        beforeEach(() => {
            games = [new Game('id', 'GameName', 128)];
        });
        it('SHOULD render a list of games that are passed in', () => {
            const view = renderer.create(<GameListView games={games}/>);
            const instance: renderer.ReactTestInstance = view.root;
            const actual = instance.findByType('span');
            expect(actual.children[1]).toBe( games[0].name);
        });
    });
});