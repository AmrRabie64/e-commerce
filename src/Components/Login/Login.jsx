import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
export default function Login({saveUser}) {

  const [isLoading,setIsLoading]= useState(false)
  const [errorMessage,setErorrMessage]=useState(null)

  let navigate = useNavigate()

  async function login(values){
    console.log(values);
    setIsLoading(true)
    setErorrMessage(null)
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((err)=>{
      setIsLoading(false)
      console.log(err);
      setErorrMessage(err.response.data.message)
    })
    console.log(data);
    
    
    if(data.message == "success"){
      setIsLoading(false)
      localStorage.setItem("userToken",data.token)
      saveUser()
      navigate("/")
    }
  }

  
  let mySchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid Email"),
    // password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Keep your password secure! Use a combination of uppercase and lowercase letters, numbers, and special characters to make it more secure").required("Required"),

  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, validationSchema: mySchema,
    onSubmit: (values) => login(values)
  })

  
  return (
    <>
    
      <div className="container">
      <div className="row d-flex align-items-center justify-content-center text-center my-5">
          <div className="col-md-4">
          <div className="register-form">
                <form onSubmit={formik.handleSubmit}>
                  <div className={`${styles.formBox}`}>
                    <div  className={`${styles.form}` }>
                      <span className={`${styles.title}`}>Log In</span>
                      {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                      <span className={`${styles.subtitle}`}>Sign in now for Shopping</span>
                      <div className={`${styles.formContainer}`}>
                        <input type="email" className={`${styles.input} mb-4 rounded`} placeholder="Email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ''}
                        <input type="password" className={`${styles.input}  rounded`} placeholder="Password" name='password'  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ''}
                      </div>
                      {isLoading ? <div className={`${styles.spinner} m-auto `}></div> :  <button  type='submit'>Sign In</button>}
                    </div>
                    <div className={`${styles.formSection} `}>
                      <div className="row "><p className='d-flex justify-content-start'><Link to='/register'>Create an Account</Link> </p></div>
                      <div className="row"><p className='d-flex justify-content-end'><Link to='/forgotPassword'>Forgot password ?</Link> </p></div>
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
