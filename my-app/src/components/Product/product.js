import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./product.scss"
function Product({product}) {
    const handleImageError = (event) => {
        event.target.src = 'https://static.thenounproject.com/png/504708-200.png'; // Replace 'path_to_your_default_image' with the path to your default image
    };
    return (
        <a href={`/product-detail/${product.productId}`} className='product-container'>
            <img 
                src={product.Product_details[0].img}
                alt='Img'
                onError={handleImageError}

            ></img>
            <div className='description'>
                <span className='name'>{product.name}</span>
                <span className='price'>{product.price} $</span>
            </div>
        </a>
    );
}
export default Product;
