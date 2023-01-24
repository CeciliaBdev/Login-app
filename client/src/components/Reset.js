import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import styles from '../styles/Username.module.css'
import { resetPasswordValidate } from '../helper/validate'

function Reset() {
  const formik = useFormik({
    initialValues: {
      password: 'admin@123',
      confirm_pwd: 'admin@123',
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
    },
  })
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen ">
        <div className={styles.glass} style={{ width: '50%' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password
            </span>
          </div>

          <form className="py-20 " onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="text"
                placeholder="New Password"
                className={styles.textbox}
                {...formik.getFieldProps('password')}
              />
              <input
                type="text"
                placeholder="Repeat Password"
                className={styles.textbox}
                {...formik.getFieldProps('confirm_pwd')}
              />
              <button type="submit" className={styles.btn}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset
