import toast from 'react-hot-toast'
import { authenticate } from './helper'

/** validate login page username */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values)

  if (values.username) {
    //if user exist ?
    const { status } = await authenticate(values.username)

    if (status !== 200) {
      errors.exist = toast.error('User doesnt exist')
    }
  }
  return errors
}
/**validate password page */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values)
  return errors
}
/** validate reset passwd */
export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values)
  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error('Password not match')
  }
  return errors
}

/** validate register form */
export async function registerValidate(values) {
  const errors = usernameVerify({}, values)
  passwordVerify(errors, values)
  emailVerify(errors, values)
  return errors
}

/**validate prifile */
export async function profileValidate(values) {
  const errors = emailVerify({}, values)
  return errors
}
//----------------------------------------/
/** validate username */
//2 arguments
//fct validation username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error('Username required')
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalide username')
  }
  return error
}

/** validate pssw */
function passwordVerify(error = {}, values) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  if (!values.password) {
    error.password = toast.error('password required')
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Invalide password')
  } else if (values.password.length < 4) {
    error.password = toast.error('Password must be more than 4 characters')
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error('Password must hav special chars')
  }
  return error
}

/** validate email */
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error('Email required')
  } else if (values.email.includes(' ')) {
    error.email = toast.error('wrong email')
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error('Invalid email address')
  }
  return error
}
