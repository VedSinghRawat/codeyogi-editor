import { useState, useCallback, useEffect } from 'react'
import { LangIds, LangNameMap } from '../../Models/ProgrammingLanguages'
import { useGetCodeStates } from './useGetCodeStates'
import { CustomViewport } from '../../utilType'

export const useGetCodingExerciseData = (languageIds: LangIds[], iFrameErrorSet: (err: string) => void, initState?: LangNameMap) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedDebugTabIndex, setSelectedDebugTabIndex] = useState(0)

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const togglePreview = useCallback(() => setIsPreviewOpen(!isPreviewOpen), [isPreviewOpen])

  const codeStateMap = useGetCodeStates(languageIds, initState)

  const [childSrcLogs, setChildSrcLogs] = useState('')
  const [isConsoleOpen, setIsConsoleOpen] = useState(false)

  const messageHandle = ({ data }: MessageEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (data.___internal___ === true) {
      if (data.type === 'log') {
        setChildSrcLogs((curr) => curr + `> &nbsp; ${data.message} <br/>`)
      } else {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
        iFrameErrorSet(`> &nbsp; ${data.message} <br/>`)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('message', messageHandle)

    return () => window.removeEventListener('message', messageHandle)
  }, [childSrcLogs])

  const setCustomViewport = useCallback((viewport: string) => {}, [])

  return {
    setSelectedDebugTabIndex,
    selectedDebugTabIndex,
    selectedIndex,
    isConsoleOpen,
    setIsConsoleOpen,
    childSrcLogs,
    codeStateMap,
    setSelectedIndex,
    setChildSrcLogs,
    isPreviewOpen,
    togglePreview,
    setCustomViewport,
  }
}
