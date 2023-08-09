import { Dispatch, FC, memo } from 'react'
import CodeEditor from './Base/CodeEditor'
import KeyList from './KeyList'

export interface CodeEditorWithKeyListProps {
  value: string
  setValue: Dispatch<React.SetStateAction<string>>
  keyList: string[]
  lang: 'html' | 'javascript' | 'css'
}

const CodeEditorWithKeyList: FC<CodeEditorWithKeyListProps> = ({ value, setValue, lang, keyList }) => {
  return (
    <>
      <CodeEditor value={value} setValue={setValue} lang={lang} />
      <KeyList keys={keyList} />
    </>
  )
}

export default memo(CodeEditorWithKeyList)
