import { Game } from '../../types/game';
import * as React from 'react';

export interface GameListViewProps {
    games: Array<Game>;
}

export class GameListView extends React.Component<GameListViewProps, {}> {
    render() {
        const gamesList: Array<JSX.Element> = this.props.games.map(game => {
            return (<span key={game.titleId}> {game.name} </span>);
        });
        return (
            <div>
                {...gamesList}
            </div>
        )
    }
}