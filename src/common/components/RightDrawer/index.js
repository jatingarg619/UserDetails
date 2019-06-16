import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles({
  list: {
    width: 500,
  },
  fullList: {
    width: 'auto',
  },
});

export default function RightDrawer(props) {
  const classes = useStyles();
  // const [state, setState] = React.useState(props.toggle);
  console.log(props)
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
       
          <ListItem button key={props.data.display_name}>
             <ListItemText> {props.data ? props.data.display_name: null}</ListItemText>
              
          </ListItem>
          <ListItem button key={props.data.email}>
            <ListItemText> {props.data ? props.data.email : null}</ListItemText>
              
          </ListItem>
          <ListItem button >
            <ListItemText> Account Age: {props.data ? props.data.created_at: null}</ListItemText>
              
          </ListItem>
  
      </List>
      <Divider />
      <Button onClick={props.handleReset}>Reset Password</Button> 
      <List>
          
          <ListItem button >
            
            <ListItemText>Security: {props.data ? props.data.updated_at : null}</ListItemText>
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