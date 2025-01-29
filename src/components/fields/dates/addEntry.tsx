import { DateField } from "./types";

const AddEntryComponent: DateField["AddEntryComponent"] = (props) => {
	return <div>Date Add Entry {props.schema}</div>;
};

export default AddEntryComponent;
