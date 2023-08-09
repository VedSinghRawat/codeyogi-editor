import { Dispatch, FC, Fragment, memo, ReactElement, SetStateAction } from 'react'
import { Tab as HeadLessTab } from '@headlessui/react'
import { useGetCodeStates } from '../../../../Hooks/Exercise/CodingExercisePage/useGetCodeStates'
import { LangNames } from '../../../../Models/ProgrammingLanguage'
import CSSCodeEditor from './CodeEditor/CSSCodeEditor'
import HTMLCodeEditor from './CodeEditor/HTMLCodeEditor'
import JSCodeEditor from './CodeEditor/JSCodeEditor'

interface CodeEditorPanelsProps {
  codeStateMap: ReturnType<typeof useGetCodeStates>
}

const PanelMapping: { [lang in LangNames]: (args: [string, Dispatch<SetStateAction<string>>]) => ReactElement } = {
  html: ([value, setValue]) => <HTMLCodeEditor value={value} setValue={setValue} />,
  css: ([value, setValue]) => <CSSCodeEditor value={value} setValue={setValue} />,
  js: ([value, setValue]) => <JSCodeEditor value={value} setValue={setValue} />,
}

const CodeEditorPanels: FC<CodeEditorPanelsProps> = ({ codeStateMap }) => {
  return (
    <HeadLessTab.Panels as={Fragment}>
      {Object.keys(codeStateMap).map((lang) => (
        <HeadLessTab.Panel key={lang} as={Fragment}>
          {PanelMapping[lang as LangNames](codeStateMap[lang as LangNames]!)}
        </HeadLessTab.Panel>
      ))}
    </HeadLessTab.Panels>
  )
}

export default memo(CodeEditorPanels)
