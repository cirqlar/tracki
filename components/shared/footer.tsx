const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="flex-none w-full text-center py-4">
      <div className="font-light text-base">
        <a className="mt-4 font-light">About</a>
        <a className="mt-4 font-light ml-3">Terms</a>
        <a className="mt-4 font-light ml-3">Privacy</a>
        <a className="mt-4 font-light ml-3">Github</a>
      </div>
      <small className="text-xs">&#169;{year} Ibitoye Ayanfeoluwa</small>
    </footer>
  );
}
