//Ewa, ja,
import { render, screen } from '@testing-library/react';
import FileInput from '../../../src/components/UI/FileInput/FileInput';
import userEvent from '@testing-library/user-event';

const testID = 'file-input';

describe('FileInput', () => {
	it('should reject extensions other than mentioned', () => {
		//With (If extension is not accepted, onInput function is not called)
		const file1 = new File(['lorem'], 'lorem.png', { type: 'image/png' });
		const mock = jest.fn();
		//When
		render(
			<FileInput
				dataTestID={testID}
				acceptedExtensions={['.txt']}
				onInput={mock}
			/>,
		);
		const input = screen.getByTestId(testID) as HTMLInputElement;

		userEvent.upload(input, file1);

		expect(mock).not.toHaveBeenCalled();
	});
	it('should accept extensions mentioned', () => {
		//With  (If extension is accepted, onInput function is called)
		const file1 = new File(['lorem'], 'lorem.txt', { type: 'text/plain' });
		const mock = jest.fn();
		//When
		render(
			<FileInput
				dataTestID={testID}
				acceptedExtensions={['.txt']}
				onInput={mock}
			/>,
		);
		const input = screen.getByTestId(testID) as HTMLInputElement;

		userEvent.upload(input, file1);

		expect(mock).toHaveBeenCalled();
	});
});
