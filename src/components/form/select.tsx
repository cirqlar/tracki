// import { Select as SelectInternal, type SelectProps } from "@headlessui/react";
import LeftArrow from "../icons/left-arrow";

type SelectProps<T> = React.DetailedHTMLProps<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
> & {
	options: T[];
	formatOptionLabel?: (option: T) => React.ReactNode;
	divClassName?: string;
};

export default function Select<
	T extends string | number | { value: string | number; label?: string },
>({ formatOptionLabel, options, divClassName, ...props }: SelectProps<T>) {
	return (
		<div className={`relative ${divClassName}`}>
			<select
				{...props}
				className="w-full appearance-none rounded-sm border-2 border-black bg-white py-2 pr-6 pl-4 outline-none focus-visible:border-current dark:bg-black"
			>
				{options.map((opt) => {
					if (typeof opt !== "object") {
						return (
							<option value={opt} key={opt}>
								{formatOptionLabel
									? formatOptionLabel(opt)
									: opt}
							</option>
						);
					} else {
						return (
							<option value={opt.value} key={opt.value}>
								{formatOptionLabel
									? formatOptionLabel(opt)
									: (opt.label ?? opt.value)}
							</option>
						);
					}
				})}
			</select>
			<div
				aria-hidden
				className="pointer-events-none absolute top-0 right-4 bottom-0 flex items-center"
			>
				<LeftArrow className="h-2 -rotate-90" />
			</div>
		</div>
	);
}
