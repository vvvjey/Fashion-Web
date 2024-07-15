import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import AdminHeader from '../Header/header';
import Sidebar from '../Sidebar/sidebar';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProduct,createNewProduct,deleteProduct } from '../../../services/userServices';
import './product.scss';

function AdminProduct() {
    const [products, setProducts] = useState(null);
    const [isShowCreateBtn, setIsShowCreateBtn] = useState(false);
    const [modalName, setModalName] = useState('');
    const [modalSize, setModalSize] = useState('');
    const [modalColor, setModalColor] = useState('');
    const [modalStock, setModalStock] = useState('');
    const [modalPrice, setModalPrice] = useState('');
    const [modalCategory, setModalCategory] = useState('');
    const [modalImage, setModalImage] = useState(null);
    const [deleteAction,setDeleteAction] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            let res = await getAllProduct();
            if (res.data.data.errCode === 0) {
                setProducts(res.data.data.product);
            }
            // Handle response data here
        };
        fetchData();
    }, [deleteAction]);
    async function handleCreate() {
        console.log(modalName,modalSize,modalColor,modalStock,modalPrice,modalCategory,modalImage)
        if(!modalName|| !modalSize|| !modalColor|| !modalStock|| !modalPrice|| !modalCategory|| !modalImage){
            toast.error("Missing required input")
        } else {
            const formData = new FormData();
            formData.append('name', modalName);
            formData.append('size', modalSize);
            formData.append('color', modalColor);
            formData.append('stock', modalStock);
            formData.append('price', modalPrice);
            formData.append('categoryId', modalCategory);
            formData.append('img', modalImage);
            console.log('form data',formData)
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            let res = await createNewProduct(
                formData
            )
            if(res.data.data.errCode==0){
                toast.success("Create success")
                setIsShowCreateBtn(false)
                setDeleteAction(!deleteAction)
                console.log()
            } else {
                toast.error("Something fail")
                console.log("fail")
            }
            console.log(res)

        }
    }
    async function deleteProductAction(productDetailId){
        let res = await deleteProduct({
            productDetailId:productDetailId
        })
        if (res.data.data.errCode==0){
            toast.success("Delete successfully")
            setDeleteAction(!deleteAction)
        } else {
            toast.error("Something fail")
        }
        console.log(res)
    }
    return (
        <div className='admin-home-container'>
            <ToastContainer 
                position="bottom-right"
                autoClose={5000}
    
            />
            <Sidebar className="sidebar"></Sidebar>
            <div className='content-right'>
                <AdminHeader></AdminHeader>
                <div className='content'>
                    <div className='heading'>
                        <span>Product</span>
                        <button className='create-btn' onClick={()=>{setIsShowCreateBtn(true)}}>Create</button>
                    </div>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>Id</td>
                                <td className='productName'>Name</td>
                                <td>Img</td>
                                <td>Size</td>
                                <td>Color</td>
                                <td>Quantity</td>
                                <td>Category</td>
                                <td>Collection</td>
                                <td>Price</td>
                                <td>Action</td>
                            </tr>

                            {products &&
                                products.map((item, index) =>
                                    item.Product_details.map((itemChildren, index) => (
                                        <tr key={index}>
                                            <th>{itemChildren.productDetailId}</th>
                                            <th className='productName'>{item.name}</th>
                                            <th><img src={`${itemChildren.img}`} alt="product"/></th>
                                            <th>{itemChildren.size}</th>
                                            <th>{itemChildren.color}</th>
                                            <th>{itemChildren.stock}</th>
                                            <th>{item.categoryId}</th>
                                            <th>{item.collectionId}</th>
                                            <th>{item.price}</th>
                                            <th><button className='delete-btn'
                                                onClick={()=>{deleteProductAction(itemChildren.productDetailId)}}
                                            >Delete</button></th>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>
                {
                    isShowCreateBtn && 

                    <div className='create-modal'>
                        <div className='modal-overlay'></div>
                        <div className='modal-container'>
                            <div className='modal-heading'>
                                <span >Create new product</span>
                                <span className='close-btn' onClick={()=>{setIsShowCreateBtn(false)}}>x</span>
                            </div>
                            <div className='modal-content'>
                                <div className='form-input'>
                                    <label>Name</label>
                                    <input
                                        type='text'
                                        className='modal-input'
                                        placeholder='Name of product'
                                        value={modalName}
                                        onChange={(e) => setModalName(e.target.value)}
                                    ></input>
                                </div>
                                <div className='form-input'>
                                    <label>Size</label>
                                    <input
                                        type='text'
                                        className='modal-input'
                                        placeholder='Size of product'
                                        value={modalSize}
                                        onChange={(e) => setModalSize(e.target.value)}
                                    ></input>
                                </div>
                                <div className='form-input'>
                                    <label>Color</label>
                                    <input
                                        type='text'
                                        className='modal-input'
                                        placeholder='Color of product'
                                        value={modalColor}
                                        onChange={(e) => setModalColor(e.target.value)}
                                    ></input>
                                </div>
                                <div className='form-input'>
                                    <label>Stock</label>
                                    <input
                                        type='text'
                                        className='modal-input'
                                        placeholder='Stock of product'
                                        value={modalStock}
                                        onChange={(e) => setModalStock(e.target.value)}
                                    ></input>
                                </div>
                                <div className='form-input'>
                                    <label>Price</label>
                                    <input
                                        type='text'
                                        className='modal-input'
                                        placeholder='Price of product'
                                        value={modalPrice}
                                        onChange={(e) => setModalPrice(e.target.value)}
                                    ></input>
                                </div>
                                <div className='form-input'>
                                    <label>Collection</label>
                                    <input
                                        type='text'
                                        className='modal-input'
                                        placeholder='Category of product'
                                        value={modalCategory}
                                        onChange={(e) => setModalCategory(e.target.value)}
                                    ></input>
                                </div>
                                <div className='form-input'>
                                    <label>Image</label>
                                    <input
                                        type='file'
                                        className='modal-input'
                                        placeholder='Image of product'
                                        // value={modalImage}
                                        onChange={(e) => setModalImage(e.target.files[0])}
                                    ></input>
                                </div>
                            </div>
                            <div className='modal-create'>
                                <button onClick={handleCreate}>Create</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default AdminProduct;
