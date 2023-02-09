import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.jpeg'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import styles from '../styles/Username.module.css'
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

function Username() {
  const navigate = useNavigate()

  const setUsername = useAuthStore((state) => state.setUsername)

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username)
      // console.log(values)
      navigate('/password')
    },
  })
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex  flex-col justify-center items-center h-screen gap-5">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting us
            </span>
          </div>

          <form className="py-1 " onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="text"
                placeholder="Username"
                className={styles.textbox}
                {...formik.getFieldProps('username')}
              />
              <button type="submit" className={styles.btn}>
                Let's go
              </button>
            </div>
            <div className="text-center py-4 flex flex-row justify-around">
              <span className="text-gray-500">Not a member ?</span>
              <Link className="text-red-500" to="/register">
                {' '}
                Register Now
              </Link>
            </div>
          </form>
        </div>
        <span className="flex flex-col items-center">
          For test the app, try these identifiers:
          <p>Username: example1234</p>
          <p>password: admin@1234</p>
        </span>
      </div>
    </div>
  )
}

export default Username
