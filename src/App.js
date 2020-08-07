import React, { Component } from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Header from './Components/Header/Header';
import axios from 'axios';
import {HashRouter} from 'react-router-dom';
import './reset.css';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      selectedProduct: null
    }

    this.getInventory = this.getInventory.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  componentDidMount(){
    this.getInventory()
  }

  getInventory = () => {
    axios.get('/api/inventory')
    .then(res => {
      this.setState({
        products: res.data
      })
    }).catch( err => console.log(err))
  }

  updateProduct = (id, body) => {
    axios.put(`/api/product/${id}`, body)
    .then( () => {
      this.setState({
        selectedProduct: null
       })
       this.getInventory()
    }).catch( err => console.log(err))
  }

  handleSelected(id) {
    const filteredProduct = this.state.products.filter(product => product.id === +id);

    this.setState({
      selectedProduct: filteredProduct[0]
    })
  }
  render() {
    return (
      <HashRouter>
      <div className="App">
        <Header/>
        <Form getInventory={this.getInventory} selected={this.state.selectedProduct} update={this.updateProduct} />
        <Dashboard products={this.state.products} getInventory={this.getInventory} select={this.handleSelected} />
      </div>
      </HashRouter>
    );
  }
}

export default App;
