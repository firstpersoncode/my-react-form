import { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { scrollTo } from './utils/auto-scroll'

class MyForm extends Component {
  static propTypes = {
    children: PropTypes.func,
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func,
    render: PropTypes.func || PropTypes.object,
    scrollOnError: PropTypes.bool,
    validateOnInit: PropTypes.bool,
    initialValues: PropTypes.object,
    validation: PropTypes.object
  }

  constructor(props) {
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
  }

  // private handlers
  _renderForm = () => {
    const { children, render } = this.props
    if (render) {
      return typeof render === 'function' ? render(this._returnForm()) : this._renderStaticForm(render)
    } else if (children) {
      return children(this._returnForm())
    } else {
      return null
    }
  }

  // TODO:
  _renderStaticForm = render => {
    return render
  }

  _returnForm = () => {
    const { onSubmit, onValidate } = this.props
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
        submitForm: this.submitForm,
        validateForm: this.validateForm,
        handleSubmit: null,
        handleValidate: null
      }
    }
    // only return handleSubmit if onSubmit props is provided
    if (onSubmit && typeof onSubmit === 'function') {
      form = update(form, {
        handlers: update(form.handlers, {
          handleSubmit: {
            $set: this.handleSubmit
          }
        })
      })
    }
    // only return handleValidate if onValidate props is provided
    if (onValidate && typeof onValidate === 'function') {
      form = update(form, {
        handlers: update(form.handlers, {
          handleValidate: {
            $set: this.handleValidate
          }
        })
      })
    }
    !form.handlers.handleSubmit && delete form.handlers.handleSubmit
    !form.handlers.handleValidate && delete form.handlers.handleValidate
    return form
  }

  _setformValidation = formValidation => this.setState({ formValidation })

  _validateField = async (field, validation) => {
    let initialValidation = this.state.formValidation[field]
    if (!validation && !initialValidation) {
      return
    }
    if (!validation && initialValidation) {
      validation = initialValidation
    }
    let valid = validation.validate(this.state.values[field])
    let errorMessage = !valid
      ? typeof validation.error === 'function'
        ? validation.error(this.state.values[field])
        : validation.error
      : false
    await this._setFieldError(field, errorMessage)
    await this._setIsValid()
  }

  _validateFields = async fields => {
    for (let field in fields) {
      if (fields.hasOwnProperty(field)) {
        await this._validateField(field, fields[field])
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
      await this._setFieldsTouched(fields)
      await this._validateFields(this.state.formValidation)
    }
  }

  validateField = async (field, validation) => {
    /*
    you can pass validation object as params to override the validation rule temporary
    eg: validateField(field, { validate: Function, error: Function || String })
    otherwise, will check if it has validation rule set for this field
    */
    await this._setFieldTouched(field, true)
    await this._validateField(field, validation)
  }

  setFieldValue = (field, value) => this._setFieldValue(field, value)

  setFieldError = (field, error) => this.setFieldError(field, error)

  setFieldTouched = (field, touch) => this._setFieldTouched(field, touch)

  setSubmitting = submit => this._setSubmitting(submit)

  onChange = e => {
    let field = e.id || e.name
      ? e.id || e.name
      : e.target.id || e.target.name
    let value = e.value
      ? e.value
      : e.target.value
    this._setFieldValue(field, value)
    this._validateField(field, this.state.formValidation[field])
    this._setFieldTouched(field, this.state.errors[field])
  }

  onBlur = e => {
    let field = e.id || e.name
      ? e.id || e.name
      : e.target.id || e.target.name
    this._setFieldTouched(field, true)
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

  handleSubmit = () => {
    const { onSubmit } = this.props
    this.submitForm(onSubmit)
  }

  handleValidate = () => {
    const { onValidate } = this.props
    this.validateForm(onValidate)
  }

  render() {
    console.log(this._renderForm, this._renderForm())
    return this._renderForm()
  }
}

export default MyForm
