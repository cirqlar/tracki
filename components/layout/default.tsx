import { ReactNode } from "react";
import cn from "classnames";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function DefaultLayout({
  children,
  mainClasses,
  showFooter = true,
  showHeader = false,
  logoType = "-nopad",
}: {
  children: ReactNode;
  mainClasses?: string;
  showFooter?: boolean;
  showHeader?: boolean;
  logoType?: "" | "-trans" | "-nopad";
}) {
  return (
    <div className="w-full h-full flex flex-col items-center dark:bg-black text-black dark:text-white">
      {showHeader && <Header logoType={logoType} />}
      <main className={cn("flex-auto max-w-full", mainClasses)}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
