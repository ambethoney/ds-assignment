import React, { Component } from 'react'
import { STATUS } from '../constants'
import Input from './Input'
import { sendFormToQueue } from '../services/SendFormToQueue'
import '../assets/styles/Form.css'
import eye from '../assets/images/eye.svg'

class Form extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: { value: '', status: STATUS.empty },
      birthday: { value: '', status: STATUS.empty },
      email: { value: '', status: STATUS.empty },
      cellPhone: { value: '', status: STATUS.empty },
      password: { value: '', status: STATUS.empty },
      togglePassword: 'password',
    }
  }

  // Handles validation for inputted name
  handleName = (event) => {
    let name = event.target.value

    if (!name) {
      this.setState({ name: {
        status: STATUS.empty,
        value: name
      }})
    } else {
      this.setState({ name: {
        status: STATUS.valid,
        value: name
      }})
    }
  }

  // Handles validation for inputted birthday
  handleBirthday = (event) => {
    let birthday = event.target.value
    const dateValid = /^\d{2}([/])\d{2}([/])\d{4}$/.test(birthday)

    if (!birthday) {
      this.setState({ birthday: {
        status: STATUS.empty,
        value: birthday
      }})
    } else if (!dateValid) {
      this.setState({ birthday: {
        status: STATUS.error,
        value: birthday
      }})
    } else {
      this.setState({ birthday: {
        status: STATUS.valid,
        value: birthday
      }})
    }
  }

  // Handles validation for inputted email
  handleEmail = (event) => {
    let email = event.target.value
    const emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/.test(email)

    if (!email) {
      this.setState({ email: {
        status: STATUS.empty,
        value: email
      }})
    } else if (!emailValid) {
      this.setState({ email: {
        status: STATUS.error,
        value: email
      }})
    } else {
      this.setState({ email: {
        status: STATUS.valid,
        value: email
      }})
    }
  }

  // Handles validation for inputted cell phone
  handleCellPhone = (event) => {
    let cellPhone = event.target.value
    const cellValid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(cellPhone)

    if (!cellPhone) {
      this.setState({ cellPhone: {
        status: STATUS.empty,
        value: cellPhone
      }})
    } else if (!cellValid) {
      this.setState({ cellPhone: {
        status: STATUS.error,
        value: cellPhone
      }})
    } else {
      this.setState({ cellPhone: {
        status: STATUS.valid,
        value: cellPhone
      }})
    }
  }

  // Handles validation for inputted password
  handlePassword = (event) => {
    let password = event.target.value
    const passwordValid = password.length > 6

    if (!password) {
      this.setState({ password: {
        status: STATUS.empty,
        value: password
      }})
    } else if (!passwordValid) {
      this.setState({ password: {
        status: STATUS.error,
        value: password
      }})
    } else {
      this.setState({ password: {
        status: STATUS.valid,
        value: password
      }})
    }
  }

  // Toggles password between type 'password' and 'text'
  togglePassword = () => {
    this.setState({
      togglePassword: this.state.togglePassword === 'text' ? 'password' : 'text'
    })
  }


  // If all required inputs are populated, pass along our info to be POSTed
  handleSubmit = (event) => {
    event.preventDefault()

    if (this.requiredFieldsArePopulated()) {

      const payload = {
        name: this.state.name.value,
        birthday: this.state.birthday.value,
        email: this.state.email.value,
        cellPhone: this.state.cellPhone.value,
        password: this.state.password.value,
      }

      sendFormToQueue(payload)
      this.resetInputFields(event)

    } else {
      // Otherwise, let our user know they've missed a field
      this.requiredFieldIsEmpty()
    }
  }

  // Ensures all required fields have an input
  requiredFieldsArePopulated = () => {
    return this.state.name.value && this.state.birthday.value && this.state.email.value && this.state.password.value
  }

  // Clear all fields on successful submit
  resetInputFields = (event) => {
    for (const key in this.state) {
      const newState = {}
      newState[key] = {value: event.target.reset(), status: STATUS.empty}
      this.setState(newState)
    }
  }

  requiredFieldIsEmpty = () => {
    //Parse state, see if any has a status of EMPTY
    for (const key in this.state) {
      if (this.state[key].status === STATUS.empty) {
        const newState = {}
        // Ensures we don't lose the client's input when notifying them of an error
        newState[key] = {value: this.state[key].value, status: STATUS.error}
        this.setState(newState)
      }
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='wrapper_half cover-image' style={{backgroundImage: 'url(https://profile.dosomething.org/members.jpg)'}}>
        </div>
        <div className='wrapper_half'>
          <div className='container__block'>
            <h2>Create a DoSomething.org account to get started!</h2>
            <p>Join 6 million young people taking action.</p>
          </div>
          <div className='container__block'>
            <button className='facebook-login'> <a href='https://facebook.com' target='_blank'> Continue with Facebook </a></button>
            <button className='login'> <a href='https://profile.dosomething.org/login'>Log In </a></button>
          <div className='divider'></div>
        </div>
        <div className='container__block-centered'>
            <form onSubmit={this.handleSubmit}>
              <div>
                <div className='form-item-reduced'>
                  <Input
                    field='Name'
                    defaultLabel='First Name'
                    placeholder='What do we call you?'
                    value={this.state.name.value}
                    validatedText={`Hey, ${this.state.name.value}`}
                    status={this.state.name.status}
                    errorText='We need your first name.'
                    className='text-field'
                    type='text'
                    onBlur={this.handleName}
                  />
                </div>
                <div className='form-item-reduced'>
                  <Input
                    defaultLabel='Birthday'
                    validatedText= 'Got it!'
                    status={this.state.birthday.status}
                    errorText='Enter your birthday MM/DD/YYYY !'
                    placeholder='MM/DD/YYYY'
                    type='text'
                    value={this.state.birthday.value}
                    onBlur={this.handleBirthday}
                    className='text-field'
                  />
              </div>
            </div>
            <div className='form-item'>
              <Input
                defaultLabel='Email address'
                placeholder='puppet-sloth@example.org'
                validatedText='Great, thanks!'
                status={this.state.email.status}
                errorText='We need a valid email.'
                type='text'
                value={this.state.email.value}
                onBlur={this.handleEmail}
                autocomplete='email'
                className='text-field'
              />
            </div>
            <div className='form-item'>
              <Input
                defaultLabel='Cell number (optional)'
                placeholder='(555)555-5555'
                validatedText='Thanks!'
                status={this.state.cellPhone.status}
                errorText='Enter a valid telephone number.'
                type='text'
                value={this.state.cellPhone.value}
                onBlur={this.handleCellPhone}
                className='text-field'
              />
              </div>
              <div className='form-item'>
                <Input
                  defaultLabel='Password'
                  placeholder='6+ characters... make it tricky!'
                  validatedText='Keep it secret, keep it safe!'
                  status={this.state.password.status}
                  errorText='Must be 6+ characters.'
                  type={this.state.togglePassword}
                  value={this.state.password.value}
                  onBlur={this.handlePassword}
                  className='text-field'
                />
                <span
                  className={`password-visibility__toggle ${this.state.togglePassword === 'text' ? 'show' : ''}`}
                  onClick={this.togglePassword}>
                    <img src={eye} alt=''/>
                </span>
              </div>
              <div className='form-item'>
                <input type='submit' value='Create New Account' className='register-submit'/>
              </div>
            </form>
          </div>
          <div className='container__block-centered'>
            <p className='footnote'>Creating an account means you agree to our <a href='https://www.dosomething.org/us/about/terms-service'>Terms of Service</a> & <a href='https://www.dosomething.org/us/about/privacy-policy'>Privacy Policy</a> and to receive our weekly update. Message & data rates may apply. Text STOP to opt-out, HELP for help.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Form
