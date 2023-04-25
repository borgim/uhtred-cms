export const Skeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <span className="sr-only">Loading...</span>
      <div
        role="status"
        className="flex justify-between items-center px-4 h-20 rounded-md bg-gray-300 animate-pulse dark:bg-[#323232]"
      ></div>
      <div
        role="status"
        className="flex justify-between items-center px-4 h-20 rounded-md bg-gray-300 animate-pulse dark:bg-[#323232]"
      ></div>
      <div
        role="status"
        className="flex justify-between items-center px-4 h-20 rounded-md bg-gray-300 animate-pulse dark:bg-[#323232]"
      ></div>
    </div>
  )
}
