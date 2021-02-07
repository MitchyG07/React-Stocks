import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    myPortfolio: [],
    allStocks: [],
    checked: false
  } 

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => this.setState({
      stocks: data,
      allStocks: data
    }))
  }

  filterStocks = (event) => {
    let filtered = this.state.allStocks.filter(stock => stock.type === event.target.value)
    this.setState({
      stocks: filtered
    })
  }

  addToPortfolio = (stock) => {
      fetch(`http://localhost:3000/stocks/${stock.id}`)
      .then(res => res.json())
      .then(data => this.setState({
        myPortfolio: [...this.state.myPortfolio, data]
      }), console.log(this.state.myPortfolio))
  }

  sellStock = (stock) => {
    let newPortfolio = this.state.myPortfolio.filter(sold => sold != stock)
    this.setState({
      myPortfolio: newPortfolio
    })
  }

  sortByName = () => {
    let updateCheck = !this.state.checked
    if (updateCheck === true) {
      let sorted = this.state.stocks.sort((a, b) => a.name.localeCompare(b.name))
      this.setState({
        stocks: sorted,
        checked: updateCheck
      })
    } else {
      let sorted = this.state.allStocks
      this.setState({
        stocks: sorted,
        checked: null
      })
    }
  }

  sortByPrice = () => {
    let updateCheck = !this.state.checked
    if (updateCheck === true) {
      let sorted = this.state.stocks.sort((a, b) => (b.price - a.price))
      this.setState({
        stocks: sorted,
        checked: updateCheck
      })
    } else {
      let sorted = this.state.allStocks
      this.setState({
        stocks: sorted,
        checked: null
      })
    }
  }

  render() {
    return (
      <div>
        <SearchBar sortByName={this.sortByName} sortByPrice={this.sortByPrice} filterStocks={this.filterStocks} checked={this.state.checked}/>

          <div className="row">
            <div className="col-8">

              <StockContainer deets={this.state.stocks} clickEvent={this.addToPortfolio} />

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.myPortfolio} clickEvent={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
