import { FC, memo, useCallback } from 'react'
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { less } from '@codemirror/lang-less'
import { html } from '@codemirror/lang-html'
import { tokyoNightStormInit } from '@uiw/codemirror-theme-tokyo-night-storm'
import { tags as t } from '@lezer/highlight'
import jsLinter from './jsLint'
import { Diagnostic } from '@codemirror/lint'

export interface CodeEditorProps extends Omit<ReactCodeMirrorProps, 'onChange'> {
  value: string
  setValue: (value: string) => void
  lang: 'html' | 'javascript' | 'css'
  editorRefAction: typeof editorRefAction
  editorErrorsAction: typeof editorErrorsAction
  editorRef: ReturnType<typeof editorRefSelector>
}

const CodeEditor: FC<CodeEditorProps> = ({ value, editorErrorsAction, editorRefAction, editorRef, lang, setValue, className = '', ...rest }) => {
  const handleLintErrors = useCallback(
    (errors: Diagnostic[]) => {
      if (!editorRef) return

      const err = errors.reduce((curr, { from, message, severity, to }) => {
        const startLineNumber = editorRef.state.doc.lineAt(from).number
        const endLineNumber = editorRef.state.doc.lineAt(to).number

        const errorMessage = `> &nbsp;${message} from line ${startLineNumber} ---- to ${endLineNumber}`
        return severity === 'error'
          ? (curr += `${errorMessage} </br>`)
          : (curr += `<span style="color: #FFDC1F" > &nbsp;${errorMessage}</span> </br>`)
      }, '')

      editorErrorsAction({ val: err })
    },
    [editorRef]
  )

  return (
    <CodeMirror
      {...rest}
      onCreateEditor={(view) => editorRefAction({ val: view })}
      className={`sm:text-xl text-sm h-full ${className}`}
      value={value}
      theme={tokyoNightStormInit({ settings: { foreground: '#2ac3de' }, styles: [{ tag: [t.typeName], color: '#2769A2', fontStyle: '#2769A2' }] })}
      extensions={lang === 'javascript' ? [javascript(), jsLinter(handleLintErrors)] : lang === 'css' ? [less()] : [html()]}
      onChange={(value) => setValue(value)}
    />
  )
}

const mapStateToProps = (state: AppState) => ({
  editorRef: editorRefSelector(state),
})

const matchDispatchToProps = {
  editorRefAction,
  editorErrorsAction,
}

export default memo(connect(mapStateToProps, matchDispatchToProps)(CodeEditor))
