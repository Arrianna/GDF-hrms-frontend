import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import gdfLogo from '../assets/gdfLogo.png';
import { HourglassEmptyTwoTone, PersonAddRounded, PersonRounded } from '@material-ui/icons';

const drawerWidth = 240;

const hrmsHeader = {
  color: 'black',
}

const gdfStyle = {
  color: 'green'
}

/*const listMargin = {
  marginTop: '0px',
  paddingTop: '0px'
}*/

const gdfLogoStyle = {
  width: drawerWidth,
  paddingTop: '0px',
  height: AppBar.height,
  marginBottom: '0px'
}

const iconMargin = {
  marginRight: '30px'
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <img src={gdfLogo} alt="Logo" style = {gdfLogoStyle} />;
      <div className={classes.toolbar} />
      {/*<Divider />*/}
      <List>
        <ListItem button><HomeIcon style={iconMargin}/><Link to="/" color="primary" variant="body2" underline="none"><ListItemText primary='Home'/></Link></ListItem>
        <ListItem button><PersonAddRounded style={iconMargin}/><Link to="/add-employee" color="primary" variant="body2" underline="none"><ListItemText primary='Add Employee'/></Link></ListItem>
        <ListItem button><HourglassEmptyTwoTone style={iconMargin}/><Link to="/employee-history" color="primary" variant="body2" underline="none"><ListItemText primary='Employee History'/></Link></ListItem>
        <ListItem button><SearchIcon style={iconMargin}/><Link to='/search-page' color="primary" variant="body2" underline='none'><ListItemText primary='Employee Search'/></Link></ListItem>
        <ListItem button><PersonRounded style={iconMargin}/><Link to="/employee-profile" color="primary" variant="body2" underline='none'><ListItemText primary='Employee Profile'/></Link></ListItem>
      </List>
      <Divider />
      <List>
        {['Something Else', 'More', 'Something More'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <HourglassEmptyTwoTone /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color='inherit'>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <div>
            <Typography variant="h4" noWrap style={gdfStyle}>GUYANA DEFENCE FORCE</Typography>
            <Typography variant="h5" style = {hrmsHeader} noWrap>Human Resources Management System</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}        
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;