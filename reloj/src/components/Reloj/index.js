import React from 'react';
import Aguja from './res/aguja.png';
import AgujaMinutos from './res/agujaMinutos.png';
import AgujaSegundos from './res/agujaSegundos.png';
import './res/style.css';

 const Reloj = ({rotateHours, rotateMinutes, rotateSeconds}) => {

  if ( document.getElementById("hours") ) {
    document.getElementById("hours").style.transform = "rotate("+ rotateHours +"deg)";
  }
  
  if ( document.getElementById("minutes") ) {
    document.getElementById("minutes").style.transform = "rotate("+ rotateMinutes +"deg)";
  }

  if ( document.getElementById("seconds") ) {
    document.getElementById("seconds").style.transform = "rotate("+ rotateSeconds +"deg)";
  }
  
  return (
    <div className='clock'>
      <img id='hours' src={Aguja} alt='aguja' />
      <img id='minutes' src={AgujaMinutos} alt='agujaMinutos' />
      <img id='seconds' src={AgujaSegundos} alt='agujaSegundos' />
    </div>
  );
}

export default Reloj;