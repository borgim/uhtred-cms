import { OutputData } from '@editorjs/editorjs'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const EditorBlock = dynamic(() => import('./EditorDefinition'), { ssr: false })

export const Editor = () => {
  const [data, setData] = useState<OutputData>()

  return (
    <div className="text-black bg-white w-full rounded-md">
      <EditorBlock data={data} onChange={setData} holder="editorjs" />
    </div>
  )
}
