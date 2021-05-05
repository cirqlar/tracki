import cn from "classnames";

import Footer from "../shared/footer";
import Header, { LogoType } from "../shared/header";

export default function DefaultLayout({
  children,
  mainClasses,
  showFooter = true,
  showHeader = false,
  logo_type = LogoType.no_padding,
}: {
  children: React.ReactNode;
  mainClasses?: string;
  showFooter?: boolean;
  showHeader?: boolean;
  logo_type?: LogoType;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center dark:bg-black text-black dark:text-white">
      {showHeader && <Header logo_type={logo_type} />}
      <main className={cn("flex-auto max-w-full", mainClasses)}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
