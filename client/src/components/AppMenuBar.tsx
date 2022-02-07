import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import React from "react";

const AppMenuBar = ()=>{
return(
    <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
                <Menu/>
            </IconButton>
            Barcode Price
        </Toolbar>
    </AppBar>
);
}

export default AppMenuBar