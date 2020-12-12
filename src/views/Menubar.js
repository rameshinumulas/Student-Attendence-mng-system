import React,{useState} from  'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Collegeimg from './images/Collegeimg';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';




import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    maxHeight:"300px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow:1
    display:"none",
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    marginLeft:theme.spacing(10),
    },
    // [theme.breakpoints.down('lg')]:{
    //   marginLeft:theme.spacing(40),
    //   display:"flex",
    //   justifyContent:"space-around",
    // }

  },
  menubar:{
    marginTop:theme.spacing(8),
    [theme.breakpoints.down('sm')]:{
      marginTop:theme.spacing(8),
    }
  },
  appbar:{
    height:"auto",
    [theme.breakpoints.down('sm')]:{
      height:"auto"
    }
  },
  titleName:{
    fontSize:14
  },
  sectionMobile: {
    display:"none",
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    // marginLeft:theme.spacing(10),
    },
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.secondary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Menubar() {
  const classes = useStyles();

  const [openEntries, setopenEntries] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);



  const handleEntries =(event)=>{
    setopenEntries(event.currentTarget)
    console.log(event.currentTarget);
  }
  const handleClose = ()=>{
    setopenEntries(null)

  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event)=>{
    setMobileMoreAnchorEl(event.currentTarget);
    // handleMobileMenuClose()

  }
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const handleLogins = (text)=>{
      console.log(text,"tttttttttt");
      if(text === "Entries"){
        setopenEntries(true)
      }

  }
  return (
    <div className={classes.root} >
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
         
          <Typography variant="h6" className={classes.titleName}>
            Attendence Managment System
          </Typography>
          <Grid className={classes.title}>
          {['Home',"Students","Teachers","Subjects","Monthly Report","Overal Report",
          "Do Attentence"].map((text, index) => (
         <Link to={`/${text}`} 
         style={{textDecoration:"none"}}>
           <Button variant="text"style={{color:"#FFFFFF"}}>
             {text}
           </Button>
         </Link>
        ))}
         </Grid>

  
          {/* <Link to path="/entries" style={{textDecoration:"none"}}>
            <Button variant="text" style={{color:"#FFFFFF"}} onClick={handleEntries} >Entries
            </Button>
            </Link> */}
            {/* <Link to path="/entries" style={{textDecoration:"none",color:"#FFFFFF"}}>
            <Button variant="text" style={{color:"#FFFFFF"}}>Logout</Button></Link> */}
          <Grid className={classes.sectionMobile}>
          <IconButton edge="start" 
          className={classes.menuButton} 
          color="inherit" aria-label="menu"
          aria-controls={mobileMenuId}

          onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          </Grid>
          <Drawer anchor="right" open={mobileMoreAnchorEl} onClose={handleMobileMenuClose}>
          <List>
        {['Home',"Students","Teachers","Subjects","Monthly Report","Overal Report","Do Attentence"].map((text, index) => (
          <ListItem button key={text} onClick={()=>handleLogins(text)}>
            {/* <ListItemIcon></ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      {/* <div className={classes.menubar}>
      <Collegeimg />
      </div> */}
      <StyledMenu
        id="customized-menu"
        anchorEl={openEntries}
        keepMounted
        open={Boolean(openEntries)}
        onClose={handleClose}
      >
      
     {["Home","Student Entry","Teacher Entry","Subject Entry","Do Attendence"].map(eachItem =>
      <div>
          <StyledMenuItem>
            <ListItemText primary={eachItem} />
          </StyledMenuItem>
      </div>)}        
        </StyledMenu>
    </div>
  );
}