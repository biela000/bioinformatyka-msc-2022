import React from "react";
import classes from "./ProteinStructure.module.scss";
import Canvas from "../../Canvas/Canvas";

interface ProteinStructureProps {
	proteinString: string;
	mass: number;
}

function ProteinStructure({ proteinString, mass }: ProteinStructureProps) {
	return (
		<div className={classes['protein-structure']} data-testid="ProteinStructureComponent">
			<Canvas peptide={proteinString} />
			<div className={classes['protein-structure__mass']}>
				{mass.toFixed(2)}
			</div>
		</div>
	);
}

export default ProteinStructure;