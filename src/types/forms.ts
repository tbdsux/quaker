import { UserProps } from "./user";

export interface FieldDataProps {
	question: string;
	type: string;
}

export interface FormDataProps {
	user: string;
	name: string;
	fields: FieldDataProps;
}
