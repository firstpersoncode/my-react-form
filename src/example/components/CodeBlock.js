import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokaiSublime } from 'react-syntax-highlighter/dist/styles/hljs'
import Typography from '@material-ui/core/Typography'

const CodeBlock = ({ value, language }) => {
  return (
    <Typography>
      <SyntaxHighlighter
        customStyle={{
          margin: 0
        }}
        style={monokaiSublime} language='javascript'>
        {value}
      </SyntaxHighlighter>
    </Typography>
  )
}

export default CodeBlock
