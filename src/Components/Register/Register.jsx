import React, { useState } from 'react'
import styles from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'


export default function Register() {
  const [isLoading,setIsLoading] = useState(false)
  const [errorMessage,setErorrMessage] = useState(null)
  let navigate = useNavigate()



  async function register(values) {
      console.log(values);
      setIsLoading(true)
      setErorrMessage(null)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err)=>{
      console.log(err);
      setIsLoading(false)
      setErorrMessage(err.response.data.message)
    })
  
    if(data.message == "success"){
      setIsLoading(false)
      navigate("/login")
    }
  }

  
  let mySchema = Yup.object({
    name: Yup.string().required("Required").min(3, "Min letters is 3").max(15, "Max letters is 15"),
    email: Yup.string().required("Required").email("Invalid Email"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Keep your password secure! Use a combination of uppercase and lowercase letters, numbers, and special characters to make it more secure").required("Required"),
    rePassword: Yup.string().required("Required").oneOf([Yup.ref('password')], "RePasword must be Match"),
    phone: Yup.string().required("Required").matches(/^01[0125][0-9]{8}$/, "Invalid Phone")
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, validationSchema: mySchema,
    onSubmit: (values) => register(values)
  })



  return (
    <>
      <div class Name="container me-auto ">

        {/* <div className="row d-flex  align-items-center justify-content-center text-center py-2">
          <div className="col-md-4 ">
            <div className="title">
              <h2>Register Now </h2>
            </div>  
            
            
          </div>

        </div> */}
        <div className="row d-flex align-items-center justify-content-center text-center my-5">
          <div className="col-md-4">
            <div className="register-form">
              <form onSubmit={formik.handleSubmit}  >
                <div className={`${styles.formBox}`}>
                  <div className={`${styles.form}`} >
                    <span className={`${styles.title}`}>Sign up</span>
                    {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                    
                    <span className={`${styles.subtitle}`}>Create a free account with your email.</span>
                    <div className={`${styles.formContainer}`}>
                      <input type="text" className={`${styles.input} mb-2 rounded`} placeholder="Full Name" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ''}
                      <input type="email" className={`${styles.input} mb-2 rounded`} placeholder="Email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ''}
                      <input type="password" className={`${styles.input} mb-2 rounded`} placeholder="Password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ''}
                      <input type="password" className={`${styles.input} mb-2 rounded`} placeholder="Re-Password" name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ''}
                      <input type="tel" className={`${styles.input} mb-2 rounded`} placeholder="Phone" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ''}
                    </div>
                    {isLoading ? <div className={`${styles.spinner} m-auto `}></div> :  <button  type='submit'>Sign up</button>}
                    {/* <button  type='submit'>Sign up</button> */}
                    
                  </div>
                  <div className={`${styles.formSection}`}>
                    <p>Have an account? <Link to='login'>Log in</Link> </p>
                  </div>
                </div>  
              </form>
            </div>
          </div>
        </div>

      </div>






    </>

  )
}
