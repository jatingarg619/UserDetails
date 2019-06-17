import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'react-moment';


const useStyles = makeStyles({
  list: {
    width: 600,
  },
  fullList: {
    width: 'auto',
  },
});

export default function RightDrawer(props) {
  const classes = useStyles();

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    props.toggle(open)
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer( false)}
      onKeyDown={toggleDrawer( false)}
    > 
     
      <List>
          <button className="button-primary Left" onClick={props.handleReset}>Reset Password</button> 
          <ListItem button key={props.data.display_name}>
             <ListItemText> {Object.keys(props.data).length > 0  ? props.data.display_name: null}</ListItemText>
              
          </ListItem>
          <ListItem button key={props.data.email}>
            <ListItemText> {Object.keys(props.data).length > 0  ? props.data.email : null}</ListItemText>
              
          </ListItem>
          <ListItem button >
            <ListItemText> Account Age: {Object.keys(props.data).length > 0 ?  <span fromNow>{props.data.created_at.slice(0,10)} </span>: null}</ListItemText>
              
          </ListItem>
  
      </List>
      <Divider />
    
      <List>
          
          <ListItem button >
         
            <ListItemText>Last Updated: {Object.keys(props.data).length > 0  ?  <span fromNow> {props.data.updated_at.slice(0,10)} </span> : null}</ListItemText>
          </ListItem>
    
      </List>
    </div>
  );

  

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={props.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList('right')}
      </SwipeableDrawer>
    </div>
  );
}