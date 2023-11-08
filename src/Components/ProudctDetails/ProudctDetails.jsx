import React, { useContext, useEffect, useState } from 'react'
import styles from './ProudctDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';







export default function ProudctDetails() {


  let {createCart , setNumOfCartItems} = useContext(CartContext)
  let [loading, setLoading] = useState(true)
  let { id } = useParams()
  console.log(id);
  const [proudctDetails, setProudctDetails] = useState({})
  async function getProudctDetails() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setLoading(false)
    console.log(data.data);
    setProudctDetails(data.data)

  }
  async function generateCart(productId){
    let response =  await createCart(productId)
    // setLoading(true)
    console.log(response)
    if(response.data.status == 'success'){
       toast.success('Done')
       setNumOfCartItems(response.data.numOfCartItems)
    }else{
     toast.error('Something is wrong')
    }
   }
  useEffect(() => {
    getProudctDetails()
  }, [])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
     {loading ? <><div className={`${styles.spinner} m-auto mt-5 mb-5 `}></div></>   :  <> <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-4">
            <Slider {...settings}>
              {proudctDetails?.images?.map((img) => <div className="">
                <div className="mx-4">
                  <img  width={"100%"} className='w-100' src={img} alt="" />
                </div>
              </div>
              )}
            </Slider>
          </div>
          <div className="col-md-8">
            <h1>{proudctDetails.title}</h1>
            <p>{proudctDetails.description}</p>
            <div className="d-flex justify-content-between">
              <p>{proudctDetails.price} <span className='fs-6'>EGP</span></p>
              <div className="">
                <i className="fa fa-star rating-color m-2"></i>
                {proudctDetails.ratingsAverage}
              </div>
              
            </div>
            <div className="button">
            <button onClick={()=>generateCart(proudctDetails._id)} className={`${styles.button} w-100  bg-main border-sucsess`} >
                <span>Add to cart</span>
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <defs>  </defs> <g id="cart"> <circle r="1.91" cy="20.59" cx="10.07" class="cls-1"></circle> <circle r="1.91" cy="20.59" cx="18.66" class="cls-1"></circle> <path d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10" class="cls-1"></path> <polyline points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91" class="cls-1"></polyline> </g> </g></svg>
              </button>
            </div>
          </div>
        </div>
      </div></>}
    </>
  )
}
