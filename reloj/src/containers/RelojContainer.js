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
  const [rotateHours, setRotateHours] = useState(0);
  const [rotateMinutes, setRotateMinutes] = useState(0);
  const [rotateSeconds, setRotateSeconds] = useState(0);

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

  const generateRotate = (hour, minute, second) => {
    setRotateHours(hour / 12 * 360);
    setRotateMinutes(minute / 60 * 360);
    setRotateSeconds(second / 60 * 360);
  }

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
        generateRotate(hour, minute, second);
        getData();
      })
      .catch((err) => {
        console.log(`Error al crear nuevo tiempo: ${err}`);
      });
  }

  const handleClickRow = (row) => {
    generateRotate(row.hour, row.minute, row.second);
  }
  
  return (
    <Fragment>
      { loading ? <CircularProgress /> : '' }
      <TableHistorical 
        data={data}
        handleClickRow={handleClickRow} />
      <Button 
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick} >
        Generar una nueva hora
      </Button>
      <Reloj 
        rotateHours={rotateHours}
        rotateMinutes={rotateMinutes}
        rotateSeconds={rotateSeconds} />
    </Fragment>
  );
}

export default RelojContainer;