import { Logo } from '@/Components/common/Logo'
import { CheckCircle2 } from 'lucide-react'

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
      <Logo />
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
