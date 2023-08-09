import { linter, Diagnostic } from '@codemirror/lint'
import { JSHINT as jshint } from 'jshint'

const jsLinter = (onErrorChange?: (errors: Diagnostic[]) => void) =>
  linter((view) => {
    const diagnostics: Diagnostic[] = []

    const codeText = view.state.doc.toJSON()
    jshint(codeText, {
      browser: true,
      devel: true,
      asi: true,
      undef: true,
      esnext: true,
      loopfunc: false,
    })

    const errors = jshint.data()?.errors

    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        if (error.code === 'E041') return

        const selectedLine = view.state.doc.line(error.line)

        const diagnostic: Diagnostic = {
          from: selectedLine.from,
          to: selectedLine.to,
          severity: error.code === 'W117' ? 'error' : error.code.startsWith('W') ? 'warning' : 'error',
          message: error.reason,
        }

        diagnostics.push(diagnostic)
      })
    }

    onErrorChange && onErrorChange(diagnostics)

    return diagnostics
  })

export default jsLinter
