import { format } from "date-fns";
import { DateField } from "./types";

const DisplayEntryComponent: DateField["DisplayEntryComponent"] = (props) => {
	return <p>{format(props.data.date, "Pp")}</p>;
};

export default DisplayEntryComponent;
