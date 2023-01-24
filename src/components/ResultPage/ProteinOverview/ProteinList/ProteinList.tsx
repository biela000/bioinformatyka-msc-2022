import React from "react";
import classes from "./ProteinList.module.scss";

interface Props {
	proteins: string[];
}

function ProteinList(props: Props) {
	const proteinElements = props.proteins?.map((protein, index) => {
		return <div key={index} className={classes['protein-container']}>{protein}</div>
	});
	return (
		<div className={classes['protein-list']} data-testid="ProteinListComponent">
			{proteinElements}
		</div>
	);
}

export default ProteinList;
