import React, { Component } from 'react'
import Markdown from 'react-remarkable'
import hljs from 'highlight.js'

const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (err) {
      console.error(err)
    }
  }

  try {
    return hljs.highlightAuto(str).value
  } catch (err) {
    console.error(err)
  }

  return '' // use external default escaping
}

const MyFormSource = () => {
  return (
    <Markdown options={{
      html:         true,        // Enable HTML tags in source
      xhtmlOut:     true,        // Use '/' to close single tags (<br />)
      breaks:       true,        // Convert '\n' in paragraphs into <br>
      // langPrefix:   'language-',  // CSS language prefix for fenced blocks
      linkify:      false,        // Autoconvert URL-like text to links

      // Enable some language-neutral replacement + quotes beautification
      typographer:  true,
      highlight
    }}>{`
\`\`\`js
import React, { Component, Fragment } from 'react'
import MyForm, { Field } from 'my-react-form'

import bankList from '../bankList'
import randomQuotes from '../randomQuotes'

const numInputValidator = (value, min = 8, max = 20) => {
  return value.toString().trim() &&
    !isNaN(value.toString().trim()) &&
    value.toString().trim().length > min &&
    value.toString().trim().length <= max
}

const emailInputValidator = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

const validation = {
  bank_name: {
    validate: val => val,
    error: 'Bank name is required'
  },
  account_number: {
    validate: val => val && numInputValidator(val),
    error: val => !val
      ? 'Account number is required'
      : 'Account number should be number with minimum 8 characters and maximum 20 characters'
  },
  account_name: {
    validate: val => val,
    error: 'account name is required'
  },
  gender: {
    validate: val => val,
    error: 'account gender is required'
  },
  account_email: {
    validate: val => val ? emailInputValidator(val) : true,
    error: 'Invalid format email, validate your email eg: sample@sample.com'
  },
  account_password: {
    validate: val => vals => !vals['account_password_retype'] ? val : val && val === vals['account_password_retype'],
    error: val => !val
      ? 'Password is required'
      : 'Password not match !'
  },
  account_password_retype: {
    validate: val => vals => !vals['account_password'] ? true : val && val === vals['account_password'],
    error: 'Password not match !'
  }
}

class MyFormDemo extends Component {
  state = {
    submitted: null,
    randomQuotes: ''
  }

  componentDidMount () {
    this.initialValues({
      bank_name: '',
      account_number: '',
      account_name: 'John',
      gender: 1
    }, true)
  }

  handleSubmit = form => {
    setTimeout(() => {
      delete form.values.account_password_retype
      this.setState({ submitted: form.values })
      form.handlers.setSubmitting(false)
    }, 3000)
  }

  handleUpdate = form => {
    // will triggered whenever form is updated
    this.setState({ randomQuotes: randomQuotes[Math.floor((Math.random() * 10) + 1) - 1] })
  }

  handleBlur = handlers => () => {
    // override account_number validation rule temporary
    // now while typing, validator wont check if account_number format is invalid
    // unless we submit and it will run the default validation rule
    handlers.validateField('account_number', {
      validate: val => val,
      error: 'Account number is required'
    })
  }

  render() {
    return (
      <MyForm
        scrollOnError={true}
        validateOnInit={true}
        withBaseCSS={true}
        initialValues={{
          account_number: '123456789',
          account_name: 'John',
          gender: 1
        }}
        validation={validation}
        onSubmit={this.handleSubmit}
        onUpdate={this.handleUpdate}
      >
        {
          props => {
            const {
              values,
              errors,
              touched,
              isSubmitting,
              isValid,
              handlers
            } = props

            return (
              <div style={{
                padding: 15,
                margin: '15px 0',
                background: '#FFF'
              }}>
                <p>
                  Random quotes generated whenever the form is updated<br /><br />
                  {
                    this.state.randomQuotes
                      ? this.state.randomQuotes
                      : randomQuotes[0]
                  }
                </p>
                <Field
                  type="select"
                  fullWidth
                  required
                  name="bank_name"
                  id="bank_name"
                  value={values['bank_name']}
                  onChange={handlers.onChange}
                  onBlur={handlers.onBlur}
                  helper="list of bank from indonesia"
                  placeholder="Choose at least 1 bank"
                  label="Bank Name"
                  options={bankList.length
                    ? bankList.map((bank, i) => (
                      { label: bank.name, value: bank.value, disabled: i === 5 }
                    ))
                    : []
                  }
                  error={touched['bank_name'] && errors['bank_name'] ? true : false}
                  info={touched['bank_name'] && errors['bank_name'] && errors['bank_name']}
                />

                <Field
                  type="number"
                  fullWidth
                  required
                  name="account_number"
                  id="account_number"
                  value={values['account_number']}
                  onChange={handlers.onChange}
                  onBlur={this.handleBlur(handlers)}
                  placeholder="Input Account Number ..."
                  label="Account Number"
                  error={touched['account_number'] && errors['account_number'] ? true : false}
                  info={touched['account_number'] && errors['account_number'] && errors['account_number']}
                />

                <Field
                  fullWidth
                  required
                  name="account_name"
                  id="account_name"
                  value={values['account_name']}
                  onChange={handlers.onChange}
                  onBlur={handlers.onBlur}
                  placeholder="Input Account Name ..."
                  label="Account Name"
                  error={touched['account_name'] && errors['account_name'] ? true : false}
                  info={touched['account_name'] && errors['account_name'] && errors['account_name']}
                />

                <Field
                  type='radio'
                  required
                  fullWidth
                  name="gender"
                  id="gender"
                  value={parseFloat(values['gender'])}
                  onChange={handlers.onChange}
                  onBlur={handlers.onBlur}
                  label="Gender"
                  row
                  options={[
                    { label: 'Male', value: 1 },
                    { label: 'Female', value: 2 },
                    { label: 'Robot', value: 3, disabled: true }
                  ]}
                  error={touched['gender'] && errors['gender'] ? true : false}
                  info={touched['gender'] && errors['gender'] && errors['gender']}
                />

                <Field
                  type='checkbox-group'
                  fullWidth
                  name="available_cards"
                  id="available_cards"
                  value={values['available_cards']}
                  onChange={handlers.onCheckGroup}
                  onBlur={handlers.onBlur}
                  label="Available Cards"
                  row
                  options={[
                    { label: 'VISA', value: 'visa' },
                    { label: 'Maste Card', value: 'master-card' },
                    { label: 'Other Card', value: 'other-card' },
                    { label: 'Invincible Card', value: 'invincible-card', disabled: true }
                  ]}
                  error={touched['available_cards'] && errors['available_cards'] ? true : false}
                  info={touched['available_cards'] && errors['available_cards'] && errors['available_cards']}
                />

                <Field
                  fullWidth
                  name="account_email"
                  id="account_email"
                  type="email"
                  value={values['account_email']}
                  onChange={handlers.onChange}
                  onBlur={handlers.onBlur}
                  placeholder="Input Email if available ..."
                  label="Active Email"
                  error={touched['account_email'] && errors['account_email'] ? true : false}
                  info={touched['account_email'] && errors['account_email'] && errors['account_email']}
                  helper="We won't spam you.. dont't worry"
                />

                <Field
                  required
                  fullWidth
                  name="account_password"
                  id="account_password"
                  type="password"
                  value={values['account_password']}
                  onChange={handlers.onChange}
                  onBlur={handlers.onBlur}
                  placeholder="Input Password ..."
                  label="Password"
                  error={touched['account_password'] && errors['account_password'] ? true : false}
                  info={touched['account_password'] && errors['account_password'] && errors['account_password']}
                />

                <Field
                  required
                  fullWidth
                  toggleShowPassword
                  name="account_password_retype"
                  id="account_password_retype"
                  type="password"
                  value={values['account_password_retype']}
                  onChange={handlers.onChange}
                  onBlur={handlers.onBlur}
                  placeholder="Retype your password ..."
                  error={touched['account_password_retype'] && errors['account_password_retype'] ? true : false}
                  info={touched['account_password_retype'] && errors['account_password_retype'] && errors['account_password_retype']}
                  helper="We want to make sure you didn't make any mistake"
                />

                <br />

                <Field
                  type="submit"
                  onClick={handlers.handleSubmit({
                    // override bank_name validation rule temporary
                    // this will make bank_name validation always return to true
                    // so we can submit form without input bank_name value
                    validation: {
                      bank_name: {
                        validate: val => true,
                        error: ''
                      }
                    }
                  })}
                  disabled={isSubmitting}
                  variant="contained"
                  fullWidth
                  label={isSubmitting ? 'please wait ...' : 'save'}
                />

                {
                  this.state.submitted
                    ? JSON.stringify(this.state.submitted, undefined, 4)
                    : null
                }
              </div>
            )
          }
        }
      </MyForm>
    )
  }
}

export default MyFormDemo
\`\`\`
    `}</Markdown>
  )
}

export default MyFormSource
