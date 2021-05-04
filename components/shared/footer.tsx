const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="flex-none w-full text-center py-4">
      <div className="font-light">
        <a className="text-xs mt-4 font-light">About</a>
        <a className="text-xs mt-4 font-light ml-3">Terms</a>
        <a className="text-xs mt-4 font-light ml-3">Privacy</a>
        <a className="text-xs mt-4 font-light ml-3">Github</a>
      </div>
      <small className="text-[9px]">&#169;{year} Ibitoye Ayanfeoluwa</small>
    </footer>
  );
}
