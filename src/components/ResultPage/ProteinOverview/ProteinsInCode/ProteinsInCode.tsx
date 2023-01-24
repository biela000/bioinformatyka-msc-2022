import React from "react";
import classes from "./ProteinsInCode.module.scss";

interface Props {
	aminoAcidString: string;
	aminoAcidLetterString: string;
}

function ProteinsInCode(props: Props) {
	return (
		<div
			className={classes['amino-acids-container']}
			dangerouslySetInnerHTML={{__html:props.aminoAcidLetterString}}
			data-testid="ProteinsInCodeComponent"
		>
		</div>
	);
}

export default ProteinsInCode;