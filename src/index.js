import 'babel-polyfill'
import React, { Component } from 'react'
import MyForm from './MyForm'
export const withMyForm = ({
  validation,
  scrollOnError = false
}) => ChildComponent => class WithMyForm extends Component {
  render() {
    return (
      <MyForm
        scrollOnError={scrollOnError}
        validation={validation}
        render={form => <ChildComponent {...form} {...this.props} />} />
    )
  }
}
export default MyForm
