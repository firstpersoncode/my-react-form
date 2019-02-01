import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import bankList from './bankList'
import { withMyForm } from '../index'

class ExampleForm extends Component {
  static propTypes = {
    handlers: PropTypes.object,
    values: PropTypes.object,
    errors: PropTypes.object,
    touched: PropTypes.object,
    isSubmitting: PropTypes.bool
  }

  componentDidMount () {
    this.initialValues({
      bank_name: '',
      account_number: '',
      account_name: 'owner'
    })
  }

  initialValues = values => {
    const { handlers } = this.props

    for (let field in values) {
      if (values.hasOwnProperty(field) && values[field]) {
        values = {
          ...values,
          [field]: String(values[field])
        }
      }
    }

    handlers.setFieldValues(values)
  }

  handleSubmit = () => {
    const { handlers } = this.props
    const submit = form => {
      console.log(form.values, form)
      setTimeout(() => handlers.setSubmitting(false), 3000)
    }
    handlers.submitForm(submit)
  }

  render() {
    const {
      values,
      errors,
      touched,
      isSubmitting,
      handlers
    } = this.props
    return (
      <Fragment>
        <select
          name="bank_name"
          id="bank_name"
          value={values['bank_name']}
          onChange={handlers.onChange}
          onBlur={handlers.onBlur}
        >
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
          onBlur={handlers.onBlur}
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

        <button primary block large
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
        : 'Account number should be nymber with minimum 8 characters and maximum 20 characters'
    },
    account_name: {
      validate: val => val,
      error: 'account name is required'
    }
  },
  scrollOnError: true
})(ExampleForm)
