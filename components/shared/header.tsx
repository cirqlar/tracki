import Image from "next/image";

export default function Header({ logoType = "" }: { logoType: "" | "-trans" | "-nopad" }) {
  return (
    <header className="flex-none w-full">
      <div className="dark:hidden mx-auto w-[60px] h-[60px] mt-12">
        <Image
          width="60"
          height="60"
          src={`/logo/white${logoType}.svg`}
          alt="black tracki logo"
        />
      </div>
      <div className="hidden dark:block mx-auto w-[60px] h-[60px] mt-12">
        <Image
          width="60"
          height="60"
          src={`/logo/black${logoType}.svg`}
          alt="white tracki logo"
        />
      </div>
    </header>
  );
}
