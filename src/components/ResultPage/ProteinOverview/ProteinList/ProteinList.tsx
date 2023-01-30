import React from 'react';
import classes from './ProteinList.module.scss';
import { Link, useParams } from "react-router-dom";

type ProteinProp = {
	proteinString: string;
	mass: number;
	netCharge: number;
}

interface Props {
	proteins: ProteinProp[];
}

function ProteinList(props: Props) {
	const shiftId = useParams().id;
	const proteinElements = props.proteins?.map((protein, index) => {
		return (
			<React.Fragment key={index}>
				<div key={index} className={classes['protein-container']}>
					{protein.proteinString.slice(0, protein.proteinString.length - 4)} {protein.mass.toFixed(2)} {Math.floor(protein.netCharge)}
				</div>
				<Link to={`/result/${shiftId ?? 1}/protein/${index + 1}`} className={classes['protein-link']}>{index + 1}</Link>
			</React.Fragment>
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
