import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export const HomeStory = () => {
  const features = [
    'List all publications',
    'Edit publications',
    'Create new publication',
    'Add new user',
    'Remove users',
  ]

  return (
    <section id="logo-features" className="flex flex-col gap-6">
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
      <div id="features">
        <ul className="flex flex-col gap-4">
          {features.map((feature) => {
            return (
              <li className="flex items-center gap-3" key={feature}>
                <CheckCircle2 />
                {feature}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
