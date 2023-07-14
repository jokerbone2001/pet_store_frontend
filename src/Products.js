import React from 'react'

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
        Product Page
        {this.state.Products.map((product, index) => (
            <div key={index} style={{marginBottom: '20px'}}>
                <h2>{product.name}</h2>
                {product.images.map((image, imageIndex) => (
                    <img key={imageIndex} src={image} alt="image" style={{width: '200px', height: '200px'}}/>
                ))}
                
                <p>Amount: {product.amount}</p>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
                <p>Feature:</p>
                    <ul>
                        {product.feature.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                        ))}
                    </ul>
            </div>
        ))}
      </div>

    )
  }
}

export default Products