import { Editor } from '../Editor'

export const NewPost = () => {
  return (
    <div id="createPostArea" className="w-full">
      <section id="title" className="flex justify-between gap-11 text-black">
        <input
          type="text"
          placeholder="Your post title"
          className="w-full bg-transparent border-b border-white"
        />
        <button className="w-56 bg-yellow-500 rounded-md p-2">SAVE</button>
      </section>
      <section id="editor">
        <Editor />
      </section>
    </div>
  )
}
