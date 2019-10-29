import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button } from '@material-ui/core';

import { showHistorical, saveNewRecord } from './../utils/api';
import TableHistorical from './../components/TableHistorical';
import Reloj from './../components/Reloj';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const RelojContainer = () => {

  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  /**
   * This method get the historical.
   */
  const getData = () => {
    showHistorical()
      .then( (res) => {
        const {times} = res.data;
        setData(times);
        setLoading(false);
      })
      .catch( (err) => {
        console.log(`Ocurrio un error: ${err}`);
      });
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  /**
   * This method generate a new record in mongo
   */
  const handleClick = () => {
    const time = {
      hour: Math.floor(Math.random() * 24),
      minute: Math.floor(Math.random() * 60),
      second: Math.floor(Math.random() * 60)
    }
    saveNewRecord(time)
      .then((res) => {
        const { hour, minute, second } = res.data.time;
        setHour(hour);
        setMinute(minute);
        setSecond(second);
        getData();
      })
      .catch((err) => {
        console.log(`Error al crear nuevo tiempo: ${err}`);
      });
  }

  const handleClickRow = (row) => {
    setHour(row.hour);
    setMinute(row.minute);
    setSecond(row.second);
  }
  
  return (
    <Fragment>
      { loading ? <CircularProgress /> : '' }
      <TableHistorical 
        data={data}
        handleClickRow={handleClickRow} />
      <Reloj 
        hour={hour}
        minute={minute}
        second={second} />
      <Button 
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick} >
        Generar una nueva hora
      </Button>
    </Fragment>
  );
}

export default RelojContainer;