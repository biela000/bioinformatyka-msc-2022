import React from "react";
import classes from "./ProteinsInCode.module.scss";

interface Props {
	aminoAcidElements: JSX.Element[];
}

function ProteinsInCode(props: Props) {
	return (
		<div className={classes['amino-acids-container']}>
			{props.aminoAcidElements}
		</div>
	);
}

export default ProteinsInCode;