import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import smoothScroll from 'smoothscroll'

class MyForm extends Component {
  static propTypes = {
    onValidate: PropTypes.func,
    onSubmit: PropTypes.func,
    render: PropTypes.func,
    scrollOnError: PropTypes.bool,
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
    const { initialValues, validation } = this.props

    if (validation) {
      this.setValidation(validation)
    }

    if (initialValues && Object.keys(initialValues).length) {
      this.setFieldValues(initialValues)
    }
  }

  returnForm = () => {
    const { onSubmit, onValidate, validation } = this.props
    let form = {
      values: this.state.values,
      errors: this.state.errors,
      touched: this.state.touched,
      isValid: this.state.isValid,
      isSubmitting: this.state.isSubmitting,
      handlers: {
        setValid: this.setValid,
        setSubmitting: this.setSubmitting,
        setFieldValid: this.setFieldValid,
        setFieldValues: this.setFieldValues,
        setFieldValue: this.setFieldValue,
        setFieldError: this.setFieldError,
        setFieldTouched: this.setFieldTouched,
        onChange: this.onChange,
        onBlur: this.onBlur,
        submitForm: this.submitForm,
        validateForm: this.validateForm
      }
    }

    if (!validation) {
      form = {
        ...form,
        handlers: {
          ...form.handlers,
          setValidation: this.setValidation
        }
      }
    }

    if (onSubmit && typeof onSubmit === 'function') {
      form = {
        ...form,
        handlers: {
          ...form.handlers,
          handleSubmit: this.handleSubmit
        }
      }
    }

    if (onValidate && typeof onValidate === 'function') {
      form = {
        ...form,
        handlers: {
          ...form.handlers,
          handleValidate: this.handleValidate
        }
      }
    }

    return form
  }

  offset = id => {
    if (!window || !document) {
      return
    }
    let el = document.getElementById(id)
    if (!el) {
      return
    }
    let rect = el.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return rect.top + scrollTop
  }

  setValidation = formValidation => {
    this.setState({ formValidation })
  }

  setValid = valid => {
    this.setState({ isValid: valid })
  }

  setSubmitting = submit => {
    this.setState({ isSubmitting: submit })
  }

  setFieldValid = (field, { validate, error }) => {
    let valid = validate(this.state.values[field])
    if (!valid) {
      this.setFieldError(
        field,
        typeof error === 'function'
          ? error(this.state.values[field])
          : error
      )
    } else {
      this.setFieldError(field, false)
    }
  }

  setFieldValues = (values, validate) => {
    for (let field in values) {
      if (values.hasOwnProperty(field) && values[field]) {
        this.setFieldValue(field, values[field])
        if (validate) {
          this.setFieldTouched(field, true)
          if (this.state.formValidation[field]) {
            this.setFieldValid(field, this.state.formValidation[field])
          }
        }
      }
    }
  }

  setFieldValue = (field, value, validate) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [field]: value
      }
    }), () => {
      if (validate) {
        this.setFieldTouched(field, true)
        if (this.state.formValidation[field]) {
          this.setFieldValid(field, this.state.formValidation[field])
        }
      }
    })
  }

  setFieldError = (field, error) => {
    this.setState(state => {
      let errors = state.errors
      errors = {
        ...errors,
        [field]: error
      }
      if (!errors[field]) {
        delete errors[field]
      }
      return { errors }
    })
  }

  setFieldTouched = (field, touch) => {
    this.setState(state => {
      let touched = state.touched
      touched = {
        ...touched,
        [field]: touch
      }
      if (!touched[field]) {
        delete touched[field]
      }
      return { touched }
    })
  }

  onChange = e => {
    let field = e.id || e.name
      ? e.id || e.name
      : e.target.id || e.target.name
    let value = e.value
      ? e.value
      : e.target.value

    this.setFieldTouched(field, false)
    this.setFieldValue(field, value)
  }

  onBlur = e => {
    let field = e.id || e.name
      ? e.id || e.name
      : e.target.id || e.target.name

    this.setFieldTouched(field, true)
    if (this.state.formValidation[field]) {
      this.setFieldValid(field, this.state.formValidation[field])
    }
  }

  submitForm = async cb => {
    await this.setSubmitting(true)
    await this.validateForm()

    if (this.state.isValid) {
      if (cb && typeof cb === 'function') {
        return cb(this.returnForm())
      } else {
        return this.returnForm()
      }
    } else {
      this.setSubmitting(false)
    }
  }

  validateForm = async cb => {
    const { scrollOnError } = this.props

    for (let field in this.state.formValidation) {
      if (this.state.formValidation.hasOwnProperty(field)) {
        await this.setFieldValid(field, this.state.formValidation[field])

        if (this.state.isSubmitting) {
          await this.setFieldTouched(field, true)
        }
      }
    }

    if (Object.keys(this.state.errors).length) {
      await this.setValid(false)
      if (
        this.state.isSubmitting &&
        scrollOnError
      ) {
        let errorField = Object.keys(this.state.errors)[0]
        return smoothScroll(this.offset(errorField) - 100)
      }
    } else {
      await this.setValid(true)
    }

    if (cb && typeof cb === 'function') {
      return cb(this.returnForm())
    } else {
      return this.returnForm()
    }
  }

  handleSubmit = () => {
    const { onSubmit } = this.props
    this.submitForm(onSubmit)
  }

  handleValidate = () => {
    const { onValidate } = this.props
    if (onValidate && typeof onValidate === 'function') {
      this.validateForm(onValidate)
    } else {
      this.validateForm()
    }
  }

  handleRenderComponent = form => {
    const { children, render } = this.props
    if (render) {
      return render(form)
    } else if (children) {
      return children(form)
    } else {
      return null
    }
  }

  render() {
    return (
      <Fragment>
        {
          this.handleRenderComponent(this.returnForm())
        }
      </Fragment>
    )
  }
}

export default MyForm
