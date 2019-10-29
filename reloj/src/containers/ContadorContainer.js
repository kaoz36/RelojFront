import React, { Component } from 'react';
import ContadorComponent from './../components/ContadorComponent'
import { Grid, Row, Col } from 'react-flexbox-grid';

var nuevoDias = 2;
var nuevoHoras = 0;
var nuevoMinutos = 0;
var nuevoSegundos = 0;

class ContadorContainer extends Component {

    componentDidMount() {
        this.initTimer();
    }

    constructor(props) {
        super(props);
        this.state = {
            dias: nuevoDias,
            horas: nuevoHoras,
            minutos: nuevoMinutos,
            segundos: nuevoSegundos
        };
    }

    initTimer() {
        this.timer = setInterval(() => {
            this.restarSegundos();
        }, 1000);
    } 
    
    restarSegundos() {
        nuevoSegundos--;
        if (nuevoSegundos < 1) {
            nuevoSegundos = 59;
            this.restarMinutos();
        }
        this.setState( {segundos: nuevoSegundos} );
    }

    restarMinutos() {
        nuevoMinutos--;
        if (nuevoMinutos < 1) {
            nuevoMinutos = 59;
            this.restarHoras();
        }
        this.setState( {minutos: nuevoMinutos} );
    }

    restarHoras() {
        nuevoHoras--;
        if (nuevoHoras < 1) {
            nuevoHoras = 23;
            this.restarDias();
        }
        this.setState( {horas: nuevoHoras} );
        
    }

    restarDias() {
        nuevoDias--;
        if (nuevoDias === -1) {
            clearInterval(this.timer);
            nuevoDias = 0;
            nuevoHoras = 0;
            nuevoMinutos = 0;
            nuevoSegundos = 0;
        } else {
            this.setState( {dias: nuevoDias} );
        }
    }
    
    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <ContadorComponent unidad='Days' valor={this.state.dias}/>
                    </Col>
                    <Col>
                        <ContadorComponent unidad='Hours' valor={this.state.horas}/>
                    </Col>
                    <Col>
                        <ContadorComponent unidad='Minutes' valor={this.state.minutos}/>
                    </Col>
                    <Col>
                        <ContadorComponent unidad='Seconds' valor={this.state.segundos}/>
                    </Col>
                </Row>
            </Grid>            
        );
    }
}

export default ContadorContainer;