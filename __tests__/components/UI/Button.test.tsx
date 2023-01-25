import { render, screen } from '@testing-library/react';
import Button from "../../../src/components/UI/Button/Button";
import userEvent from '@testing-library/user-event';
const testID = "button"

describe('Button component', () => {
	it("should render", ()=>{
		render(<Button dataTestId={testID}/>)
		expect(screen.getByTestId(testID)).toBeTruthy()
	})
	it('should call onClick', () => {
		//With
		const func = jest.fn();
		//When
		render(<Button dataTestId={testID} onClick={func}/>);
		userEvent.click(screen.getByTestId(testID))

		expect(func).toHaveBeenCalled();
	});
	it("should render children", ()=>{
		//With
		const child = <p data-testid={"child"}>Lorem</p>
		//When
		render(<Button children={child} />)

		expect(screen.getByTestId("child")).toBeTruthy()
	})
	it("should render with specific className", ()=>{
		//With
		const className = "button"
		//When
		render(<Button dataTestId={testID} className={className}/>)

		expect(screen.getByTestId(testID).classList.contains(className))
			.toBe(true)
	})
});
