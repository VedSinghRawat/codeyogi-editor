import { FC, memo } from 'react'
import CodeEditorWithKeyList, { CodeEditorWithKeyListProps } from './CodeEditorWithKeyList'
import 'codemirror/mode/css/css.js'

type CSSCodeEditorProps = Omit<CodeEditorWithKeyListProps, 'keyList' | 'lang'>

const CSS_KEY_LIST = ['.', '{', '}', '#']

const CSSCodeEditor: FC<CSSCodeEditorProps> = ({ ...rest }) => {
  return <CodeEditorWithKeyList {...rest} keyList={CSS_KEY_LIST} lang="css" />
}

export default memo(CSSCodeEditor)
