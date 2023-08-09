import { FC, memo } from 'react'
import CodeEditorWithKeyList, { CodeEditorWithKeyListProps } from './CodeEditorWithKeyList'
import 'codemirror/mode/javascript/javascript.js'

type JSCodeEditorProps = Omit<CodeEditorWithKeyListProps, 'keyList' | 'lang'>

const JAVASCRIPT_KEY_LIST = ['(', ')', '{', '}', '[', ']', `"`, `'`, '`', '.', ',', '+', '-', '*', '/', '=', '%', '$', '!']

const JSCodeEditor: FC<JSCodeEditorProps> = ({ ...rest }) => {
  return <CodeEditorWithKeyList {...rest} keyList={JAVASCRIPT_KEY_LIST} lang="javascript" />
}

export default memo(JSCodeEditor)
