import React from 'react'
import './Products.css';
import { Link } from 'react-router-dom';

const ProductURL = "http://localhost:8080/product_json";

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
  render() {
    return (
      <div className="Products">
        {this.state.Products.map((product, index) => (
            <div className="Product-card" key={index}>
                <h2>{product.name}</h2>
                {product.images.map((image, imageIndex) => (
                    <img key={imageIndex} src={image} alt="image"/>
                ))}
                <Link to={`/product/${product._id}`} className="Product-button">View Details</Link>
            </div>
        ))}
      </div>
    )
  }
}

export default Products