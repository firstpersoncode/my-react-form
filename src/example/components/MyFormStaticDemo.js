import React, { Component, Fragment } from 'react'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import bankList from '../bankList'
import randomQuotes from '../randomQuotes'
import MyForm from '../../index'

import MyFormStaticSource from './MyFormStaticSource'

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
}

class MyFormStaticDemo extends Component {
  state = {
    source: false,
    data: true,
    submitted: null,
    randomQuotes: ''
  }

  handleExpandClick = panel => () => {
    this.setState(state => ({ [panel]: !state[panel] }));
  }

  syntaxHighlight = json => {
    let syntax = {
      ...json
    }
    delete syntax.handlers
    syntax = JSON.stringify(syntax, undefined, 4)
    return (
      <pre
        style={{
          outline: '1px solid #ccc',
          padding: 5,
          wordWrap: 'break-word'
        }}
        dangerouslySetInnerHTML={{
          __html: syntax
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(
              /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
              match => {
              let color = 'darkorange'
              if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                  color = 'red'
                } else {
                  color = 'green'
                }
              } else if (/true|false/.test(match)) {
                color = 'blue'
              } else if (/null/.test(match)) {
                color = 'magenta'
              }
              return '<span style="color: '+color+';display: '+(match === '"handlers":' ? "none" : "inline")+';">'+match+'</span>'
            })
        }}
      />
    )
  }

  renderSource = () => {
    return (
      <pre style={{
        outline: '1px solid #ccc',
        padding: 5,
        wordWrap: 'break-word'
      }}>
        <MyFormStaticSource />
      </pre>
    )
  }

  renderHelpPanel = (panel, data, name = 'form') => {
    return (
      <div style={{
        cursor: 'pointer'
      }} onClick={this.handleExpandClick(panel)}>
        <span style={{
          float: 'left',
          padding: 5
        }}>
          <i>{panel === 'data' ? name : 'source code'}</i>
        </span>
        <ExpandMoreIcon style={{
          float: 'right',
          transform: this.state[panel] ? 'rotate(180deg)' : 'rotate(0deg)'
        }} />
        <div style={{ clear: 'both' }} />
        <Collapse in={this.state[panel]} timeout="auto" unmountOnExit>
          {
            panel === 'data'
              ? this.syntaxHighlight(data)
              : this.renderSource()
          }
        </Collapse>
        {
          !this.state[panel] ? <hr /> : null
        }
      </div>
    )
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

  render() {
    return (
      <Fragment>
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
          <MyForm
            scrollOnError={true}
            withBaseCSS={true}
            validation={validation}
            onSubmit={this.handleSubmit}
            onUpdate={this.handleUpdate}
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
              ? this.renderHelpPanel('data', this.state.submitted, 'submitted data')
              : null
          }
        </div>
        <div style={{
          padding: 15,
          margin: '15px 0',
          background: '#FFF'
        }}>
          {this.renderHelpPanel('source')}
        </div>
      </Fragment>
    )
  }
}

export default MyFormStaticDemo
