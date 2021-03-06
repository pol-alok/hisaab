import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  Avatar,
  Chip,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { DeleteForeverRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  paper: {
    maxWidth: 500,
  },
}));

const ContactCard = (props) => {
  const classes = useStyles();
  const { txn, onDelete, onEdit } = props;
  const buildDate = () => {
    let today = new Date(txn.cdate);
    let day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];
    let month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][today.getMonth()];
    let dd = String(today.getDate()).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = day + ', ' + month + ' ' + dd + ' ' + yyyy;
    return today;
  };

  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        style={{ background: txn.value < 0 ? '#ffcccc' : '#ccffcc' }}>
        <Grid container wrap='nowrap' spacing={2}>
          <ListItem>
            <ListItemAvatar>
              <ReceiptRoundedIcon />
            </ListItemAvatar>
            <ListItemText
              primary={txn.itemName}
              secondary={
                <>
                  <Typography
                    component='span'
                    variant='body2'
                    color='textPrimary'>
                    <Chip
                      variant='outlined'
                      color={txn.value < 0 ? '#ffcccc' : '#ccffcc'}
                      size='small'
                      avatar={
                        <Avatar>
                          <b>₹</b>
                        </Avatar>
                      }
                      label={Math.abs(txn.value)}
                    />
                  </Typography>
                  <Typography variant='caption'>
                    {' — ' + buildDate()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </Grid>
        <Grid container justify='flex-end' spacing={2}>
          <IconButton
            color='default'
            aria-label='edit'
            onClick={() => onEdit(txn.id)}>
            <EditRoundedIcon />
          </IconButton>
          <IconButton
            color='secondary'
            aria-label='delete'
            onClick={() => onDelete(txn.id)}>
            <DeleteForeverRounded />
          </IconButton>
        </Grid>
      </Paper>
    </div>
  );
};

export default ContactCard;
