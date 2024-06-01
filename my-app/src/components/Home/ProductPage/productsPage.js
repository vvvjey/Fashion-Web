import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from 'react-paginate';
import ReactDOM from 'react-dom';
import Product from '../../Product/product'
import "./productsPage.scss"
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import { useParams } from 'react-router-dom';
import _ from "lodash"
import {getAllProductByCategory} from '.././../../services/userServices'
function Items({ currentItems }) {
   
    return (
      <div className='products-container'>
        {currentItems &&
          currentItems.map((item,key) => (
                <Product                             
                  product={item}
                  key={key}></Product>
          ))}
      </div>
    );
  }
function ProductsPage() {

const [itemOffset, setItemOffset] = useState(0);
const { id } = useParams();
const [products,setProducts]=useState(null);
useEffect(() => {
  const fetchData = async () => {
    let data = await getAllProductByCategory(id);
    if (data && !_.isEmpty(data.data.data.product)) {
      let productsA = data.data.data.product;
      productsA = [...productsA,...productsA,...productsA,...productsA]
      productsA.map((item)=>{
        item.img = item.Product_details[0].img
      })
      setProducts(productsA)
    }
  };

  fetchData();
}, []);
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + 12;
    var currentItems = null
    var pageCount = null
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    if(products){
      console.log(products)
      currentItems = products.slice(itemOffset, endOffset);
      pageCount = Math.ceil(products.length / 12);
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
    const newOffset = (event.selected * 12) % products.length;
    console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    };

    return (
    <>
        <Header></Header>
        <Items currentItems={currentItems} />
        <ReactPaginate
        className='pagination-container'
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        />
        <Footer></Footer>
    </>
    );
}
export default ProductsPage;
