import TrackiTransparent from "@/components/icons/logo-trans-nopad";
import { DateField } from "./types";

const AddMenuIcon: DateField["AddMenuIcon"] = (props) => {
	switch (props.variant) {
		case "default":
			return <TrackiTransparent className="h-full" />;
		case "date-only":
			return <TrackiTransparent className="h-full" />;
		case "time-only":
			return <TrackiTransparent className="h-full" />;
		default:
			console.error(
				`Error: Unhandled component variant ${props.variant}`,
			);
			return <div>Error, Unhandled component</div>;
	}
};

export default AddMenuIcon;
