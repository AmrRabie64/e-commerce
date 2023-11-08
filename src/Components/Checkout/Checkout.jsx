import React, { useContext } from 'react'
import styles from './Checkout.module.css'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function Checkout() {
let {generateOnlinPayment , cartId}= useContext(CartContext)

async function handlePayment(values) {
    console.log(values);
    let {data} =  await generateOnlinPayment(cartId,values)
    console.log(data);
    if(data.session){
      console.log(data.session.url);
      window.location.href = data.session.url
    }
  }


  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit : handlePayment
  })

  return (
    <>

      <div className="container d-flex justify-content-center mt-5">
        <form onSubmit={formik.handleSubmit} className='d-flex'>
          <div className={`${styles.formBox}`}>
            <div className={`${styles.form}`}>
              <h2 className={`h4`}>Details For Shipment</h2>
              <div className={`${styles.formContainer}`}>
                <input type="text" className={`${styles.input} mb-4 rounded`} placeholder="Details" name='details' value={formik.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <input type="text" className={`${styles.input} mb-4 rounded`} placeholder="Phone" name='phone' value={formik.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <input type="text" className={`${styles.input}  rounded`} placeholder="City" name='city' value={formik.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                {/* {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ''} */}
              </div>
            </div>
            <div className={`${styles.formSection}`}>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                  <div className={`${styles.continuo_button} `}>
                    
                      <button type='submit'>
                        <span>Continue to Proceed &rarr;</span>
                      </button>
                      
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

    </>
  )
}
