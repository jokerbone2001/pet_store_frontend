import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import rootURL from './url';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const ProductURL = rootURL+"/product_json";


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    const fetchProduct = () => {
        fetch(`${ProductURL}/${id}`)
        .then(response => {return response.json()})
        .then(data => {
            setProduct(data);
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    if (!product) {
        return <div>Loading...</div>
    }
    const handleAddToCart = (productId) => {
        const quantity = prompt('Please enter the quantity:', 1);
        if (quantity && !isNaN(quantity)) {
            console.log(`Adding product ${productId} with quantity ${quantity} to the cart.`);
            // TODO: Send this information to the backend
        }
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      
      return (
        <div className="ProductDetail d-flex flex-wrap">
            <div style={{ width: '50%'}}>
                <Slider>
                    {product.images && product.images.map((image, imageIndex) => (
                        <div key={imageIndex}>
                            <img src={image} alt="Product" className="d-block w-100" style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                    ))}
                </Slider>
            </div>
    
            {/* Details for the product */}
            <div style={{ width: '50%' }}>
                <h2>{product.name}</h2>
                <p>Amount: {product.amount}</p>
                <p className="font-weight-bold" style={{fontSize : '1.5rem'}}>Price: {product.price}</p>
                <div>
                    <strong>Feature:</strong>
                    <ul>
                        {product.feature && product.feature.map((feature, featureIndex) => (
                            <li key={featureIndex}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
            </div>
    
            {/* Description for the product */}
            <div className="w-100 mt-3">
                <p><strong>Description:</strong></p>
                <p>{product.description}</p>
            </div>
        </div>
    );
    
    
    
    
}

export default ProductDetail;
