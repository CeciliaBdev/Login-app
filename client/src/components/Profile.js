import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.jpeg'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import styles from '../styles/Username.module.css'
import extend from '../styles/Profile.module.css'
import { profileValidate } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import useFetch from '../hooks/fetch.hook'
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router'

function Profile() {
  const [file, setFile] = useState()
  const navigate = useNavigate()
  const [{ isLoading, apiData, serverError }] = useFetch()

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      mobile: apiData?.mobile || '',
      email: apiData?.email || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      //on rajoute dans l'objet values la key value profile:file
      values = await Object.assign(values, {
        profile: file || apiData?.profile || '',
      })
      let updatePromise = updateUser(values)
      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successfully...!</b>,
        error: <b>Could not update!</b>,
      })
      console.log(values)
    },
  })
  // file upload not work with formik => create a function
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }

  //logout
  function userLogout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (isLoading) return <h1 className="text-2-xl font-bold">isLoading</h1>
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass}`}
          // style={{ width: '50%', height: '85%' }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details
            </span>
          </div>

          <form className="py-1 " onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || avatar}
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
              <div className="name flex w-3/4 gap-10">
                <input
                  type="text"
                  placeholder="Firstname"
                  className={styles.textbox}
                  {...formik.getFieldProps('firstName')}
                />
                <input
                  type="text"
                  placeholder="Lastname"
                  className={styles.textbox}
                  {...formik.getFieldProps('lastName')}
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  type="text"
                  placeholder="Mobile"
                  className={styles.textbox}
                  {...formik.getFieldProps('mobile')}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className={styles.textbox}
                  {...formik.getFieldProps('email')}
                />
              </div>

              <input
                type="text"
                placeholder="Address"
                className={styles.textbox}
                {...formik.getFieldProps('address')}
              />
              <button type="submit" className={styles.btn}>
                Update
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{' '}
                <button onClick={userLogout} className="text-red-500" to="/">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
