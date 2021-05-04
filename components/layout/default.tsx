import cn from "classnames";

import Footer from "../shared/footer";

export default function DefaultLayout({
  children,
  mainClasses,
  showFooter = true,
}: {
  children: React.ReactNode;
  mainClasses?: string;
  showFooter?: boolean;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center dark:bg-black text-black dark:text-white">
      <main className={cn("flex-auto", mainClasses)}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
