import { XIcon } from 'lucide-react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface IModalProps {
  title: string
  children: ReactNode
  isOpen: boolean
  trigger: (showModal: boolean) => void
}

export const Modal = ({ title, children, isOpen, trigger }: IModalProps) => {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<Element | null>(null)

  function onTrigger() {
    setOpen(!open)
    trigger(!open)
  }

  useEffect(() => {
    bodyRef.current = document.body
    setOpen(isOpen)

    if (isOpen) {
      bodyRef.current.classList.add('overflow-hidden')
    }

    return () => {
      bodyRef.current?.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  return (
    <>
      {bodyRef.current && open
        ? createPortal(
            <>
              <div
                id="modal-overlay"
                role="button"
                className="fixed right-0 left-0 top-0 z-10 cursor-pointer flex justify-center items-center min-h-full h-[calc(100%-1rem)] bg-black/70"
                onClick={onTrigger}
              ></div>
              <div
                id="modal-content"
                className="fixed bg-gray-200 rounded-md md:min-w-[500px] z-20 top-2/4 left-2/4"
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                <div
                  id="modal-title"
                  className="p-4 flex justify-between border-b-[1px] border-black"
                >
                  <h4 className="text-xl font-medium uppercase">{title}</h4>

                  <button onClick={onTrigger}>
                    <XIcon />
                  </button>
                </div>
                <section id="modal-content" className="p-4">
                  {children}
                </section>
              </div>
            </>,
            bodyRef.current,
          )
        : null}
    </>
  )
}
