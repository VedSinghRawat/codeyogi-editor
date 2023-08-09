import { Menu } from '@headlessui/react'
import { FC, useEffect, useState, memo } from 'react'
import { isMobile } from 'react-device-detect'
import { AiFillEye, AiFillQuestionCircle } from 'react-icons/ai'
import { FaWrench } from 'react-icons/fa'
import CodeEditorPanels from '../Components/CodingExercise/CodeEditorPanels'
import CodingExerciseToolbar from '../Components/CodingExercise/CodingExerciseToolbar'
import CodingPreview from '../Components/CodingExercise/CodingPreview'
import DebugTools from '../Components/CodingExercise/DebugTools'
import ProgrammingLanguageTabList from '../Components/CodingExercise/ProgrammingLanguageTabList'
import ButtonTertiary from '../Components/UI/Buttons/Button.Tertiary'
import Dropdown from '../Components/UI/Dropdown/Dropdown'
import DropdownItem from '../Components/UI/Dropdown/DropdownItem'
import DropdownItemList from '../Components/UI/Dropdown/DropdownItemList'
import ScreenLoading from '../Components/UI/Loading/ScreenLoading'
import ConfirmationPopup from '../Components/UI/Popups/ConfirmationPopup'
import ExerciseDetailPopup from '../Components/UI/Popups/ExerciseDetailPopup'
import { useGetCodingExerciseData } from '../Hooks/CodingExercisePage/useGetCodingExerciseData'
import { Exercise } from '../Models/Exercise'
import { LangIds, LangNameMap } from '../Models/ProgrammingLanguages'
import { ExerciseSubmission, TestResult } from '../Models/ExerciseSubmission'
import { Tab as HeadLessTab } from '@headlessui/react'

interface CodingExerciseProps {
  exercise?: Exercise
  programmingLanguageIds: LangIds[]
  exerciseSubmission?: ExerciseSubmission
  submitTry: (data: { code: LangNameMap; exerciseId: number }) => void
  saveProgressTry: (data: { code: LangNameMap; exerciseId: number }) => void
  nextLink: string
  previousLink: string
  syntaxErrorsSet: (errors: string) => void
  isSubmitting: boolean
  saveProgressLoading: boolean
  testResults: LangNameMap<TestResult>
}

export const CodingExercise: FC<CodingExerciseProps> = ({
  exercise,
  isSubmitting,
  saveProgressLoading,
  programmingLanguageIds,
  saveProgressTry,
  submitTry,
  exerciseSubmission,
  nextLink,
  previousLink,
  syntaxErrorsSet,
  testResults,
}) => {
  if (!exercise) return <ScreenLoading />
  useEffect(() => {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    })
  }, [])

  const {
    selectedIndex,
    setSelectedIndex,
    isPreviewOpen,
    togglePreview,
    codeStateMap,
    isConsoleOpen,
    setIsConsoleOpen,
    childSrcLogs,
    setChildSrcLogs,
    selectedDebugTabIndex,
    setSelectedDebugTabIndex,
    setCustomViewport,
  } = useGetCodingExerciseData(programmingLanguageIds, syntaxErrorsSet, exerciseSubmission ? exerciseSubmission.code : exercise?.init_code)

  const [isExerciseDetailPopupOpen, setIsExerciseDetailPopupOpen] = useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)

  const code = {
    html: codeStateMap.html ? codeStateMap.html[0] : undefined,
    css: codeStateMap.css ? codeStateMap.css[0] : undefined,
    js: codeStateMap.js ? codeStateMap.js[0] : undefined,
  } as LangNameMap

  const [savedCode, setSavedCode] = useState<LangNameMap>(code)

  const handleSubmit = () => {
    if (exercise) {
      submitTry({ exerciseId: exercise.id, code })
      setSelectedDebugTabIndex(1)
    }
  }

  const isCodeSavable = JSON.stringify(code) !== JSON.stringify(savedCode) && !exerciseSubmission?.is_submitted

  const handleSave = () => {
    if (isCodeSavable && exercise) {
      saveProgressTry({
        exerciseId: exercise.id,
        code,
      })

      setSavedCode(code)
    }
  }

  useEffect(() => {
    const id = setInterval(handleSave, 10 * 1000)

    return () => {
      clearInterval(id)
    }
  }, [handleSave])

  useEffect(() => {
    for (const lang in testResults) {
      const langRes = testResults[lang as keyof typeof testResults]
      if (langRes && !langRes.success) {
        setIsConsoleOpen(true)
        break
      }
    }
  }, [testResults])

  return (
    <main className={`relative max-h-screen h-full`}>
      <HeadLessTab.Group as="div" selectedIndex={selectedIndex} onChange={setSelectedIndex} className={`h-full relative`}>
        <header className={`bg-black flex justify-between items-center w-full flex-wrap gap-y-5 sticky top-0 z-20`}>
          <ProgrammingLanguageTabList selectedIndex={selectedIndex} languageIds={programmingLanguageIds} />

          <ul className={`items-center text-white gap-x-4 hidden md:flex md:mx-4  mx-auto my-3`}>
            <li>
              <AiFillEye className={`w-8 h-8 cursor-pointer bg-primary-600 p-1.5 rounded-full`} onClick={togglePreview} />
            </li>

            <li>
              <FaWrench
                className={`w-8 h-8 p-1.5 bg-primary-600 rounded-full cursor-pointer`}
                onClick={() => {
                  setIsConsoleOpen((curr) => !curr)
                }}
              />
            </li>

            <li>
              <AiFillQuestionCircle
                className={`w-8 h-8 text-white bg-primary-600 p-1.5 rounded-full`}
                onClick={() => setIsExerciseDetailPopupOpen(true)}
              />
            </li>

            {isMobile && (
              <li>
                <Dropdown>
                  {({ open }) => {
                    return [
                      <Menu.Button key={1}>
                        <ButtonTertiary className={`h-10`}>Set Viewport</ButtonTertiary>
                      </Menu.Button>,

                      <DropdownItemList key={2} isOpen={open} arrowPos="top-center">
                        <DropdownItem onClick={() => {}}>Default Viewport</DropdownItem>

                        <DropdownItem onClick={() => setCustomViewport('sm')}>Small Viewport</DropdownItem>

                        <DropdownItem onClick={() => setCustomViewport('md')}>Medium ViewPort</DropdownItem>

                        <DropdownItem onClick={() => setCustomViewport('lg')}>Large Viewport</DropdownItem>
                      </DropdownItemList>,
                    ]
                  }}
                </Dropdown>
              </li>
            )}

            <li>
              {exerciseSubmission?.is_submitted ? (
                <Link to={nextLink || ''}>
                  <ButtonTertiary className={`h-10`}>Next</ButtonTertiary>
                </Link>
              ) : (
                <ButtonTertiary onClick={() => setIsConfirmationPopupOpen(true)} isLoading={isSubmitting} className={`h-10`}>
                  Submit
                </ButtonTertiary>
              )}
            </li>

            {isCodeSavable && (
              <li>
                <ButtonTertiary onClick={handleSave} isLoading={saveProgressLoading} className={`h-10 `}>
                  Save
                </ButtonTertiary>
              </li>
            )}
          </ul>
        </header>

        {!isPreviewOpen && <CodeEditorPanels codeStateMap={codeStateMap} />}
      </HeadLessTab.Group>

      <CodingExerciseToolbar
        setIsExerciseDetailPopupOpen={setIsExerciseDetailPopupOpen}
        setCustomViewport={setCustomViewport}
        onSave={handleSave}
        isSubmitting={isSubmitting}
        togglePreview={togglePreview}
        isCodeSavable={isCodeSavable}
        exerciseSubmission={exerciseSubmission}
        setIsConsoleOpen={setIsConsoleOpen}
        nextLink={exerciseSubmission ? nextLink : undefined}
        previousLink={previousLink}
        onSubmit={() => setIsConfirmationPopupOpen(true)}
      />

      <CodingPreview code={code} isOpen={isPreviewOpen} />

      <DebugTools
        testResults={testResults}
        testResultLoading={isSubmitting}
        selectedIndex={selectedDebugTabIndex}
        setSelectedIndex={setSelectedDebugTabIndex}
        isOpen={isConsoleOpen}
        logs={childSrcLogs}
        setChildSrcLogs={setChildSrcLogs}
      />

      <ExerciseDetailPopup exercise={exercise} isOpen={isExerciseDetailPopupOpen} setIsOpen={setIsExerciseDetailPopupOpen} />

      <ConfirmationPopup
        onConfirm={handleSubmit}
        isOpen={isConfirmationPopupOpen}
        setIsOpen={setIsConfirmationPopupOpen}
        buttonText="Submit Exercise"
      >
        Once the exercise is submitted you can <span className={`font-secondary-extrabold`}>NOT</span> re-submit!
      </ConfirmationPopup>
    </main>
  )
}

export default memo(CodingExercise)
