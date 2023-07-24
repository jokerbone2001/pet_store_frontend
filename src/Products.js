import React from 'react'
import './Products.css';
import { Link } from 'react-router-dom';

const ProductURL = "http://localhost:8080/product_json";
const OrderAddtURL = "http://localhost:8080/users/order/add";

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
          products: [{
            product_id: productId,
            amount: parseInt(quantity)
          }],
          total_price,
          quantity
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
          if (data.message) {
              alert('Order added successfully');
          } else {
              alert('Error adding product to cart. Please try again.');
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
      <div className="Products">
        {this.state.Products.map((product, index) => (
            <div className="Product-card" key={index}>
                <h2>{product.name}</h2>
                {product.images.map((image, imageIndex) => (
                    <img key={imageIndex} src={image} alt="image"/>
                ))}
                <button onClick={() => this.handleAddToCart(product._id, product.price)}>Add to Cart</button>

                <Link to={`/product/${product._id}`} className="Product-button">View Details</Link>
            </div>
        ))}
      </div>
    )
  }
}

export default Products