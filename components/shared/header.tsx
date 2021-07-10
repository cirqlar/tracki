import Image from "next/image";

export default function Header({ logoType = "" }: { logoType: "" | "-trans" | "-nopad" }) {
  return (
    <header className="flex-none w-full">
      <Image
        width="60"
        height="60"
        className="dark:hidden w-[60px] h-[60px] mx-auto flex-none mt-12"
        src={`/logo/white${logoType}.svg`}
        alt="black tracki logo"
      />
      <Image
        width="60"
        height="60"
        className="hidden dark:block w-[60px] h-[60px] mx-auto flex-none mt-12"
        src={`/logo/black${logoType}.svg`}
        alt="white tracki logo"
      />
    </header>
  );
}
