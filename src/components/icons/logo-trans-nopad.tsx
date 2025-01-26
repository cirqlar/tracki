export default function TrackiTransparent(props: {
	className?: string;
	crossColor?: string;
	graphColor?: string;
}) {
	return (
		<svg
			width="68"
			height="68"
			viewBox="0 0 68 68"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
		>
			<g>
				<path
					d="M35.5111 7.24121C36.8453 6.65826 37.7778 5.32691 37.7778 3.77778C37.7778 1.69137 36.0864 0 34 0C31.9136 0 30.2222 1.69137 30.2222 3.77778C30.2222 5.32691 31.1546 6.65826 32.4889 7.24121L32.4889 32.4889H7.24121C6.65826 31.1547 5.32691 30.2222 3.77778 30.2222C1.69137 30.2222 0 31.9136 0 34C0 36.0864 1.69137 37.7778 3.77778 37.7778C5.32691 37.7778 6.65826 36.8453 7.24121 35.5111H32.4889L32.4889 60.7588C31.1547 61.3417 30.2222 62.6731 30.2222 64.2222C30.2222 66.3086 31.9136 68 34 68C36.0864 68 37.7778 66.3086 37.7778 64.2222C37.7778 62.6731 36.8454 61.3417 35.5111 60.7588L35.5111 35.5111H60.7588C61.3417 36.8453 62.6731 37.7778 64.2222 37.7778C66.3086 37.7778 68 36.0864 68 34C68 31.9136 66.3086 30.2222 64.2222 30.2222C62.6731 30.2222 61.3417 31.1547 60.7588 32.4889H35.5111L35.5111 7.24121Z"
					fill={props.crossColor ?? "currentColor"}
				/>
				<path
					d="M47.6387 7.95454C47.7025 7.74407 47.7368 7.52078 47.7368 7.28947C47.7368 6.02503 46.7118 5 45.4474 5C44.1829 5 43.1579 6.02503 43.1579 7.28947C43.1579 7.78532 43.3155 8.24434 43.5834 8.61918L22.6513 58.4231C22.6186 58.4218 22.5857 58.4211 22.5526 58.4211C22.3213 58.4211 22.098 58.4554 21.8876 58.5191L9.48085 46.1124C9.54465 45.902 9.57895 45.6787 9.57895 45.4474C9.57895 44.1829 8.55392 43.1579 7.28947 43.1579C6.02503 43.1579 5 44.1829 5 45.4474C5 46.7118 6.02503 47.7368 7.28947 47.7368C7.52078 47.7368 7.74407 47.7025 7.95454 47.6387L20.3613 60.0455C20.2975 60.2559 20.2632 60.4792 20.2632 60.7105C20.2632 61.975 21.2882 63 22.5526 63C23.8171 63 24.8421 61.975 24.8421 60.7105C24.8421 60.2147 24.6845 59.7557 24.4166 59.3808L45.3487 9.57686C45.3814 9.57825 45.4143 9.57895 45.4474 9.57895C45.6787 9.57895 45.902 9.54465 46.1124 9.48085L58.5191 21.8876C58.4554 22.098 58.4211 22.3213 58.4211 22.5526C58.4211 23.8171 59.4461 24.8421 60.7105 24.8421C61.975 24.8421 63 23.8171 63 22.5526C63 21.2882 61.975 20.2632 60.7105 20.2632C60.4792 20.2632 60.2559 20.2975 60.0455 20.3613L47.6387 7.95454Z"
					fill={props.graphColor ?? "#EB5757"}
				/>
			</g>
		</svg>
	);
}
