import { Modal } from '@/Components/common/Modal'
import { usePosts } from '@/hooks/usePosts'
import { IPost } from '@/pages/api/posts'
import { format } from 'date-fns'
import { CheckCircle2, Edit3Icon, EyeIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface IPostProps {
  post: IPost
  index: number
}

export const Post = ({ post, index }: IPostProps) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false)
  const { deletePost } = usePosts()

  function handleDeleteModalOpen() {
    setDeleteModalIsOpen(true)
  }

  function handleDeleteModalClose() {
    setDeleteModalIsOpen(false)
  }

  const id = post.id.toString()
  const title = post.title
  const postDate = format(new Date(post.published_date), 'Pp')
  const status = post.status
  const statusIcon =
    status === 'draft' ? <Edit3Icon size={16} /> : <CheckCircle2 size={16} />
  const statusColor = status === 'draft' ? 'text-yellow-600' : 'text-green-700'
  const itemColor = index % 2 === 0 ? 'bg-[#343434]' : 'bg-[#424242]'
  const itemHref = `/post/${post.id}`

  return (
    <>
      <Modal
        title="Delete Post"
        trigger={handleDeleteModalClose}
        isOpen={deleteModalIsOpen}
      >
        <div className="flex flex-col gap-20">
          <p className="text-lg">
            Are you sure you want to delete post{' '}
            <span className="text-red-600 text-xl font-bold">
              &quot;{title}&quot;
            </span>
            ?
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => deletePost(id)}
              className="flex gap-2 bg-red-500 text-white p-2 rounded-md"
            >
              <TrashIcon />
              Yes, delete it!
            </button>
          </div>
        </div>
      </Modal>
      <li
        key={id}
        className={`flex justify-between items-center pl-4 rounded-md ${itemColor} h-[74px]`}
      >
        <Link
          href={itemHref}
          className="flex justify-between w-full py-4 hover:underline"
        >
          <div className="flex items-center">
            <div className="flex gap-2 items-center">
              <EyeIcon size={16} />
              <h2 className="w-96 font-extrabold truncate">{title}</h2>
            </div>
            <time className="w-1/6 text-sm text-gray-300 pl-2">{postDate}</time>
          </div>
          <span className="w-1/6 flex justify-center items-center text-gray-500">
            #{id}
          </span>
          <span className={`w-36 flex gap-2 items-center ${statusColor}`}>
            {statusIcon}
            {status}
          </span>
        </Link>
        <div className="pl-2">
          <button
            onClick={handleDeleteModalOpen}
            className="flex justify-center items-center gap-2 bg-red-500 text-white hover:underline h-[4.5625rem] px-4 rounded-r-md hover:bg-red-600"
          >
            <TrashIcon size={20} />
            Delete
          </button>
        </div>
      </li>
    </>
  )
}
