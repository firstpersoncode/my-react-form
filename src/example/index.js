import 'babel-polyfill'
import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Star from '@material-ui/icons/Star'

import './index.css'
import './highlight.css'
import githubIcon from './GitHub-Mark-Light-32px.png'

// demos
import MyFormBasicDemo from './components/MyFormBasicDemo'
import MyFormDemo from './components/MyFormDemo'
import MyFormStaticDemo from './components/MyFormStaticDemo'
import WithMyFormDemo from './components/WithMyFormDemo'

import { scrollTo } from '../utils/auto-scroll'

class Example extends Component {
  static propTypes = {}

  state = {
    expanded: null
  }

  handleExpandClick = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  scrollDown = () => {
    scrollTo('first-demo', 0)
  }

  render () {
    const { expanded } = this.state
    return (
      <Fragment>
        <a className="github-fork-ribbon"
          href="https://github.com/firstpersoncode/my-react-form" target="_blank"
          data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography style={{ textAlign: 'center' }}>
            <h1>
              <a href="https://www.npmjs.com/package/my-react-form" target="_blank">
                My React Form <small>0.1.3</small>
              </a>
            </h1>
            <h3>Yeah, it could be your form as well, why not.</h3>
            <hr />
            <p><Star fontSize="small" /><strong>Guest Star:</strong> <a href="https://material-ui.com" target="_blank">MaterialUI</a> Components !</p>
            <br />
            <IconButton variant="contained" color="primary" onClick={this.scrollDown} aria-label="Delete">
              <ExpandMoreIcon fontSize="large" />
            </IconButton>
          </Typography>
        </div>
        <div id="first-demo" style={{
          minHeight: '100vh',
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center'
        }}>
          <ExpansionPanel
            style={{ background: expanded === 'MyFormBasicDemo' ? '#FFF' : '#000', border: '1px solid #666' }}
            expanded={expanded === 'MyFormBasicDemo'} onChange={this.handleExpandClick('MyFormBasicDemo')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: expanded === 'MyFormBasicDemo' ? '#000' : '#FFF' }} />}>
              <Typography style={{
                color: expanded === 'MyFormBasicDemo' ? '#000' : '#FFF', display: 'flex',
                justifyContent: 'space-evenly'
              }}>
                <pre>
                  render method: pass function that return "form object" into props "form"<br />
                  <code>
                    eg: {
`
<MyForm
  form={form => {
    const { handlers, values, ... } = form
    return (
      <Fragment>
        <Field onChange={handlers.onChange} onBlur={handlers.onBlur} />
        <Field name="field-2" value={values['field-2']} />
        <Field ... />
        ...
      </Fragment>
    )
}} />`
                    }
                  </code>
                </pre>
                <ul>
                  <li>provide Validator &#10004;</li>
                  <li>Validation on mount</li>
                  <li>initialValues &#10004;</li>
                  <li>scroll on Error while submit &#10004;</li>
                  <li>onSubmit handler &#10004;</li>
                  <li>onUpdate handler &#10004;</li>
                </ul>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ flexGrow: 1, background: '#555', padding: 15, overFlow: 'hidden' }}>
                <MyFormBasicDemo />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            style={{ background: expanded === 'MyFormDemo' ? '#FFF' : '#000', border: '1px solid #666' }}
            expanded={expanded === 'MyFormDemo'} onChange={this.handleExpandClick('MyFormDemo')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: expanded === 'MyFormDemo' ? '#000' : '#FFF' }} />}>
              <Typography style={{
                color: expanded === 'MyFormDemo' ? '#000' : '#FFF', display: 'flex',
                justifyContent: 'space-evenly'
              }}>
                <pre>
                  render method: children render props<br />
                  <code>
                    eg: {
`
<MyForm>
  {
    props => {
      const { handlers, values, ... } = props
      return (
        <Fragment>
          <Field onChange={handlers.onChange} onBlur={handlers.onBlur} />
          <Field name="field-2" value={values['field-2']} />
          <Field ... />
          ...
        </Fragment>
      )
    }
  }
</MyForm>`
                    }
                  </code>
                </pre>
                <ul>
                  <li>provide Validator &#10004;</li>
                  <li>Validation on mount &#10004;</li>
                  <li>initialValues &#10004;</li>
                  <li>scroll on Error while submit &#10004;</li>
                  <li>onSubmit handler &#10004;</li>
                  <li>onUpdate handler &#10004;</li>
                </ul>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ flexGrow: 1, background: '#555', padding: 15, overFlow: 'hidden' }}>
                <MyFormDemo />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            style={{ background: expanded === 'MyFormStaticDemo' ? '#FFF' : '#000', border: '1px solid #666' }}
            expanded={expanded === 'MyFormStaticDemo'} onChange={this.handleExpandClick('MyFormStaticDemo')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: expanded === 'MyFormStaticDemo' ? '#000' : '#FFF' }} />}>
              <Typography style={{
                color: expanded === 'MyFormStaticDemo' ? '#000' : '#FFF', display: 'flex',
                justifyContent: 'space-evenly'
              }}>
                <pre>
                  render method: object of fields |<br />
                  <code>
                    eg: {
`
<MyForm
  form={{
    field_1: {
      type: 'email',
      label: 'Field 1',
      ...
    },
    field_2: {
      type: 'password',
      label: 'Field 2',
      ...
    },
    ...
  }} />`
                    }
                  </code>
                </pre>
                <pre>
                  | render method: Array of fields<br />
                  <code>
                    eg: {
`
<MyForm
  form={[
    {
      name: 'field_1',
      type: 'email',
      label: 'Field 1',
      ...
    },
    {
      name: 'field_2',
      type: 'password',
      label: 'Field 2',
      ...
    },
    ...
  ]} />`
                    }
                  </code>
                </pre>
                <ul>
                  <li>provide Validator &#10004;</li>
                  <li>Validation on mount</li>
                  <li>initialValues</li>
                  <li>scroll on Error while submit &#10004;</li>
                  <li>onSubmit handler &#10004;</li>
                  <li>onUpdate handler &#10004;</li>
                </ul>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ flexGrow: 1, background: '#555', padding: 15, overFlow: 'hidden' }}>
                <MyFormStaticDemo />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            style={{ background: expanded === 'WithMyFormDemo' ? '#FFF' : '#000', border: '1px solid #666' }}
            expanded={expanded === 'WithMyFormDemo'} onChange={this.handleExpandClick('WithMyFormDemo')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: expanded === 'WithMyFormDemo' ? '#000' : '#FFF' }} />}>
              <Typography style={{
                color: expanded === 'WithMyFormDemo' ? '#000' : '#FFF', display: 'flex',
                justifyContent: 'space-evenly'
              }}>
                <pre>
                  render method: with HOC<br />
                  <code>
                    eg: {
`
class MyComponent extends React.Component {
  render () {
    const { handlers, values, ... } = this.props
    return (
      <Fragment>
        <Field onChange={handlers.onChange} onBlur={handlers.onBlur} />
        <Field name="field-2" value={values['field-2']} />
        <Field ... />
        ...
      </Fragment>
    )
  }
}

export default withMyForm({ ...configs })(MyComponent)
`
                    }
                  </code>
                </pre>
                <ul>
                  <li>provide Validator &#10004;</li>
                  <li>Validation on mount &#10004;</li>
                  <li>initialValues &#10004;</li>
                  <li>scroll on Error while submit &#10004;</li>
                  <li>onSubmit handler (manually handle submit with handlers.submitForm(cb, options))</li>
                  <li>onUpdate handler</li>
                </ul>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ flexGrow: 1, background: '#555', padding: 15, overFlow: 'hidden' }}>
                <WithMyFormDemo />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <footer style={{
          // position: 'fixed',
          // width: '100%',
          // bottom: 0,
          // padding: 15,
          background: '#333',
          color: '#FFF',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <a href="https://github.com/firstpersoncode/my-react-form" target="_blank">
            <img src={githubIcon} alt="Github" />
          </a>
          <p>this is footer ...</p>
        </footer>
      </Fragment>
    )
  }
}

render(
  <Example />,
  document.getElementById('root')
)
