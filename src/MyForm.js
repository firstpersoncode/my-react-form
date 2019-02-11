import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import CssBaseline from '@material-ui/core/CssBaseline'

import { scrollTo } from './utils/auto-scroll'
import Field from './Field'

class MyForm extends Component {
  static propTypes = {
    children: PropTypes.func || PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    form: PropTypes.func || PropTypes.array || PropTypes.object,
    onUpdate: PropTypes.func,
    onSubmit: PropTypes.func,
    scrollOnError: PropTypes.bool,
    validateOnInit: PropTypes.bool,
    withBaseCSS: PropTypes.bool,
    initialValues: PropTypes.object,
    validation: PropTypes.object
  }

  // component life cycle handlers
  constructor (props) {
    super(props)
    this.state = {
      isValid: false,
      isSubmitting: false,
      values: {},
      errors: {},
      touched: {},
      formValidation: {}
    }
  }

  componentDidMount () {
    /*
    set form validation rules on initialization if props validation is provided
    each rule on field could be override temporary:
      while use 'validateField' you can pass validation object as params
      eg: validateField(field, { validate: Function, error: Function || String })

    set initialValues if props initialValues is provided
    validate form if validateOnInit is provided
    */
    const { initialValues, validation, validateOnInit } = this.props
    validation && this._setformValidation(validation)
    initialValues && Object.keys(initialValues).length && this.setInitialValues(initialValues, validateOnInit)
    this._validateFields(validation)
  }

  componentDidUpdate (prevProps, prevState) {
    const { onUpdate } = prevProps

    if (onUpdate && typeof onUpdate === 'function') {
      for (let state in prevState) {
        if (
          prevState.hasOwnProperty(state) &&
          this.state.hasOwnProperty(state)
        ) {
          if (
            typeof prevState[state] === 'object' &&
            prevState[state] && this.state[state]
          ) {
            for (let s in prevState[state]) {
              if (prevState[state][s] !== this.state[state][s]) {
                onUpdate(this._returnForm())
              }
            }
          } else if (
            prevState[state] && this.state[state] &&
            prevState[state] !== this.state[state]
          ) {
            onUpdate(this._returnForm())
          }
        }
      }
    }
  }

  render () {
    const { withBaseCSS } = this.props
    return (
      <Fragment>
        {withBaseCSS ? <CssBaseline /> : null}
        {this._renderForm()}
      </Fragment>
    )
  }

  // private handlers
  _renderForm = () => {
    const { children, form } = this.props
    if (form) {
      return typeof form === 'function' ? form(this._returnForm()) : this._renderStaticForm(form)
    } else if (children) {
      return typeof children === 'function' ? children(this._returnForm()) : children
    } else {
      return null
    }
  }

  _renderStaticForm = render => {
    const {
      errors,
      touched,
      values
    } = this.state
    const _configs = (field, key, fieldName = '') => update(field, updateField => {
      let name = field['name'] || field['id'] ||
        (fieldName && typeof fieldName === 'string' ? fieldName : 'field-' + key)
      if (!updateField['name'] || !updateField['id']) {
        updateField['name'] = name
        updateField['id'] = name
      }
      if (!updateField['value']) {
        updateField['value'] = values[name]
      }
      if (!updateField['onChange']) {
        if (updateField['type'] === 'checkbox-group') {
          updateField['onChange'] = this.onCheckGroup
        } else if (updateField['type'] === 'checkbox') {
          updateField['onChange'] = this.onCheck
        } else {
          updateField['onChange'] = this.onChange
        }
      }
      if (!updateField['onBlur']) {
        updateField['onBlur'] = this.onBlur
      }
      if (updateField['type'] === 'submit' && !updateField['onClick']) {
        updateField['onClick'] = this.handleSubmit()
      }
      if (updateField['type'] === 'submit') {
        updateField['disabled'] = this.state.isSubmitting
      }
      if (!updateField['error']) {
        updateField['error'] = touched[name] &&
          errors[name]
      }
      if (!updateField['info']) {
        updateField['info'] = touched[name] &&
          errors[name] &&
          errors[name]
      }
      return updateField
    })

    if (Array.isArray(render) && render.length) {
      return render.map((field, i) => {
        return (
          <Field
            key={i}
            {..._configs(field, i)}
          />
        )
      })
    } else if (!Array.isArray(render) && Object.keys(render).length) {
      return Object.keys(render).map((field, i) => {
        return (
          <Field
            key={i}
            {..._configs(render[field], i, field)}
          />
        )
      })
    }

    return
  }

  _returnForm = () => {
    const { onSubmit } = this.props
    let form = {
      values: this.state.values,
      errors: this.state.errors,
      touched: this.state.touched,
      isValid: this.state.isValid,
      isSubmitting: this.state.isSubmitting,
      handlers: {
        setSubmitting: this.setSubmitting,
        setInitialValues: this.setInitialValues,
        setFieldValue: this.setFieldValue,
        setFieldError: this.setFieldError,
        setFieldTouched: this.setFieldTouched,
        validateField: this.validateField,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onCheckGroup: this.onCheckGroup,
        submitForm: this.submitForm,
        validateForm: this.validateForm,
        handleSubmit: onSubmit && typeof onSubmit === 'function'
          ? this.handleSubmit
          : null,
        // handleUpdate: onUpdate && typeof onUpdate === 'function'
        //   ? this.handleUpdate
        //   : null
      }
    }

    !form.handlers.handleSubmit && delete form.handlers.handleSubmit
    // !form.handlers.handleUpdate && delete form.handlers.handleUpdate
    return form
  }

  _setformValidation = formValidation => this.setState({ formValidation })

  _validateField = async (field, validation) => {
    let initialValidation = this.state.formValidation[field]
    if (!validation && !initialValidation) {
      return this._setIsValid()
    }
    if (!validation && initialValidation) {
      validation = initialValidation
    }
    let valid = validation.validate(this.state.values[field])
    if (typeof valid === 'function') {
      valid = valid(this.state.values)
    }
    let errorMessage = !valid
      ? typeof validation.error === 'function'
        ? validation.error(this.state.values[field])
        : validation.error
      : false
    await this._setFieldError(field, errorMessage)
    this._setIsValid()
  }

  _validateFields = fields => {
    if (!fields) {
      return this._setIsValid()
    }
    for (let field in fields) {
      if (fields.hasOwnProperty(field)) {
        this._validateField(field, fields[field])
      }
    }
  }

  _setIsValid = () => {
    let errorField = Object.keys(this.state.errors).length
    this.setState({ isValid: errorField ? false : true })
  }

  _setFieldsTouched = fields => {
    for (let field in fields) {
      if (fields.hasOwnProperty(field)) {
        this._setFieldTouched(field, true)
      }
    }
  }

  _setFieldsValue = fields => {
    for (let field in fields) {
      if (fields.hasOwnProperty(field) && fields[field]) {
        this._setFieldValue(field, fields[field])
      }
    }
  }

  _setFieldValue = (field, value) => {
    this.setState(state => update(state, {
      values: values => update(values, {
        [field]: {
          $set: value
        }
      })
    }))
  }

  _setFieldError = (field, error) => {
    this.setState(state => {
      let errors = update(state.errors, {
        [field]: {
          $set: error
        }
      })
      !errors[field] && delete errors[field]
      return { errors }
    })
  }

  _setFieldTouched = (field, touch) => {
    this.setState(state => {
      let touched = update(state.touched, {
        [field]: {
          $set: touch
        }
      })
      !touched[field] && delete touched[field]
      return { touched }
    })
  }

  _setSubmitting = submit => this.setState({ isSubmitting: submit })

  // public handlers
  setInitialValues = async (fields, validate) => {
    await this._setFieldsValue(fields)
    if (validate) {
      await this._setFieldsTouched(this.state.formValidation)
      this._validateFields(this.state.formValidation)
    }
  }

  validateField = async (field, validation) => {
    /*
    you can pass validation object as params to override the validation rule temporary
    eg: validateField(field, { validate: Function, error: Function || String })
    otherwise, will check if it has validation rule set for this field
    */
    await this._setFieldTouched(field, true)
    this._validateField(field, validation)
  }

  setFieldValue = (field, value) => this._setFieldValue(field, value)

  setFieldError = (field, error) => this._setFieldError(field, error)

  setFieldTouched = (field, touch) => this._setFieldTouched(field, touch)

  setSubmitting = submit => this._setSubmitting(submit)

  onChange = async e => {
    let field = e.id || e.name
      ? e.id || e.name
      : e.target.id || e.target.name
    let value = e.value
      ? e.value
      : e.target.value
    await this._setFieldValue(field, value)
    await this._validateField(field, this.state.formValidation[field])
    this._setFieldTouched(field, this.state.errors[field] ? true : false)
  }

  onCheck = async e => {
    let field = e.id || e.name
      ? e.id || e.name
      : e.target.id || e.target.name
    let value = e.checked
      ? e.checked
      : e.target.checked
    await this._setFieldValue(field, value)
    await this._validateField(field, this.state.formValidation[field])
    this._setFieldTouched(field, this.state.errors[field] ? true : false)
  }

  onCheckGroup = async e => {
    let field = e.id || e.name
      ? e.id || e.name
      : e.target.id || e.target.name
    let value = e.value
      ? e.value
      : e.target.value
    let checked = e.checked
      ? e.checked
      : e.target.checked
    let values = this.state.values[field] || []
    if (checked) {
      values = update(values, { $push: [value] })
    } else {
      values = update(values, { $splice: [[values.indexOf(value), 1]] })
    }
    await this._setFieldValue(field, values)
    await this._validateField(field, this.state.formValidation[field])
    this._setFieldTouched(field, this.state.errors[field] ? true : false)
  }

  onBlur = async e => {
    let field = e.id || e.name
      ? e.id || e.name
      : e.target.id || e.target.name
    await this._setFieldTouched(field, true)
    this._validateField(field, this.state.formValidation[field])
  }

  submitForm = async (cb, options) => {
    /*
    we can override isValid checking
    by passing options.isValid
    and also override formValidation
    by passing options.validation while calling submitForm
    eg: options = {
      isValid: true, // set to always true on submit form
      validation: { // set temporary validation rules for field1 and field2
        field1: {
          validate: Function,
          error: Function || String
        },
        field2: {
          validate: Function,
          error: Function || String
        }
      }
    }
    submitForm(cb, options)
    */
    await this._setSubmitting(true)
    await this.validateForm(null, options)
    let isValid = this.state.isValid
    if (options && options.hasOwnProperty('isValid')) {
      isValid = options.isValid
    }
    if (!isValid) {
      this._setSubmitting(false)
      return false
    }
    return cb && typeof cb === 'function'
      ? cb(this._returnForm())
      : this._returnForm()
  }

  validateForm = async (cb, options) => {
    /*
    we can override formValidation
    to set temporary validation rules for field1 and field2
    by passing options.validation when calling validateForm
    and we can also override isValid checking
    by passing options.isValid
    eg: options = {
      validation: {
        field1: {
          validate: Function,
          error: Function || String
        },
        field2: {
          validate: Function,
          error: Function || String
        }
      }
    }
    validateForm(cb, options)
    */
    const { scrollOnError } = this.props
    let formValidation = this.state.formValidation
    if (options && options.hasOwnProperty('validation')) {
      formValidation = {
        ...formValidation,
        ...options.validation
      }
    }
    await this._setFieldsTouched(formValidation)
    await this._validateFields(formValidation)
    let isValid = this.state.isValid
    if (options && options.hasOwnProperty('isValid')) {
      isValid = options.isValid
    }
    if (!isValid) {
      let errorField = Object.keys(this.state.errors).length && Object.keys(this.state.errors)[0]
      this.state.isSubmitting && scrollOnError && scrollTo(errorField, 100)
      return false
    }
    return cb && typeof cb === 'function' ? cb(this._returnForm()) : this._returnForm()
  }

  handleSubmit = options => () => {
    const { onSubmit } = this.props
    this.submitForm(onSubmit, options)
  }

  // handleUpdate = options => () => {
  //   const { onUpdate } = this.props
  //   this.validateForm(onUpdate, options)
  // }
}

export default MyForm
