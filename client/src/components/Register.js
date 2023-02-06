import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.jpeg'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import styles from '../styles/Username.module.css'
import { registerValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { registerUser } from '../helper/helper'

function Register() {
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const formik = useFormik({
    initialValues: {
      email: 'test@gmail.com',
      username: 'example123',
      password: 'admin@123',
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      //on rajoute dans l'objet values la key value profile:file
      values = await Object.assign(values, { profile: file || '' })
      console.log(values)
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        succes: <b>Register Successfully</b>,
        error: <b>Could not register </b>,
      })
      registerPromise.then(function () {
        navigate('/')
      })
    },
  })
  // file upload not work with formik => create a function
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: '50%', height: '85%' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you
            </span>
          </div>

          <form className="py-1 " onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="text"
                placeholder="Email"
                className={styles.textbox}
                {...formik.getFieldProps('email')}
              />
              <input
                type="text"
                placeholder="Username"
                className={styles.textbox}
                {...formik.getFieldProps('username')}
              />
              <input
                type="text"
                placeholder="Password"
                className={styles.textbox}
                {...formik.getFieldProps('password')}
              />
              <button type="submit" className={styles.btn}>
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register ?
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
