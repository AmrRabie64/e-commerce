import React, { useState } from 'react'
import styles from './ForgotPassword.module.css'
import { useFormik, yupToFormErrors } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function ForgotPassword() {
  const [errorMessage, setErorrMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [inputCode, setInputCode] = useState(null)
  const [doneCode, setDoneCode] = useState(null)
  const [reset, setReset] = useState(null)
  let navigate = useNavigate()
  async function postEmail(values) {
    setIsLoading(true)
    let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`, values).catch((err) => {
      console.log(err.response.data.message)
      setErorrMessage(err.response.data.message)

    })
    if (data.statusMsg == "success") {
      setIsLoading(false)
      console.log(values)
      formikReset.setFieldValue('email', values.email);

      setInputCode(values.email)


    } else {
      console.log("Invalid Mail");
    }

  }
  let formik = useFormik({
    initialValues: {
      email: ''
    }, onSubmit: (values) => postEmail(values),
  })

  async function postCode(value) {
    setIsLoading(true)
    let data = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`, value).catch((err) => {
      console.log(err.response.data.message);
      setErorrMessage(err.response.data.message)
      setIsLoading(false)
    })
    if (data.data.status == 'Success') {
      setIsLoading(false)
      console.log("success fromCode");
      setDoneCode(value)
    }
    console.log(data);
  }
  let formikCode = useFormik({
    initialValues: {
      resetCode: ''
    }, onSubmit: (value) => postCode(value),
  })
  async function resetPassword(value) {
    setIsLoading(true)
    let data = await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`, value).catch((err) => {
      console.log(err);
      setErorrMessage(err.response.data.message)
      setIsLoading(false)
    })
    if (data) {
      console.log("success resetPassword");
      setIsLoading(false)
      setReset(value)
      navigate('/login')

    }
    console.log(data);
  }
  

  let formikReset = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },onSubmit: (value) => resetPassword(value)
  })







  return (
    <>
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center text-center my-5">
          <div className="col-md-4">
            <div className="register-form">

              <div className={`${styles.formBox}`}>
                <div className={`${styles.form}`}>

                  {doneCode ? <>
                    <form onSubmit={formikReset.handleSubmit}>
                      <div className="Title">
                        <h4 className={`${styles.title} mb-3`}>Reset Password</h4>
                        <p className={`${styles.subtitle} mb-3`}>Please Enter Your New Password </p>
                        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                      </div>
                      <input type="text" className={`${styles.input} mb-4 rounded form-control`} placeholder="Email" disabled name='email' value={formik.values.email} onChange={formikReset.handleChange} />
                      <input type="password" className={`${styles.input} mb-4 rounded form-control`} placeholder='rePassword' name='newPassword' value={formikReset.newPassword} onChange={formikReset.handleChange} />
                      {isLoading ? <div className={`${styles.spinner} m-auto `}></div> : <button type='submit'>Reset</button>}
                    </form>
                  </> : <>
                    {inputCode ? <> <div className="Title">
                      <h4 className={`${styles.title} mb-3`}>Reset Password</h4>
                      <p className={`${styles.subtitle} mb-3`}>Please Enter Code </p>
                      {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                    </div>
                      <input type="text" className={`${styles.input} mb-4 rounded form-control`} placeholder="Email" disabled value={formik.values.email} onChange={formik.handleChange} />
                      <form onSubmit={formikCode.handleSubmit}>

                        <input type="text" className={`${styles.input} mb-4 rounded form-control`} placeholder="Code.." name='resetCode' value={formikCode.resetCode} onChange={formikCode.handleChange} />
                        {isLoading ? <div className={`${styles.spinner} m-auto `}></div> : <button type='submit'>Send Code</button>}
                      </form>
                    </>
                      : <>     <form onSubmit={formik.handleSubmit}>
                        <div className="Title">
                          <h4 className={`${styles.title} mb-3`}>Reset Password</h4>
                          <p className={`${styles.subtitle} mb-3`}>Please Enter Your Mail</p>
                          {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                        </div>
                        <input className={`${styles.input} mb-4 rounded form-control`} placeholder="Email" name='email' value={formik.email} onChange={formik.handleChange} />
                        {isLoading ? <div className={`${styles.spinner} m-auto `}></div> : <button type='submit'>Next</button>}
                      </form>
                      </>}
                  </>}






                </div>

              </div>
            </div>
          </div>
        </div>








      </div>
    </>
  )

}

