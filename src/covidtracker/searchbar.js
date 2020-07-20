import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { CovidContext } from './api-context';
import { useStyles } from './searchbarStyles';
import { NavLink } from 'react-router-dom';


export default function SearchAppBar() {
  
  const {theme, toggleTheme} = useContext(CovidContext);
  const currentTheme = theme.isLightTheme ? theme.lightTheme : theme.darkTheme;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: currentTheme.appbarColor }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleTheme}
          >
            <MenuIcon />
          </IconButton>
         
            <Typography className={classes.title} variant="h6" noWrap cursor='pointer'>
              LILOAN, CEBU - COVID DATA {/* <NavLink to='/youtube'>TRACKER </NavLink> */}
            </Typography>
          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}