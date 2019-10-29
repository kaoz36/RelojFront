import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button } from '@material-ui/core';

import { showHistorical, saveNewRecord } from './../utils/api';
import TableHistorical from './../components/TableHistorical';

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

  const handleClick = () => {
    saveNewRecord({hour:2, minute:12, second:3})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  return (
    <Fragment>
      { loading ? <CircularProgress /> : '' }
      <TableHistorical />
      <Button 
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick} >
        Solicitud
      </Button>
    </Fragment>
  );
}

export default RelojContainer;