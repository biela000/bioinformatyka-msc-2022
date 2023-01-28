import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
	dataTestId?: string;
	disabled?: boolean;
}

function Button({
	onClick,
	children,
	className,
	dataTestId,
	disabled,
}: ButtonProps) {
	return (
		<button
			className={`${classes.button} ${className}`}
			data-testid={dataTestId}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default Button;
