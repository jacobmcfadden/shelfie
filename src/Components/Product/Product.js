import React, {Component} from 'react';

import './Product.css';

class Product extends Component {


render() {
    const {id, img_url, product_name, price } = this.props.product;
    return(
        <div className="product">
            <div className="product-img" > <img className="product-img" src={img_url} alt="user-input-img"/> </div>
            <div className="product-info">
                <div className="product-title" >{product_name}</div>
                <div className="product-price" >${price}</div>
            </div>
            <div className="product-btn-container">
                <button className="product-btn" onClick={() => this.props.delete(id)} >Delete</button>
                <button className="product-btn" onClick={() => this.props.select(id)} >Edit</button>
            </div>
        </div>
    );
}

}

export default Product;