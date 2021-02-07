import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
  
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.props.deets.map(stock => <Stock clickEvent={this.props.clickEvent}  deets={stock}/>) 
        }
      </div>
    );
  }

}

export default StockContainer;
