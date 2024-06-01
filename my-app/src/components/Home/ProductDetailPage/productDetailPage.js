import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./productDetailPage.scss"
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from "lodash"
import {getProductById,addProductToCart,getCommentByProductId} from '../../../services/userServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';
import {faStar } from "@fortawesome/free-solid-svg-icons";

function ProductDetailPage({product}) {
    const [products,setProducts]=useState(null);
    const [colorAvailable,setColorAvailable] = useState(null);
    const [sizeAvailable,setSizeAvailable] = useState(["S","M","L","XL"]);
    const [colorSelected,setColorSelected] = useState(null)
    const [sizeSelected,setSizeSelected] = useState(null)
    const [quantity,setQuantity] = useState(0)
    const [headerKey, setHeaderKey] = useState(0);
    const [commentsProduct,setCommentProduct] = useState(null)

    const user = useSelector((state) => state.userReducer);
    const { id } = useParams();
    const allSize = ["S","M","L","XL"]
    useEffect(() => {
        const fetchData = async () => {
            // Get Product infor
          let data = await getProductById(id);
          if (data && !_.isEmpty(data.data.data.product)) {
            let productsA = data.data.data.product;
            let colors = getUniqueColors(productsA.Product_details)
            setColorAvailable(colors)
            setProducts(productsA)
          }
            //   Get Comments
          let comment = await getCommentByProductId(id);
          if(data && !_.isEmpty(comment.data.data.commentResult)){
            let comments = comment.data.data.commentResult
            setCommentProduct(comments)
          }
        };
      
        fetchData();
      }, []);
      console.log('comment',commentsProduct)
      function handlePickColor (color) {
        setSizeSelected(null)
        setColorSelected(color)
        let sizesWithColor = getSizeOfColor(color)
        setSizeAvailable(sizesWithColor)
      }
      function handlePickSize (size) {
        setSizeSelected(size)
      }
      function changeQuantity(action){
        if(quantity==0){
            setQuantity(action == "up" ? quantity+1 : quantity)

        } else {
            setQuantity(action == "up" ? quantity+1 : quantity-1)
        }
      }
      async function handleAddCart(){
        if (!sizeAvailable || !colorSelected || quantity==0){
            toast.error("Missing required selected")
            return false
        } else {
            console.log('size : ',sizeSelected,'color :',colorSelected,"quantity",quantity)
            console.log(products)
            const data = {
                size:sizeSelected,
                color:colorSelected,
                quantity:quantity,
                cartId:user.userInfor.Cart.cartId,
                productId:products.productId
            }
            let res = await addProductToCart(data)
            toast.success("Add successfully")

            setHeaderKey(prevKey => prevKey + 1);
            return true
        }
      }
      async function handleBuy(){
            let res = await handleAddCart()
            if(res){
                window.location.href="/payment"
            }
      }
      function getSizeOfColor(color){
        return products.Product_details
        .filter((detail) => detail.color === color)
        .map((detail) => detail.size);
      }
      function getUniqueColors(productDetails) {
        const uniqueColors = [];
        
        productDetails.forEach((detail) => {
          if (!uniqueColors.includes(detail.color)) {
            uniqueColors.push(detail.color);
          }
        });
        
        return uniqueColors;
      }
    return (
        <div>
            <Header key={headerKey}></Header>
            <div className='product-detail-container'>
                {
                    products &&
                    <div className='content'>
                        <div className='content-left'>
                            <img src={products.Product_details[0].img}></img>
                        </div >
                        <div className='content-right'>
                            <div className='name'>{products.name}</div>
                            <div className='price'>{products.price} $</div>
                            <div>Colour : </div>
                            <div className='color'>
                                {colorAvailable.map((item,index)=>{
                                    return (
                                        <span onClick={()=>{handlePickColor(item)}} className={colorSelected == item ? 'color-item active' : 'color-item'} key={index}>{item}</span>
                                    )
                                })}
                            </div>
                            <div>Size : </div>
                            <div className='size'>
                                {allSize.map((item,index)=>{
                                    return(
                                        <button disabled={sizeAvailable.includes(item) ? false : true} className={sizeAvailable.includes(item) ? sizeSelected==item ? 'size-item active picked' : 'size-item active' : 'size-item' } key={index} onClick={()=>{handlePickSize(item)}}>{item}</button>
                                    )
                                })}
                            </div>
                            <div className='quantity'>
                                <div class="number-counter">
                                    <button class="counter-button" data-action="decrement" onClick={()=>{changeQuantity('down')}}>-</button>
                                    <input type="number" class="counter-input" value={quantity} min="0"></input>
                                    <button class="counter-button" data-action="increment" onClick={()=>{changeQuantity('up')}}>+</button>
                                </div>
                            </div>
                            

                            <div className='purchase'>
                                <div className='add-to-cart' onClick={handleAddCart}>
                                    Thêm vào giỏ hàng
                                </div>
                                <div className='buy' onClick={handleBuy}>
                                    Mua
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className='description'>
                    Description
                </div>
                <div className='feedback-section'>
                    <div className='heading'>WHAT OTHERS ARE SAYING</div>
                    <div className='sort'>

                    </div>
                    <div className='comments'>
                        {
                            commentsProduct && 
                            commentsProduct.map((item,index)=>{
                                return (
                                    <div className='item' key={index}>
                                        <div className='name'>
                                            {item.username}
                                        </div>
                                        <div className='comment-content'>
                                            <div className='star'>
                                                {
                                                    Array(item.starRate).fill().map((_, index) => (
                                                        <FontAwesomeIcon key={index} icon={faStar} className='icon-star' />
                                                    ))
                                                }
                                            </div>
                                            <div className='comment-description'
                                                dangerouslySetInnerHTML={{__html:item.description}}
                                            >
                                                {/* {item.description} */}
                                            </div>
                                        </div>
                                        <div className='date'>
                                            {item.date}
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
            </div>
            <Footer></Footer>
            <ToastContainer 
                position="bottom-right"
                autoClose={5000}
    
            />

        </div>
    );
}
export default ProductDetailPage;
