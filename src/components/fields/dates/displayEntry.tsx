import { DateField } from "./types";

const DisplayEntryComponent: DateField["DisplayEntryComponent"] = (props) => {
	return <div>Date Display Entry {props.schema}</div>;
};

export default DisplayEntryComponent;
