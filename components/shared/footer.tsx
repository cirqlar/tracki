import Button from "../buttons/default";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="flex-none w-full text-center py-4">
      <div className="font-light text-base">
        <a className="mt-4">About</a>
        <a className="mt-4 ml-3">Terms</a>
        <a className="mt-4 ml-3">Privacy</a>
        <Button
          href="https://github.com/cirqlar/tracki"
          appearance="link"
          internal={false}
          underline={false}
          className="mt-4 ml-3"
        >
          Github
        </Button>
      </div>
      <small className="text-xs">&#169;{year} Ibitoye Ayanfeoluwa</small>
    </footer>
  );
}
