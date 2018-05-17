import React from 'react'
import { STATUS } from '../constants'
import '../assets/styles/Input.css'

const Input = ({ status, errorText, validatedText, defaultLabel, placeholder, className, type, onBlur }) => {

  // Show label text based on input's status
  const showLabel = () => {
    switch (status) {
      case STATUS.valid:
      return validatedText

      case STATUS.error:
      return errorText

      case STATUS.empty:
      default:
      return defaultLabel
    }
  }

  // If error, update CSS class to reflect 
  const hasError = () => {
    return status === STATUS.error
  }

  return(
    <label className={hasError() ? 'error-msg' : ''}>
      {showLabel()}
      <input
        placeholder={placeholder}
        className={className}
        type={type}
        onBlur={onBlur}
      />
    </label>
  )
}
export default Input
