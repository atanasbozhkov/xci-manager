import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { XCI } from '../../xci-helper/xci';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

export interface GameListViewProps {
    games: Array<XCI>;
}

export class GameList extends React.Component<GameListViewProps, {}> {
    constructor(props: GameListViewProps) {
        super(props);
    }

    render() {
        const gamesList: Array<JSX.Element> = this.props.games.map((game: XCI) => {
            return (
                <TableRow key={game.fileName}>
                    <TableCell component="th" scope="row">
                        {game.fileName}
                    </TableCell>
                    <TableCell numeric={true}>{game.humanReadableSize}</TableCell>
                    <TableCell numeric={true}>{game.usedSize}</TableCell>
                </TableRow>
            );
        });

        return (
            <Paper className={''}>
                <Table className={''}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell numeric={true}>Cartridge Size</TableCell>
                            <TableCell numeric={true}>Actual Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gamesList}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const
    mapStateToProps = (state: RootState) => ({
        games: state.xciFiles.xci
    });

export const
    GameListView = connect(mapStateToProps, {})(GameList);
