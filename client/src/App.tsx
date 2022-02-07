import React, { useState } from 'react'
import AddItem from './components/AddItem'
import BarcodeScanner from './components/BarcodeScan'
import {
    AppBar,
    Paper,
    Grid,
    BottomNavigation,
    BottomNavigationAction,
    Container,
    CssBaseline,
    Toolbar
} from '@material-ui/core'
import './App.css';
import { Theme, createStyles, createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { getItem } from './API'
import ItemCard from './components/ItemCard'
import AddTab from "./components/AddTab";
import AppMenuBar from "./components/AppMenuBar";


const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    height: '100%',
                },
                body: {
                    height: '100%',
                },
                '#root': {
                    height: '100%',
                },
            },
        },
    },
});


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bNav: {
            width: '100%',
            // position: 'absolute',
            // bottom: theme.spacing(0),
            // right: theme.spacing(0),
        },
        gridBNav:{
            width: '100%',
            // justifyItems: 'flex-end',
            justifySelf: 'flex-end',
        },
        gridItem: {
            flexGrow: 1,
            position: 'relative',
            // padding: theme.spacing(6)
        },
        grid:{
            height: '100%',
        },
    }),
);

const App = ({ }) => {

    const [navState, setNavState] = useState(0)


    const stylesClass = useStyles()

    return (
        <Container
            className={stylesClass.grid}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                    className={stylesClass.grid}
                    spacing={2}
                >

                    <Grid item >
                        <AppMenuBar/>
                    </Grid>
                        <Grid
                        item
                        className={stylesClass.gridItem}
                        >
                        <AddTab/>
                    </Grid>
                    <Grid
                        item
                        className={stylesClass.gridBNav}
                    >
                        <Paper>
                            <BottomNavigation
                                className={stylesClass.bNav}
                                showLabels
                                value={navState}
                                onChange={(event,newValue)=>{
                                    setNavState(newValue)
                                }}
                            >
                                <BottomNavigationAction label="Add" />
                                <BottomNavigationAction label="Search" />
                            </BottomNavigation>
                        </Paper>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Container>
    );
}

export default App;
