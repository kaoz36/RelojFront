import React, { Component } from 'react';
import './styles.css';

class ContadorComponent extends Component {

    render() {
        const { valor, unidad } = this.props;
        return (
            <div className="contador">
                <div className="textValor">
                    {valor}
                </div>
                <div className="textUnidad">
                    {unidad}
                </div>
                
            </div>
            
        );
    }
}

export default ContadorComponent;