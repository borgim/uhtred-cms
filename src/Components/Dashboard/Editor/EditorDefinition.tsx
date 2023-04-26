import EditorJS, { OutputData } from '@editorjs/editorjs'
import { memo, useEffect, useRef } from 'react'
import { EDITOR_TOOLS } from './tools'

interface EditorProps {
  data?: OutputData
  onChange: (data: OutputData) => void
  holder: string
}

const EditorDefinition = ({ data, onChange, holder }: EditorProps) => {
  const editorRef = useRef<EditorJS>()

  useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = new EditorJS({
        holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save()
          onChange(data)
        },
      })

      editorRef.current = editorInstance
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div id={holder}></div>
}
export default memo(EditorDefinition)
