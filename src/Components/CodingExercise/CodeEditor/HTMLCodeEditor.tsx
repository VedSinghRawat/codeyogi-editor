import { FC, memo } from 'react'
import CodeEditorWithKeyList, { CodeEditorWithKeyListProps } from './CodeEditorWithKeyList'
import 'codemirror/mode/xml/xml.js'

type HTMLCodeEditorProps = Omit<CodeEditorWithKeyListProps, 'keyList' | 'lang'>

const HTML_KEY_LIST = ['<', '>', '/', '=', '"']

const HTMLCodeEditor: FC<HTMLCodeEditorProps> = ({ ...rest }) => {
  return <CodeEditorWithKeyList {...rest} keyList={HTML_KEY_LIST} lang="html" />
}

export default memo(HTMLCodeEditor)
