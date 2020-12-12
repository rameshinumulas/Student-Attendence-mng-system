import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow:2,
      },
      list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
    },  
}));

export default function Adminmenu() {
  const classes = useStyles();
  const [toggle, settoggle] = useState(false)
  

  const toggleDrawer = () => {
      settoggle(true)
   
  };

  

  return (
    <div className="dhashboard">
        <AppBar position="fixed">
            <Toolbar>
              <IconButton
              edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
              onClick={toggleDrawer}>
                  <MenuIcon />
              </IconButton>
              <SwipeableDrawer
              anchor="text"
              open={toggle}
              onClose={()=> settoggle(false)}
              onOpen={toggle}
              >
                <Typography variant="h6" component="h2" color="secondary">
                    Admin Dashboard
                </Typography>
                  <List>
                  {['Course', 'Teacher', 'Student', 'View Attendence'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
               

          </SwipeableDrawer>
            <Typography variant="h6" color="inherit">
                Admin
            </Typography>
            <Typography className={classes.title}>
            <Button color="inherit">logout</Button>
            </Typography>
            </Toolbar>
        </AppBar>
 
      
    </div>
  );
}

