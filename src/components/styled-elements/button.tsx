import { JSX, mergeProps, splitProps } from "solid-js";


interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'large' | 'medium',
	useCustomColor?: boolean,
}

const defaultProps: ButtonProps = {
	size: 'large',
	useCustomColor: false,
}

const Button = (props: ButtonProps) => {
	const withDefaultProps = mergeProps(defaultProps, props);
	const [local, other] = splitProps(withDefaultProps, ['size', 'class', 'useCustomColor']);
	const getClasses = () => local.size === 'large' ? 'px-5 text-base' : 'px-4 text-sm'

	return (
		<button
			class={`
				${local?.class ?? ''}
				${getClasses()}
				${local.useCustomColor ? '' : 'bg-green-600 text-white'}
				py-2 rounded uppercase
			`}
			{...other}
		>
			{other.children}
		</button>
	)
}

export default Button;