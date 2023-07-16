import React from 'react'
import './Orders.css';

const OrderURL = "http://localhost:8080/order_json";
const ProductURL = "http://localhost:8080/product_json";


class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      products: []
    }
  }
  fetchProductInfo = async (productId) => {
    const response = await fetch(ProductURL);
    const productData = await response.json();
    this.setState({products: productData});
  }


  fetchOrdersURL(){
    fetch(OrderURL)
    .then(response => {return response.json()})
    .then(data => {
        this.setState({ orders: data });
      })
    .catch(error => {
        console.error("Error:", error);
    });
  }
  componentDidMount(){
    this.fetchOrdersURL();
    this.fetchProductInfo();
  }
  getProductInfo = (productId) => {
    return this.state.products.find(product => product._id === productId);
  }

  render() {
    return (
      <div className="Orders">
        Order Page
        {this.state.orders.map((order, index) => (
            <div key={index} style={{marginBottom: '20px'}}>
                <h2>Order ID: {order._id}</h2>
                <p>User ID: {order.user_id}</p>
                <p>Order Time: {new Date(order.order_time).toLocaleString()}</p>
                <h3>Products:</h3>
                {order.products && order.products.map((product, productIndex) => {
                    const productInfo = this.getProductInfo(product.product_id);
                    return (
                        <div key={productIndex}>             
                            <p>Product ID: {product.product_id}</p>
                            {productInfo && (
                              <>
                                <p>Name: {productInfo.name}</p>
                                <p>Image: {productInfo.images && productInfo.images.length > 0 ? 
                                          <img src={productInfo.images[0]} alt="product_images" /> : "No image available"}</p>
                                <p>Price: {productInfo.price}</p>
                              </>
                            )}
                            <p>Amount: {product.amount}</p>
                        </div>
                    );
                })}
                <p>Total Price: {order.total_price}</p>
                <p>Status: {order.status}</p>
            </div>
        ))}
      </div>
    )
  }
}

export default Orders