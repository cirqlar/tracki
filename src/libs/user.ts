import { createResource } from "solid-js";


const checkIfUserExists = async () => {
	return true;
}

export const useUser = () => createResource(checkIfUserExists);