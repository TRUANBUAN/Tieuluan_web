import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../action/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productList = useSelector((state) => state.productDetails);
    const { loading, error, product } = productList;
    
    useEffect(() => {
        
        dispatch(detailsProduct( productId));
    },[dispatch,productId ]);

    const addToCart = () => {
        let list = JSON.parse(localStorage.getItem('cart'));
        if (!list) {
            list = {};
        }
        if(list[props.match.params.id])
            list[props.match.params.id] += 1
        else
            list[props.match.params.id] = 1;
        localStorage.setItem('cart', JSON.stringify(list));
    }

    return (
        <div>
            {loading ? (<LoadingBox ></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <div>
                            <Link class="fas fa-chevron-circle-left" to="/"> Trờ về trang chủ</Link>
                            <div className="row top">
                                <div className="col-2">
                                    <img className="large" src={product.image} alt={product.name}></img>
                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <h1>{product.name}</h1>
                                        </li>
                                        <li>
                                            <Rating
                                                rating={product.rating}
                                                numReview={product.numReview}
                                                
                                            ></Rating>
                                            
                                        </li>
                                        <li>Price : ${product.price}</li>
                                        <li>
                                            Description:
                                            <p>{product.description}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>Price</div>
                                                    <div className="price">${product.price}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>Status</div>
                                                    <div>
                                                        {product.countInStock > 0 ? (
                                                            <span className="success">In Stock</span>
                                                        ) : (
                                                            <span className="error">Unavailable</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button className="primary block" onClick={addToCart}>Add to Cart</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
        </div>

    );
}