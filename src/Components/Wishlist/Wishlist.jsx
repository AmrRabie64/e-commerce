import React, { useContext, useEffect, useState } from 'react'
import styles from './Wishlist.module.css'
import { WishlistContext } from '../../Context/WishlistContext'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const [wishlistDetails, setWishlisttDetails] = useState([])
  let [loading, setLoading] = useState(true)
  let [notFound, setNotFound] = useState(false)
  let { getWishlist , deleteWishlistItem , setNumOfWishlistItems } = useContext(CartContext)

  async function getWishlistDetails() { 
    let response = await getWishlist()
    if(response.data.count == '0'){
      setNotFound(true)
      console.log("000");
    }else{
      setNotFound(false)
      console.log(response.data.count);
    }
    setLoading(false)
    console.log(response.data);
    setWishlisttDetails(response.data.data)

  }
  async function deleteFromWishlist(id) {
    try {
      let response = await deleteWishlistItem(id);
      if (response.data.status === 'success') {
        getWishlistDetails()
        setNumOfWishlistItems(response.data.count)
        toast.success(response.data.message)
        // Remove the deleted item from wishlistDetails
        setWishlisttDetails(wishlistDetails.filter(item => item._id !== id));
      } else {
        console.error('Failed to remove item from the wishlist');
      }
    } catch (error) {
      console.error('Error while removing item from the wishlist', error);
    }
  }
  
  useEffect(() => {
    getWishlistDetails()

  }, [])

  return (
    <>
     {loading ? <><div className={`${styles.spinner} m-auto mt-5 mb-5 `}></div></> : 
     <>
     {notFound ? <><div className="contant d-flex justify-content-center mt-5 pt-5 mb-2">
            <div className="">
              <h2>Your WishList Is Empty ...</h2>
            </div>
            </div>
            <div className="butoun d-flex justify-content-center mb-5 pb-5">
              <Link to='/Home'><button className='btn btn-success'>Shop Now</button></Link>
            </div></> : <> <div className="container">
        <div className="row">
        {wishlistDetails.map((product) =>
        <div key={product._id} className="row my-4 py-3 bg-light">
          <div className="col-md-1">
            <img src={product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-11 d-flex justify-content-between align-items-center position-relative ">
            <div className="">
              <Link to={'/product-details/' + product.id}><h4 className='texe-succsess'>{product.title.split(" ").splice(0, 2).join(' ')}</h4></Link>
              <p>{product.description.split(" ").splice(0, 10).join(' ')}</p>
              <p className='text h4 my-2'><span className='text-main'>EGP </span> {product.price}</p>
              
              <Link to={'/product-details/' + product.id}>
                <button className='btn btn-success'><span className='btn-danger'>Check Details</span></button>
              </Link>
              <div className={`${styles.remove} position-absolute top-0`}>
              <button onClick={()=>deleteFromWishlist(product._id)} className=''><i class="fa-solid fa-heart-crack text-danger fs-3"></i></button>
              </div>
            </div>
            
            

          </div>
        </div>
      )}
        </div>
      </div></> }
     
     </>
      }

    </>
  )
}
