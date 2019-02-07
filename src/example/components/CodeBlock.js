import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { duotoneDark } from 'react-syntax-highlighter/dist/styles/prism'
import Typography from '@material-ui/core/Typography'

const CodeBlock = ({ source, language }) => {
  return (
    <div style={{
      maxHeight: '100%',
      overflow: 'auto'
    }}>
      <Typography>
        <SyntaxHighlighter
          customStyle={{ fontSize: 8 }}
          style={duotoneDark} language={language}>
          {source}
        </SyntaxHighlighter>
      </Typography>
    </div>
  )
}

export default CodeBlock
