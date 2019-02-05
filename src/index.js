import 'babel-polyfill'
import React, { Component } from 'react'
import MyForm from './MyForm'
import Field from './Field'
const withMyForm = configs => ChildComponent => class WithMyForm extends Component {
  render() {
    return (
      <MyForm
        validation={configs.validation}
        onSubmit={configs.onSubmit}
        onUpdate={configs.onUpdate}
        scrollOnError={configs.scrollOnError}
        withBaseCSS={configs.withBaseCSS}
        form={form => <ChildComponent {...form} {...this.props} />} />
    )
  }
}
export { withMyForm, Field }
export default MyForm
