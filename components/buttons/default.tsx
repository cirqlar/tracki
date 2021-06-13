import Link from "next/link";
import cn from "classnames";

import { backgroundColors, textColors } from "../../lib/colors";

type color = "green" | "white" | "black" | "red" | "blue";

type ButtonProps = {
  children: React.ReactNode;
  appearance?: "button" | "link";
  size?: "base" | "large";
  className?: string;
} & (
  | {
      href: string;
      internal?: boolean;
      onClick?: never;
      buttonType?: never;
      textColor?: color;
      bgColor?: never;
      underline?: boolean;
      disabled?: boolean;
    }
  | {
      href?: never;
      internal?: never;
      onClick?: React.MouseEventHandler;
      buttonType?: "submit" | "reset" | "button";
      textColor?: color;
      bgColor?: color;
      underline?: never;
      disabled?: boolean;
    }
);

export default function Button({
  href,
  children,
  internal = true,
  onClick,
  buttonType,
  appearance = "button",
  size = "base",
  bgColor = "green",
  textColor,
  underline = true,
  className: classes,
  disabled,
}: ButtonProps) {
  const className = cn(
    appearance === "button" && "rounded uppercase py-2 px-4",
    size === "base" ? "text-base" : "text-lg sm:text-xl",
    appearance === "button" && bgColor && backgroundColors[bgColor],
    textColor ? textColors[textColor] : appearance === "button" && textColors["white"],
    appearance === "link" && { "underline": underline },
    classes
  );

  if (href) {
    return internal ? (
      <Link href={href}>
        <a className={className}>
          {children}
        </a>
      </Link>
    ) : (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  const typeProp = buttonType ? { type: buttonType } : {};

  return (
    <button
      {...typeProp}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
