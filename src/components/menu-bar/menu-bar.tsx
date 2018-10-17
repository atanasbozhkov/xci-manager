import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

export interface IMenuBarProps {
    appName: string;
}

const buttonOnClick = () => {
    console.log('Button got clicked');
};
export const MenuBar = (props: IMenuBarProps) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton
                    className={''}
                    color="inherit"
                    aria-label="Menu"
                    onClick={buttonOnClick}
                >
                    <Settings/>
                </IconButton>
                <Typography variant="h6" color="inherit">
                    {props.appName}
                </Typography>
            </Toolbar>
        </AppBar>
    )
};
