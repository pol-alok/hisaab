import React, { useState } from 'react';
import {
  Avatar,
  Chip,
  Divider,
  Fab,
  Grid,
  Paper,
  InputAdornment,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ProminentAppBar from '../conponents/ProminentAppBar';
import Tabs from '../conponents/Tabs';
import { Search as SearchIcon } from '@material-ui/icons';
import Page from '../conponents/Page';
import * as monthservice from '../services/MonthService';
import AddMonth from '../conponents/AddMonth';
import MonthCard from '../conponents/MonthCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    flexGrow: 1,
    spacing: 0,
  },
  control: {
    padding: theme.spacing(2),
  },
  fabButton: {
    position: 'fixed',
    zIndex: 1,
    bottom: 10,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  searchInput: {
    padding: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const AppView = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [monthName, setMonthName] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [months, setMonths] = useState(monthservice.getAllMonths());
  const [errorText, setErrorText] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMonthName('');
    setYear(new Date().getFullYear());
    setErrorText('');
  };

  const handleSaveMonth = () => {
    monthservice.insertMonth(monthName + ' ' + year);
    setOpen(false);
    setMonthName('');
    setMonths(monthservice.getAllMonths());
    setErrorText('');
  };

  const isValid = (m, y) => {
    if (months.some((mo) => mo.name === m + ' ' + y)) {
      setErrorText('This month already exists!');
    } else {
      setErrorText('');
    }
  };

  const onDelete = (id) => {
    monthservice.deleteMonth(id);
    setMonths(monthservice.getAllMonths());
  };

  const getGrandTotal = () => {
    return months
      .map((cnt) => {
        return cnt.transactions
          .map((txn) => parseInt(txn.value))
          .reduce((a, b) => a + b, 0);
      })
      .reduce((a, b) => a + b, 0);
  };

  const handleSearch = (e) => {
    let target = e.target;

    if (target.value !== '') {
      setMonths(
        monthservice
          .getAllMonths()
          .filter((cnt) =>
            cnt.name.toLowerCase().includes(target.value.toLowerCase()),
          ),
      );
    } else {
      setMonths(monthservice.getAllMonths());
    }
  };

  return (
    <Page className={classes.root} title='Hissab - Months'>
      <div>
        <ProminentAppBar />
        <Tabs month={true} />
        <Grid container justify='center' className={classes.root}>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <Grid container wrap='nowrap' spacing={2}>
                <ListItem style={{ width: '85%' }}>
                  <ListItemText
                    primary={
                      <Typography
                        component='span'
                        variant='h5'
                        color='textPrimary'>
                        Months
                      </Typography>
                    }
                  />
                </ListItem>
                <Chip
                  variant='outlined'
                  color={getGrandTotal() < 0 ? 'secondary' : 'primary'}
                  size='small'
                  avatar={
                    <Avatar>
                      <b>₹</b>
                    </Avatar>
                  }
                  label={Math.abs(getGrandTotal())}
                />
              </Grid>
              <Divider />
              <TextField
                placeholder='Search Months...'
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
              {months.map((month, index) => (
                <MonthCard key={index} month={month} onDelete={onDelete} />
              ))}
            </Paper>
          </Grid>
          <Grid item>
            <Fab size="medium" variant="extended"
              className={classes.fabButton}
              onClick={handleOpen}
            >
              <EventAvailableIcon className={classes.extendedIcon} />
              New Month
            </Fab>
            <AddMonth
              open={open}
              handleClose={handleClose}
              monthName={monthName}
              setMonthName={setMonthName}
              year={year}
              isValid={isValid}
              setYear={setYear}
              errorText={errorText}
              setErrorText={setErrorText}
              handleSaveMonth={handleSaveMonth}
            />
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default AppView;
