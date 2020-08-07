import React, {Component} from 'react';
import Product from '../Product/Product';
import axios from 'axios';

import './Dashboard.css';

class Dashboard extends Component {
constructor() {
    super();

    this.deleteProduct = this.deleteProduct.bind(this);
}

deleteProduct = (id) => {
    axios.delete(`/api/product/${id}`)
    .then(res => {
        this.props.getInventory()
    }).catch( err => console.log(err))
}

render() {
    const { products } = this.props
    const list = products.map(product => {
        return <Product product={product} key={product.id} delete={this.deleteProduct} select={this.props.select} />
    });
    return(
        <div className="dashboard">
            {list}   
        </div>
    );
}

}

export default Dashboard;