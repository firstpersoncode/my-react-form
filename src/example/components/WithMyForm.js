import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import bankList from '../bankList'
import { withMyForm } from '../../index'

class WithMyForm extends Component {
  static propTypes = {
    handlers: PropTypes.object,
    values: PropTypes.object,
    errors: PropTypes.object,
    touched: PropTypes.object,
    isSubmitting: PropTypes.bool
  }

  constructor () {
    super()
  }

  componentDidMount () {
    this.initialValues({
      bank_name: '',
      account_number: 'should error on initialization',
      account_name: 'owner 1'
    }, true)
  }

  initialValues = (values, validate) => {
    const { handlers } = this.props

    for (let field in values) {
      if (values.hasOwnProperty(field) && values[field]) {
        values = {
          ...values,
          [field]: String(values[field])
        }
      }
    }

    handlers.setInitialValues(values, validate)
  }

  handleSubmit = () => {
    const { handlers } = this.props
    const submit = (form) => {
      console.log(form.values, form)
      setTimeout(() => handlers.setSubmitting(false), 3000)
    }
    // override bank_name validation rule temporary
    const options = {
      validation: {
        bank_name: {
          validate: val => true,
          error: ''
        }
      }
    }
    // pass override validation as options.validation params
    // now on form submit, bank_name is not required
    handlers.submitForm(submit, options)
  }

  handleBlur = () => {
    const { handlers } = this.props
    // override account_number validation rule temporary
    // now while typing, account_number wont check if the format is invalid
    // unless we submit and it will run the default validation rule
    handlers.validateField('account_number', {
      validate: val => val,
      error: 'Account number is required'
    })
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
        {'isValid: ' + isValid}
        <select
          name="bank_name"
          id="bank_name"
          value={values['bank_name']}
          onChange={handlers.onChange}
          onBlur={handlers.onBlur}
        >
          <option value=''>Choose Bank</option>
          {
            bankList.length
              ? bankList.map((bank, i) => (
                <option key={i} { ...bank }>{bank.name}</option>
              ))
              : null
          }
        </select>
        <br />
        {
          touched['bank_name'] && errors['bank_name']
            ? errors['bank_name'] : ''
        }
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <input
          // type="number"
          placeholder="account number"
          name="account_number"
          id="account_number"
          value={values['account_number']}
          onChange={handlers.onChange}
          // onBlur={handlers.onBlur}
          onBlur={this.handleBlur}
        />
        <br />
        {
          touched['account_number'] && errors['account_number']
            ? errors['account_number'] : ''
        }
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <input
          placeholder="account name"
          name="account_name"
          id="account_name"
          value={values['account_name']}
          onChange={handlers.onChange}
          onBlur={handlers.onBlur}
        />
        <br />
        {
          touched['account_name'] && errors['account_name']
            ? errors['account_name'] : ''
        }
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />

        <button
          onClick={this.handleSubmit}
          disabled={isSubmitting}>
          { isSubmitting ? 'please wait ...' : 'save' }
        </button>
      </Fragment>
    )
  }
}

export const numInputValidator = (value, min = 8, max = 20) => {
  return value.toString().trim() &&
    !isNaN(value.toString().trim()) &&
    value.toString().trim().length > min &&
    value.toString().trim().length <= max
}

export default withMyForm({
  validation: {
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
    }
  },
  scrollOnError: true
})(WithMyForm)
