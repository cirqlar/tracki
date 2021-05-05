export enum LogoType {
  circle = "",
  transparent = "-trans",
  no_padding = "-nopad",
}

export default function Header({ logo_type }: { logo_type: LogoType }) {
  return (
    <header className="flex-none w-full">
      <img
        className="dark:hidden w-[60px] mx-auto flex-none pt-12"
        src={`/logo/white${logo_type}.svg`}
        alt="black tracki logo"
      />
      <img
        className="hidden dark:block w-[60px] mx-auto flex-none pt-12"
        src={`/logo/black${logo_type}.svg`}
        alt="white tracki logo"
      />
    </header>
  );
}
