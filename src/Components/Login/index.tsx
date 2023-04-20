import { GithubIcon, LogInIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'

export const Login = () => {
  return (
    <section id="login-area" className="w-1/3 bg-[#343434] p-4 rounded-md">
      <span className="font-bold text-xl block pb-7">Welcome back</span>
      <button
        onClick={() => signIn('github')}
        className="flex gap-2 bg-yellow-600 hover:bg-yellow-700 transition-colors px-3 py-2 rounded-md"
      >
        <GithubIcon />
        Login with Github
      </button>

      <div id="login-form">
        <div id="or" className="flex items-center my-4">
          <div className="w-full h-[2px] bg-[#222222]"></div>
          <span className="block px-2">or</span>
          <div className="w-full h-[2px] bg-[#222222]"></div>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username-input" className="cursor-pointer">
              Username
            </label>
            <input
              type="text"
              id="username-input"
              placeholder="Type your username"
              className="rounded-md p-2 bg-[#222222] border-[1px] outline-none focus:border-yellow-600"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password-input" className="cursor-pointer">
              Password
            </label>
            <input
              type="password"
              id="password-input"
              placeholder="Type your password"
              className="rounded-md p-2 bg-[#222222] border-[1px] outline-none focus:border-yellow-600"
            />
          </div>
          <button
            type="submit"
            disabled
            className="flex justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 transition-colors px-3 py-2 rounded-md cursor-not-allowed"
          >
            Login
            <LogInIcon />
          </button>
        </form>
      </div>
    </section>
  )
}
