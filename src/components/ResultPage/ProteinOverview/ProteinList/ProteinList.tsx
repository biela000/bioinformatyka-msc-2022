import React from 'react';
import classes from './ProteinList.module.scss';

type ProteinProp = {
	proteinString: string;
	mass: number;
	netCharge: number;
}

interface Props {
	proteins: ProteinProp[];
}

function ProteinList(props: Props) {
	const proteinElements = props.proteins?.map((protein, index) => {
		return (
			<div key={index} className={classes['protein-container']}>
				{protein.proteinString.slice(0, protein.proteinString.length - 4)} {protein.mass.toFixed(2)} {Math.floor(protein.netCharge)}
			</div>
		);
	});
	return (
		<div
			className={classes['protein-list']}
			data-testid="ProteinListComponent"
		>
			{proteinElements}
		</div>
	);
}

export default ProteinList;
