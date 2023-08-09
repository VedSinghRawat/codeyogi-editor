import { RequireOne } from '../utilType'

export default interface ProgrammingLanguage {
  id: number
  lang: string
}

export type LangNames = 'html' | 'css' | 'js'

export type LangNameMap<T = string> = RequireOne<{ [key in LangNames]?: T }>

// TODO: change the types below according to the actual backend data
export const LANG_IDS = [1, 2, 3] as const

export type LangIds = (typeof LANG_IDS)[number]

export const LANG_ID_TO_LANG_NAME_MAP: Map<LangIds, LangNames> = new Map([
  [1, 'html'],
  [2, 'css'],
  [3, 'js'],
])

export const LANG_NAME_TO_LANG_ID_MAP: Map<LangNames, LangIds> = new Map([
  ['html', 1],
  ['css', 2],
  ['js', 3],
])
