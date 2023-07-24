import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductURL = "http://localhost:8080/product_json";

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

    return (
        <div className="ProductDetail">
            <h2>{product.name}</h2>
            {product.images && product.images.map((image, imageIndex) => (
                <img key={imageIndex} src={image} alt="image" className="product-image"/>
            ))}
            <p>Amount: {product.amount}</p>
            <p>Price: {product.price}</p>
            <div>
                <strong>Feature:</strong>
                <ul>
                    {product.feature && product.feature.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>Description: </p>
                <p>{product.description}</p>
            </div>
            <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>

        </div>
        
    )
}

export default ProductDetail;
