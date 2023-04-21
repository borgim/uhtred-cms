import { Modal } from '@/Components/common/Modal'
import { IPost } from '@/pages/api/posts'
import { format } from 'date-fns'
import {
  CheckCircle2,
  Edit3Icon,
  EyeIcon,
  LinkIcon,
  TrashIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface IPostProps {
  post: IPost
  index: number
}

export const Post = ({ post, index }: IPostProps) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false)

  function handleDeleteModalOpen() {
    setDeleteModalIsOpen(true)
  }

  function handleDeleteModalClose() {
    setDeleteModalIsOpen(false)
  }

  const id = post.id
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
        ola mundo
      </Modal>
      <li
        key={id}
        className={`flex justify-between items-center px-4 rounded-md ${itemColor}`}
      >
        <Link
          href={itemHref}
          className="flex justify-between w-full py-4 hover:underline"
        >
          <div className="flex items-center">
            <div className="flex gap-2 items-center">
              <LinkIcon size={16} />
              <h2 className="w-96 font-extrabold">{title}</h2>
            </div>
            <time className="w-1/6 text-sm text-gray-300">{postDate}</time>
          </div>
          <span className="w-1/6 flex justify-center items-center text-gray-500">
            #{id}
          </span>
          <span className={`w-36 flex gap-2 items-center ${statusColor}`}>
            {statusIcon}
            {status}
          </span>
        </Link>
        <div className="border-l-2 border-[#232323] pl-2">
          <Link href={itemHref} className="flex gap-2 hover:underline">
            <EyeIcon size={20} />
            Edit
          </Link>
          <button
            onClick={handleDeleteModalOpen}
            className="flex gap-2 text-red-500 hover:underline"
          >
            <TrashIcon size={20} />
            Delete
          </button>
        </div>
      </li>
    </>
  )
}
