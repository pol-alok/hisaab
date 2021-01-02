import React from 'react';
import { NavLink as RouterLink } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Avatar, Chip, ListItem, ListItemText, ListItemAvatar, IconButton} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    cursor: 'pointer'
  },  
}));

const  ContactCard = (props) => {
  const classes = useStyles();
  const {contact, onDelete } = props;

  let icon,color,lable;
  if(contact.total < 0) {
    icon = <ArrowUpwardRoundedIcon />
    color = 'secondary'
    lable = 'will take'
  } else if (contact.total > 0) {
    icon = <ArrowDownwardRoundedIcon />;
    color = 'primary'
    lable = 'will give'
  } else {
    icon = <RemoveRoundedIcon />
    color = 'default'
    lable = 'neither'
  }

  const to = '/contact/'+contact.id;

  return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <ListItem style={{width:'85%'}} component={RouterLink} to={to} >
                        <ListItemAvatar>
                            <Avatar alt={contact.name} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={contact.name}
                            secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                    <Chip variant="outlined" color={color} size="small" icon={icon} label={lable} />
                                    </Typography>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                    <Chip variant="outlined" color="default" size="small" avatar={<Avatar><b>₹</b></Avatar>} label={ Math.abs(contact.total) } />
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                    <IconButton edge="end" color="secondary" aria-label="delete" onClick= {() => onDelete(contact.id)}>
                      <DeleteForeverRoundedIcon />
                    </IconButton>
                </Grid>
        </Paper>    
    </div>
  );
}

export default ContactCard;