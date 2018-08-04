import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';

export interface GameListViewProps {
    games: Array<string>;
}

export class GameList extends React.Component<GameListViewProps, {}> {
    constructor(props: GameListViewProps) {
        super(props);
    }

    render() {
        const gamesList: Array<JSX.Element> = this.props.games.map(game => {
            return <span key={game}> {game} </span>;
        });
        return <div>{gamesList}</div>;
    }
}

const mapStateToProps = (state: RootState) => ({
    games: state.xciFiles.files
});

export const GameListView = connect(mapStateToProps, {})(GameList);
