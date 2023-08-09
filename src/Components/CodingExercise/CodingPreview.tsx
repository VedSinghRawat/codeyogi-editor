import { FC, Fragment, memo } from 'react'
import { Transition } from '@headlessui/react'
import { LangNameMap } from '../../../../Models/ProgrammingLanguage'

interface CodingPreviewProps {
  isOpen: boolean
  code: LangNameMap<string>
}

const CodingPreview: FC<CodingPreviewProps> = ({ isOpen, code }) => {
  return (
    <Transition
      as={Fragment}
      show={isOpen}
      enter="duration-300 transition-all"
      enterFrom="opacity-0 translate-x-full "
      enterTo="opacity-100 translate-x-0 "
      leave="duration-300 transition-all"
      leaveFrom="opacity-100 translate-x-0 "
      leaveTo="opacity-0 translate-x-full"
    >
      <iframe
        className={`fixed top-0 inset-0 h-full w-full translate-y-14 md:translate-y-36 lg:translate-y-14`}
        srcDoc={`<html>
                  <style>${code.css ? code.css : ''}</style>
                  <body>${code.html ? code.html : ''}</body>

                  <script>
                    (function () {
                      var oldLog = console.log;
                      var oldError = console.error

                      console.log = function (message) {
                          window.parent.postMessage({___internal___:true, type:"log", message})
                        }

                      window.onerror = (e) => {
                        window.parent.postMessage({___internal___:true, type:"error", message:e})
                      }
                    })();
                  </script>
                  <script>${code.js ? code.js : ''}</script>
                </html>`}
      />
    </Transition>
  )
}

export default memo(CodingPreview)
