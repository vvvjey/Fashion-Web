import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "../../store/actions/counterActions";
import Header from '../Header/header';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./home.scss"
import Product from '../Product/product';
import Footer from '../Footer/footer';
import LiveChat from './LiveChat/livechat';
import {getFiveNewestProducts,getFiveMostRatingProducts} from '../../services/userServices'
function Home() {

    const counter = useSelector((state) => state.counterReducer.count);
    const dispatch = useDispatch();
    const [fiveNewestProducts,setFiveNewestProducts] = useState(null)
    
    useEffect(() => {
        const fetchNewestProducts = async () => {
            try {
                let response = await getFiveMostRatingProducts();
                console.log('ré',response)
                if(response.data.data.errCode == 0 ) {
                    setFiveNewestProducts(response.data.data.products)
                }
            } catch (error) {
                console.error("Error fetching newest products:", error);
            }
        };
        fetchNewestProducts(); // Call the async function immediately
    }, []);
    let category = [
        {
            name:"socks",
            img:"https://stance.eu.com/cdn/shop/files/SP24_ecomm_Homepage_CategoryTile.png?v=1706795238&width=500",
            categoryId:1

        },
        {
            name:"underwear",
            img:"https://stance.eu.com/cdn/shop/files/SP24_ecomm_Homepage_CategoryTile_1.png?v=1706795407&width=500",
            categoryId:2
        },
        {
            name:"apparel",
            img:"https://stance.eu.com/cdn/shop/files/SP24_ecomm_Homepage_CategoryTile_2.png?v=1706795432&width=500",
            categoryId:3
        },
        {
            name:"multipacks",
            img:"https://stance.eu.com/cdn/shop/files/SP24_ecomm_Homepage_CategoryTile_08-Packs_3_4.jpg?v=1706795450&width=500",
            categoryId:4
        }
    ]
    return (
        <div className='container'>
            <Header />
            <div className='content-container'>
                <div className='carousel'>
                    <Carousel 
                        showThumbs={false}
                        autoPlay={true}
                        interval={5000}
                        infiniteLoop={true}
                        showStatus={false}
                        showIndicators={false}
                    >
                        <div>
                            <img src="https://stance.eu.com/cdn/shop/files/SP24_NewArrivalsLifestyleSocks_2024_HP_Desktop.jpg?v=1706697392&width=1100" />
                            {/* <p className="legend">Legend 1</p> */}
                        </div>
                        <div>
                            <img src="https://stance.eu.com/cdn/shop/files/SP24_FreshTekUsal_2024_HP_Deskto.png?v=1707497970&width=1100" />
                           
                        </div>
                        <div>
                            <img src="https://stance.eu.com/cdn/shop/files/SP24_NewArrivalsIconSocks_2024_HP_Desktop.jpg?v=1706797340&width=1100" />
                        </div>
                    </Carousel>
                </div>
                <div className='category'>
                    {category && 
                        category.map((item,index)=>{
                            return (
                                <a href={`/products/category/${item.categoryId}`} className='category-item'>
                                    <img src={item.img}></img>
                                    <h1>{item.name}</h1>
                                </a>
                            )
                        })
                    }
                    
                </div>
                <LiveChat/>
                <div className='trending'>
                    <div className='content-right'>
                        <img src="https://stance.eu.com/cdn/shop/files/snow-featured-tile_748b9f36-4aa4-4f78-8fbb-7091d7ac233f.jpg?v=1707498355&width=950"></img>
                    </div>
                    <div className='content-left'>
                        <h2>New trending</h2>
                        <h1>SNOW SOCKS</h1>
                        <h3>Gear up and ride in comfort this season with our latest winter-ready snow styles worn and tested by our Punk & Poet team.</h3>
                        <a> Shop now</a>
                    </div>
                </div>
                <div className='new-product-title'>
                    Trending Products
                </div>
                <div className='new-product'>
                    {fiveNewestProducts && 
                        fiveNewestProducts.map((item,index)=>{
                            return (
                                <div className='new-product-item'>
                                    <Product 
                                        product={item}
                                    ></Product>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
export default Home;
