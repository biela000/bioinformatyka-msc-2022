import classes from "./FileInput.module.scss"
import {FormEvent} from "react";

export type FileInputProps = {
	acceptedExtensions	: Array<String>,
	onInput: (event : FormEvent<HTMLInputElement>)=>void,
	multiple?: boolean,
}

export default function FileInput({acceptedExtensions,onInput,multiple} : FileInputProps)
{
	return <input type="file" multiple={multiple} onInput={onInput} accept={acceptedExtensions.join(",")} />
}