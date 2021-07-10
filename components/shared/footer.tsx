/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="flex-none w-full text-center py-4">
      <div className="font-light text-base">
        <Link href="/">
          <a className="mt-4">About</a>
        </Link>
        <Link href="/">
          <a className="mt-4 ml-3">Terms</a>
        </Link>
        <Link href="/">
          <a className="mt-4 ml-3">Privacy</a>
        </Link>
        <a
          href="https://github.com/cirqlar/tracki"
          className="mt-4 ml-3"
        >
          Github
        </a>
      </div>
      <small className="text-xs">
        &#169;
        {year}
        {" "}
        Ibitoye Ayanfeoluwa
      </small>
    </footer>
  );
}
