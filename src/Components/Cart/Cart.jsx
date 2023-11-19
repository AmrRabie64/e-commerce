import React, { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { useContext } from 'react'
import { CounterContext } from '../../Context/CounterContext'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'


export default function Cart() {

  const [cartDetails, setCartDetails] = useState({})

  let { getCart, updateCart, deleteCartItem ,setNumOfCartItems } = useContext(CartContext)

  let [loading, setLoading] = useState(true)
  let [notFound, setNotFound] = useState(false)

  async function getCartDetails() {
    let response = await getCart()
    if (response.data.numOfCartItems == "0") {
      setNotFound(true)
    }
    setLoading(false)
    console.log(response);
    setCartDetails(response.data)


  }
  async function updateCartHandle(id, count) {
    let response = await updateCart(id, count)
    
    console.log(response);
    setCartDetails(response.data)
    if (count == 0) {
      deleteCartHandle(id)
    }


  }
  async function deleteCartHandle(id) {
    let response = await deleteCartItem(id)
    setNumOfCartItems(response.data.numOfCartItems)
    console.log(response.data);
    setCartDetails(response.data)
    getCartDetails()

  }



  useEffect(() => {
    getCartDetails()

  }, [])

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Cart</title>
      </Helmet>
      {loading ? <><div className={`${styles.spinner} m-auto my-5 my-5 `}></div></> : <>
        {notFound ? <>

          <div className="contant d-flex justify-content-center mt-5 pt-5 mb-2">
            <div className="">
              <h2>Your Cart Is Empty ...</h2>
            </div>
            </div>
            <div className="butoun d-flex justify-content-center mb-5 pb-5">
              <Link to='/Home'><button className='btn btn-success'>Shop Now</button></Link>
            </div>
          
        </> : <>
          {cartDetails && cartDetails.data && <> <div className="container my-5 p-5 bg-main-light">
            {cartDetails.data.products.map((product) =>
              <div key={product.product._id} className="row my-5 py-2 bg-light">
                <div className="col-md-1">
                  <img src={product.product.imageCover} className='w-100' alt="" />
                </div>
                <div className="col-md-11 d-flex justify-content-between align-items-center">
                  <div className="">
                    <h4 className='mt-2'>{product.product.title}</h4>
                    <p className='text h4 my-4'><span className='text-main'>EGP </span> {product.price}</p>
                    <div className="btn_Remove">
                      <button onClick={() => deleteCartHandle(product.product._id)} className={`${styles.btn_remove} bg-danger text-white`}>
                        <p className={`${styles.paragraph} ms-2`}>Remove</p>
                        <span className={`${styles.icon_wrapper}`}>
                          <svg className={`${styles.icon}`} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="d-flex ">
                    <div className="btn-minus ">
                      <div className={` ${styles.main_div_minus}`}>
                        <button className='bg-danger' onClick={() => updateCartHandle(product.product._id, product.count - 1)}>-</button>
                      </div>
                    </div>

                    <p className='mx-4 h2'>{product.count}</p>

                    <div className="btn-plus">
                      <div className={`${styles.main_div_plus}`}>
                        <button className='bg-main' onClick={() => updateCartHandle(product.product._id, product.count + 1)}>+</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            )}
            <div className="row d-flex ">
              <div className="col-md-4 my-4">
                <h4 className='text-success'>Total Price : {cartDetails.data.totalCartPrice} EGP</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-end">
                <div className={`${styles.continuo_button} `}>
                  <Link to={'/checkout'}>
                    <button className={``}>
                      <span>Continue to Proceed &rarr;</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </>
          }</>}
      </>}
    </>
  )
}
