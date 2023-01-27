import classes from './FileInput.module.scss';
import { FormEvent, useRef } from 'react';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

export type FileInputProps = {
	acceptedExtensions: Array<String>;
	onInput: (event: FormEvent<HTMLInputElement>) => void;
	multiple?: boolean;
	dataTestID?: string;
};

export default function FileInput({
	dataTestID,
	acceptedExtensions,
	onInput,
	multiple,
}: FileInputProps) {
	const form = useRef(null);
	console.log(acceptedExtensions.join(','));
	return (
		<input
			type="file"
			multiple={multiple}
			onInput={e => {
				const input = e.target as HTMLInputElement;
				let fileList = input.files as FileList;
				for (let i = 0; i < fileList.length; i++) {
					if (
						acceptedExtensions.some(
							val =>
								val !==
								fileList[i].name.slice(
									fileList[i].name.lastIndexOf('.'),
								),
						)
					) {
						console.log('clear attempt');
						input.type = 'text';
						input.type = 'file';
						return;
					}
				}
				onInput(e);
			}}
			accept={acceptedExtensions.join(', ')}
			data-testid={dataTestID || 'file-input'}
		/>
	);
}
