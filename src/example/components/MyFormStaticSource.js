import React, { Fragment } from 'react'
import CodeBlock from './CodeBlock'

const header = `import React, { Component, Fragment } from 'react'
import MyForm, { Field } from 'my-react-form'

import bankList from '../bankList'
import randomQuotes from '../randomQuotes'

const validation = {
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
}`
const handler = `
  state = {
    submitted: null,
    randomQuotes: ''
  }

  handleSubmit = form => {
    setTimeout(() => {
      // don't need the account_password_retype value
      delete form.values.account_password_retype

      // do whatever with the form.values ...
      this.setState({ submitted: form.values })

      form.handlers.setSubmitting(false)
    }, 3000)
  }

  handleUpdate = form => {
    // will triggered whenever form is updated
    this.setState({ randomQuotes: randomQuotes[Math.floor((Math.random() * 10) + 1) - 1] })
  }`
const footer = `
function numInputValidator (value) {
  return value.toString().trim() &&
  !isNaN(value.toString().trim())
}

function emailInputValidator (email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export default MyFormDemo`

const MyFormStaticSource = () => {
  return (
    <Fragment>
      <CodeBlock
        value={`${header}
class MyFormDemo extends Component {`}
        />
      <CodeBlock
        value={handler} />
      <CodeBlock
        value={`
  render () {
    return (
      <Fragment>
        Random quotes generated whenever the form is updated
        {this.state.randomQuotes || randomQuotes[0]}
        <MyForm
          scrollOnError={true}
          withBaseCSS={true}
          validation={validation}
          onSubmit={this.handleSubmit}
          onUpdate={this.handleUpdate}`}
      />
      <CodeBlock
        value={`
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
            },`}
      />
      <CodeBlock
        value={`
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
              label: 'Save',
              // fullWidth: true,
              float: true,
              color: 'primary',
              variant: 'contained'
            }
          }}
        />
        {
          this.state.submitted
            ? JSON.stringify(this.state.submitted, undefined, 4)
            : null
        }
      </Fragment>
    )
  }`}
      />
      <CodeBlock
        language='javascript'
        value={`
}

${footer}`}
      />
    </Fragment>
  )
}

export default MyFormStaticSource
