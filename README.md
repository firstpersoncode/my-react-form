### my-react-form
Just simple Form for React

#### Get Started:
Install `my-react-form`
```bash
$ npm i my-react-form
# or with yarn
$ yarn add my-react-form
```

#### [Demo ?, come here...](https://firstpersoncode.github.io/my-react-form/)

---
#### Create your Form:
```js
import React, { Component, Fragment } from 'react'
import MyForm, { Field } from 'my-react-form'

const emailInputValidator = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export default class MyFormComponent extends Component {
  render () {
    return (
      <MyForm
        scrollOnError={true}
        withBaseCSS={true} // for materialUI styling
        initialValues={{
          account_name: 'John'
        }}
        validation={{
          account_name: {
            validate: val => val,
            error: 'account name is required'
          },
          account_email: {
            validate: val => val && emailInputValidator(val),
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
        }}
        onSubmit={this.handleSubmit}
        form={this.renderForm}
      />
    )
  }

  handleSubmit = form => {
    setTimeout(() => {
      // we don't need account_password_retype's value
      delete form.values.account_password_retype

      // do whatever with form.values ...

      form.handlers.setSubmitting(false)
    }, 3000)
  }

  renderForm = form => {
    const {
      values,
      errors,
      touched,
      isSubmitting,
      isValid,
      handlers
    } = form

    return (
      <Fragment>
        <Field
          fullWidth
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
          required
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

        <Field
          type="submit"
          onClick={handlers.handleSubmit({
            // override account_email validation rule temporary
            // account_email validation will always return to true
            // so we can submit form without input account_email value
            validation: {
              account_email: {
                validate: val => true,
                error: ''
              }
            }
          })}
          disabled={isSubmitting}
          label={isSubmitting ? 'please wait ...' : 'save'}
        />
      </Fragment>
    )
  }
}
```

#### Or you can use HOC:
```js
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withMyForm, Field } from 'my-react-form'

class WithMyFormHOC extends Component {
  static propTypes = {
    handlers: PropTypes.object,
    values: PropTypes.object,
    errors: PropTypes.object,
    touched: PropTypes.object,
    isSubmitting: PropTypes.bool
  }

  componentDidMount () {
    const { handlers } = this.props
    // set initial values
    handlers.setInitialValues({
      account_name: 'John',
      gender: 1
    })
  }

  handleSubmit = () => {
    const { handlers } = this.props
    const submit = form => {
      setTimeout(() => {
        // we don't need account_password_retype's value
        delete form.values.account_password_retype

        // do whatever with form.values ...

        handlers.setSubmitting(false)
      }, 3000)
    }
    // override account_email validation rule temporary
    // account_email validation will always return to true
    // so we can submit form without input account_email value
    const options = {
      validation: {
        account_email: {
          validate: val => true,
          error: ''
        }
      }
    }
    // pass override validation as options.validation params
    handlers.submitForm(submit, options)
  }

  render() {
    const {
      values,
      errors,
      touched,
      isSubmitting,
      isValid,
      handlers
    } = this.props

    return (
      <Fragment>
        <Field
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
          required
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

        <Field
          type="submit"
          onClick={this.handleSubmit}
          disabled={isSubmitting}
          variant="contained"
          fullWidth
          label={isSubmitting ? 'please wait ...' : 'save'}
        />
      </Fragment>
    )
  }
}

const emailInputValidator = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export default withMyForm({
  validation: {
    account_name: {
      validate: val => val,
      error: 'account name is required'
    },
    account_email: {
      validate: val => val && emailInputValidator(val),
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
  },
  scrollOnError: true,
  withBaseCSS: true
})(WithMyFormHOC)
```

#### How About Render Object of Fields ?:
```js
import React, { Component, Fragment } from 'react'
import MyForm from 'my-react-form'

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

class MyFormDemo extends Component {
  render() {
    return (
      <MyForm
        scrollOnError={true}
        withBaseCSS={true}
        onSubmit={this.handleSubmit}
        initialValues={{
          ['field-text']: 'John',
          ['field-number']: '123456789'
        }}
        validation={{
          ['field-text']: {
            validate: val => val,
            error: 'Bank name is required'
          },
          ['field-number']: {
            validate: val => val && numInputValidator(val),
            error: val => !val
              ? 'Account number is required'
              : 'Account number should be number with minimum 8 characters and maximum 20 characters'
          },
          ['field-email']: {
            validate: val => val ? emailInputValidator(val) : true,
            error: 'Invalid format email, validate your email eg: sample@sample.com'
          },
          ['field-password']: {
            validate: val => val,
            error: 'Password is required'
          }
        }}
        form={{
          ['field-text']: {
            placeholder: 'input text ...',
            label: 'Text',
            fullWidth: true
          },
          ['field-number']: {
            type: 'number',
            placeholder: 'input number ...',
            label: 'Number',
            fullWidth: true
          },
          ['field-email']: {
            type: 'email',
            required: true,
            placeholder: 'input email ...',
            label: 'Email',
            fullWidth: true
          },
          ['field-password']: {
            type: 'password',
            required: true,
            placeholder: 'input password ...',
            label: 'Password',
            fullWidth: true
          },
          ['field-disabled']: {
            disabled: true,
            placeholder: 'Can not input anything ...',
            label: 'Disabled',
            fullWidth: true
          },
          ['field-error']: {
            fullWidth: true,
            placeholder: 'input text ...',
            label: 'I am Error ...',
            error: true,
            info: 'I will always Error'
          },
          ['field-helper']: {
            placeholder: 'input text ...',
            label: 'Text with Helper',
            helper: 'This is standart text field with helper',
            fullWidth: true
          },
          ['field-select']: {
            type: 'select',
            placeholder: 'choose option ...',
            label: 'Select',
            fullWidth: true,
            options: [
              { label: 'option 1', value: 'option 1' },
              { label: 'option 2 is disabled', value: 'option 2', disabled: true },
              { label: 'option 3', value: 'option 3' }
            ]
          },
          ['field-radio']: {
            type: 'radio',
            label: 'Radio',
            row: true, // default false
            fullWidth: true,
            options: [
              { label: 'option 1', value: '1', labelPlacement: 'start' },
              { label: 'option 2 is disabled', value: '2', labelPlacement: 'top', disabled: true },
              { label: 'option 3', value: '3' } // default labelPlacement: 'end'
            ]
          },
          ['field-checkbox']: {
            type: 'checkbox',
            label: 'Check Box',
            fullWidth: true,
            option: {
              label: 'option 1',
              color: 'secondary'
            }
          },
          ['field-checkbox-group']: {
            type: 'checkbox-group',
            label: 'Check Box Group',
            fullWidth: true,
            row: true, // default false
            options: [
              { label: 'option 1', value: 'value 1', labelPlacement: 'start' },
              { label: 'option 2 is disabled', value: 'value 2', labelPlacement: 'top', disabled: true },
              { label: 'option 3', value: 'value 3' } // default labelPlacement: 'end'
            ]
          },
          ['field-submit']: {
            type: 'submit',
            label: 'Submit',
            float: true,
            color: 'primary',
            variant: 'contained'
          }
        }}
      />
    )
  }

  handleSubmit = form => {
    setTimeout(() => {
      // we don't need account_password_retype's value
      delete form.values.account_password_retype

      // do whatever with form.values ...

      form.handlers.setSubmitting(false)
    }, 3000)
  }
}

export default MyFormDemo
```
