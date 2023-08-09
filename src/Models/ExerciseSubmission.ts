import { LangNameMap } from './ProgrammingLanguages'

export type TestResult = { success: boolean; message: string[] }

export interface ExerciseSubmission {
  id: number
  exercise_is: number
  user_id: number
  code: LangNameMap
  is_submitted: boolean
}
