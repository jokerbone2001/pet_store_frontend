import React from 'react'
import './Products.css';
import { Link } from 'react-router-dom';
import rootURL from './url';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductURL = rootURL+"/product_json";
const OrderAddtURL = rootURL+"/users/order/add";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Products: []
    }
  }
  fetchURL(){
    fetch(ProductURL)
    .then(response => {return response.json()})
    .then(data => {
        this.setState({Products: data});
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
  }
  componentDidMount(){
    this.fetchURL();
  }
  handleAddToCart = (productId, productPrice) => {
    const quantity = prompt('Please enter the quantity:', 1);
    if (quantity && !isNaN(quantity)) {
        const total_price = productPrice * parseInt(quantity);
        console.log(`Adding product ${productId} with quantity ${quantity} to the cart.`);
        const dataToSend = {
          user_id: this.props.user_id,
          order_time: new Date(),
          product: [{
            product_id: productId,
            amount: parseInt(quantity)
          }],
          total_price,
      };

      fetch(OrderAddtURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${this.props.token}`
          },
          body: JSON.stringify(dataToSend)
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          if (data.message === "Successfully added") {
              alert('Order added successfully');
          } 
          else {
              alert('Order failed due to insufficient stock.');
          }
      })
      .catch(error => {
          console.error('There was an error!', error);
          alert('Error adding product to cart. Please try again.');
      });
    }
}
  render() {
    return (
        <div className="Products container mt-5">
            <div className="row">
                {this.state.Products.map((product, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100"> 
                            <img src={product.images[0]} alt="product" className="card-img-top" style={{ height: '200px', objectFit: 'cover' }}/>
                            <div className="card-body">
                                <h2 className="card-title font-weight-bold" style={{fontSize : '1.2rem'}}>{product.name}</h2> 
                                <Link to={`/product/${product._id}`} className="btn btn-secondary mb-2 d-block">View Details</Link>
                                <button className="btn btn-primary" onClick={() => this.handleAddToCart(product._id, product.price)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }


}

export default Products