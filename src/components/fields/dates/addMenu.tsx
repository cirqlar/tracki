import { MdCalendarMonth } from "react-icons/md";

import { DateField } from "./types";

const AddMenuIcon: DateField["AddMenuIcon"] = () => {
	return <MdCalendarMonth className="h-full w-full" />;
};

export default AddMenuIcon;
