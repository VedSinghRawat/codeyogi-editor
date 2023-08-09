import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { LANG_ID_TO_LANG_NAME_MAP, LangNameMap, LangIds } from '../../Models/ProgrammingLanguages'

export const useGetCodeStates = (languageIds: LangIds[], initState?: LangNameMap) => {
  const init = initState
    ? initState
    : languageIds.reduce((currInit, id) => {
        currInit[LANG_ID_TO_LANG_NAME_MAP.get(id)!] = ''
        return currInit
      }, {} as LangNameMap)

  const [code, setCode] = useState(init)

  const codeState = languageIds.reduce(
    (curr, id) => {
      curr[LANG_ID_TO_LANG_NAME_MAP.get(id)!] = ['', () => {}]
      return curr
    },
    {} as LangNameMap<[string, Dispatch<SetStateAction<string>>]>
  )

  languageIds.forEach((id) => {
    const setter: Dispatch<SetStateAction<string>> = (val) => {
      setCode((currCode) => {
        if (typeof val === 'string') {
          return { ...currCode, [LANG_ID_TO_LANG_NAME_MAP.get(id)!]: val }
        } else return { ...currCode, [LANG_ID_TO_LANG_NAME_MAP.get(id)!]: val(currCode[LANG_ID_TO_LANG_NAME_MAP.get(id)!]!) }
      })
    }

    codeState[LANG_ID_TO_LANG_NAME_MAP.get(id)!] = [code[LANG_ID_TO_LANG_NAME_MAP.get(id)!] || '', setter]
  })

  useEffect(() => {
    Object.keys(code).length === 0 && initState && setCode(initState)
  }, [initState])

  return codeState
}
