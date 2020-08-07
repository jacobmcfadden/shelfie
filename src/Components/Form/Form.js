import React, {Component} from 'react';
import axios from 'axios';

import './Form.css';

class Form extends Component {
constructor(){
    super();

    this.state = {
        id: null,
        imageUrl: '',
        productName: '',
        price: 0,
        action: 'Add to Inventory'
    }
}

componentDidUpdate(prevProps, prevState){
    if(prevProps.selected !== this.props.selected && this.props.selected !== null) {
        const {id, img_url, product_name, price } = this.props.selected;
      this.setState({
          id: id,
          imageUrl: img_url,
          productName: product_name,
          price: price,
          action: 'Save Changes'
      })
    }else if (prevProps.selected !== this.props.selected && this.props.selected === null){
        this.setState({
            id: null,
            imageUrl: '',
            productName: '',
            price: 0,
            action: 'Add to Inventory'
        })
    }
  }

universalHandler = (e) => {
    if(e === 'cancel'){
        this.setState({
            id: null,
            imageUrl: '',
            productName: '',
            price: 0,
            action: 'Add to Inventory'
        })
    } else {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

addProduct = () => {
    const { productName, price, imageUrl } = this.state;
    axios.post('/api/product', {productName, price, imageUrl})
    .then( res => {
      console.log(res)
      this.props.getInventory()
      this.universalHandler('cancel')
    }).catch( err => console.log(err))
  }

  pushProduct = () => {
    if(this.state.action === 'Add to Inventory') {
        this.addProduct()
    } else {
        this.props.update(this.state.id, this.state)
    }
  }

render() {
    const {imageUrl, productName, price} = this.state;

    return(
        <div className="form">
            <img className="form-img" src={imageUrl === '' ? "https://via.placeholder.com/318x192" : imageUrl} alt="placehimage"/>
            <p>Image URL:</p>
            <input className="form-input" type="text" name='imageUrl' value={imageUrl} onChange={(e) => this.universalHandler(e)} />
            <p>Product Name:</p>
            <input className="form-input" type="text" name='productName' value={productName} onChange={(e) => this.universalHandler(e)} />
            <p>Price:</p>
            <input className="form-input" type="number" name='price' value={price} onChange={(e) => this.universalHandler(e)} />
            <div className="btn-container">
                <button className="btn" onClick={() => this.universalHandler('cancel')} >Cancel</button>
                <button className="btn" onClick={() => this.pushProduct()}>{this.state.action}</button>
            </div>
        </div>
    );
}
}

export default Form;