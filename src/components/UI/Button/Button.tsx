import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
	dataTestId?: string;
}

function Button({ onClick, children, className, dataTestId }: ButtonProps) {
	return (
		<button
			className={`${classes.button} ${className}`}
			data-testid={dataTestId}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
