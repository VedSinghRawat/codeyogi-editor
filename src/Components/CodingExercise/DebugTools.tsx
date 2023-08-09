import { FC, memo, useCallback } from 'react'
import AnimateHeight from 'react-animate-height'
import { Tab as HeadLessTab } from '@headlessui/react'
import { VscClearAll } from 'react-icons/vsc'
import { connect } from 'react-redux'
import { AppState } from '../../../../store/store'
import { LangNameMap, LangNames } from '../../../../Models/ProgrammingLanguage'
import { BsGearWideConnected } from 'react-icons/bs'
import { TestResult } from '../../../../Models/ExerciseSubmission'
import { editorErrorsSelector, iFrameErrorsSelector } from '../../../../store/selectors/exercise.selector'

interface DebugToolsProps {
  isOpen: boolean
  logs: string
  testResults?: LangNameMap<TestResult>
  errors: string
  setChildSrcLogs: (val: string) => void
  className?: string
  setSelectedIndex: (i: number) => void
  selectedIndex: number
  testResultLoading: boolean
}

const DebugToolsTab: FC<{ children: string; className?: string }> = ({ children, className = '' }) => (
  <HeadLessTab className={({ selected }) => `border-2 p-2 rounded-xl border-white ${!selected ? 'opacity-30' : ''} ${className}`}>
    {children}
  </HeadLessTab>
)

const DebugTools: FC<DebugToolsProps> = ({
  isOpen,
  logs,
  testResults,
  errors,
  setChildSrcLogs,
  testResultLoading,
  setSelectedIndex,
  selectedIndex,
  className = '',
}) => {
  const clearChildSrcLogs = useCallback(() => setChildSrcLogs(''), [])

  return (
    <AnimateHeight
      className={`grow-0 fixed rounded-t-3xl ${
        isOpen ? 'shadow-console' : ''
      } z-20 w-full bg-black text-white font-primary-semibold !overflow-scroll bottom-10 md:bottom-0 ${className}`}
      duration={500}
      height={isOpen ? 350 : 0}
    >
      <HeadLessTab.Group onChange={setSelectedIndex} selectedIndex={selectedIndex}>
        {({ selectedIndex }) => {
          return (
            <>
              <div className={`flex items-center justify-between sticky bg-black pt-6 pb-3 px-5 top-0`}>
                <HeadLessTab.List className={`font-secondary-semibold text-lg mb-1 flex gap-x-4`}>
                  <DebugToolsTab>Console</DebugToolsTab>
                  <DebugToolsTab>Tests</DebugToolsTab>
                  <DebugToolsTab className={`!border-red-500 !text-red-500`}>Errors</DebugToolsTab>
                </HeadLessTab.List>

                {selectedIndex === 0 && <VscClearAll className={`h-6 w-6 cursor-pointer`} onClick={clearChildSrcLogs} />}
              </div>

              <div className={`px-5 pb-5`}>
                <HeadLessTab.Panels>
                  <HeadLessTab.Panel>
                    <p dangerouslySetInnerHTML={{ __html: logs }}></p>
                  </HeadLessTab.Panel>

                  <HeadLessTab.Panel>
                    {testResultLoading ? (
                      <div className={`flex items-center gap-x-3`}>
                        <BsGearWideConnected className={`text-white animate-spin`} />
                        <h4>...Testing...</h4>
                        <BsGearWideConnected className={`text-white animate-spin`} />
                      </div>
                    ) : testResults ? (
                      Object.keys(testResults).map((key) => {
                        const lang = key as LangNames
                        const { success, message } = testResults[lang]!
                        return (
                          <>
                            <h4 className={`${success ? 'text-green-600' : 'text-red-500'}`}>
                              ---- {lang.toUpperCase()} test results: {success ? 'PASSED' : 'FAILED'} ----
                            </h4>

                            {message.map((m) => (
                              <p className={`mt-1`}>{m}</p>
                            ))}

                            <br />
                          </>
                        )
                      })
                    ) : (
                      <></>
                    )}
                  </HeadLessTab.Panel>

                  <HeadLessTab.Panel>
                    <p className={`text-red-500`} dangerouslySetInnerHTML={{ __html: errors }}></p>
                  </HeadLessTab.Panel>
                </HeadLessTab.Panels>
              </div>
            </>
          )
        }}
      </HeadLessTab.Group>
    </AnimateHeight>
  )
}

const mapStateToProps = (state: AppState) => ({
  errors: editorErrorsSelector(state) + iFrameErrorsSelector(state),
})

const matchDispatchToProps = {}

export default memo(connect(mapStateToProps, matchDispatchToProps)(DebugTools))
