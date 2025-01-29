import TrackiTransparent from "@/components/icons/logo-trans-nopad";
import { DateField } from "./types";

const NewThingComponent: DateField["NewThingComponent"] = (props) => {
	switch (props.variant) {
		case "default":
			return (
				<div>
					<TrackiTransparent />
					<p>Date & Time</p>
				</div>
			);
		case "date-only":
			return (
				<div>
					<TrackiTransparent />
					<p>Date</p>
				</div>
			);
		case "time-only":
			return (
				<div>
					<TrackiTransparent />
					<p>Time</p>
				</div>
			);

		default:
			console.error(
				`Error: Unhandled component variant ${props.variant}`,
			);
			return <div>Error, Unhandled component</div>;
	}
};

export default NewThingComponent;
