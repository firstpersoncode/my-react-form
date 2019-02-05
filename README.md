### my-react-form
Just simple Form for React

#### Get Started:
Install `my-react-form` from `npm`
```bash
$ npm i my-react-form
```
Install `my-react-form` from `yarn`
```bash
$ yarn add my-react-form
```
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
