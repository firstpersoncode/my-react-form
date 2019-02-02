import 'babel-polyfill'
import React, { Component } from 'react'
import MyForm from './MyForm'
export const withMyForm = configs => ChildComponent => class WithMyForm extends Component {
  render() {
    return (
      <MyForm
        validation={configs.validation}
        onSubmit={configs.onSubmit}
        onValidate={configs.onValidate}
        scrollOnError={configs.scrollOnError}
        render={form => <ChildComponent {...form} {...this.props} />} />
    )
  }
}
export default MyForm
