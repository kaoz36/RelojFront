import React from 'react';
import Paper from '@material-ui/core/Paper';

 const Reloj = ({hour, minute, second}) => {

  console.log(`reloj ( ${hour} : ${minute} : ${second} )`);

  return (
    <Paper>
      <p>  </p>
    </Paper>
  );
}

export default Reloj;