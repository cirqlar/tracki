import { format } from "date-fns";
import { DateField } from "./types";

const DisplayEntryComponent: DateField["DisplayEntryComponent"] = (props) => {
	return <div>{format(props.data.date, "Pp")}</div>;
};

export default DisplayEntryComponent;
