import Image from 'next/image'

export const Logo = () => {
  return (
    <div id="logo" className="flex items-center gap-2">
      <Image
        src="/assets/uhtred-logo.png"
        alt="Viking head"
        width={100}
        height={100}
      />
      <h1 className="font-bold text-2xl uppercase text-yellow-600">
        Uhtred
        <span className="block font-medium text-base lowercase text-white">
          Simple blog CMS
        </span>
      </h1>
    </div>
  )
}
