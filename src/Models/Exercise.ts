import { LangNameMap } from './ProgrammingLanguages'

export interface Exercise {
  id: number
  problem_statement: string
  init_code: LangNameMap
}
