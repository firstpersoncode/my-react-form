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
import githubIcon from './GitHub-Mark-Light-32px.png'

// demos
import MyFormBasicDemo from './components/MyFormBasicDemo'
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
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MyFormBasicDemo />
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
