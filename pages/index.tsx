export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center dark:bg-black text-black dark:text-white">
      <main className="flex-auto flex flex-col items-center justify-center">
        <img className="dark:hidden w-[100px]" src="/logo/white-trans.svg" alt="black tracki logo" />
        <img className="hidden dark:block w-[100px]" src="/logo/black-trans.svg" alt="white tracki logo" />
        <h1 className="text-4xl">tracki</h1>
        <a className="bg-green-500 rounded uppercase text-white py-2 px-4 text-base mt-5">Begin</a>
        <a className="underline text-xs mt-4 font-light">Already have an account?</a>
      </main>
      <footer className="flex-none w-full text-center py-4">
        <div className="font-light">
          <a className="text-xs mt-4 font-light">About</a>
          <a className="text-xs mt-4 font-light ml-3">Terms</a>
          <a className="text-xs mt-4 font-light ml-3">Privacy</a>
          <a className="text-xs mt-4 font-light ml-3">Github</a>
        </div>
        <small className="text-[9px]">&#169;2021 Ibitoye Ayanfeoluwa</small>
      </footer>
    </div>
  )
}
