import React from "react";
import classes from "./NetCharge.module.scss";
import { Codon } from "../../../types/proteinTypes";
import { AminoAcids } from "../../../utils/aminoAcids";

interface NetChargeProps {
	chain: Codon[];
	netCharge: number;
}

function NetCharge({ chain, netCharge }: NetChargeProps) {
	// Omitting the last element because the last element is STOP
	const chainElements = chain.slice(0, chain.length - 1).map((aminoAcid, index) => {
		const aminoAcidNetCharge = AminoAcids.get(aminoAcid.aminoAcidLetter)?.netCharge ?? 0;
		return (
			<div className={classes['amino-acid']} key={index}>
				{aminoAcidNetCharge === 1 ? '+' : aminoAcidNetCharge === -1 ? '-' : aminoAcidNetCharge === 0.1 ? 'S*' : '0'}
			</div>
		);
	});

	return (
		<div className={classes['net-charge']} data-testid="NetChargeComponent">
			<div className={classes['net-charge__chain-container']}>
				<div className={classes['net-charge__chain']}>
					{chainElements}
				</div>
			</div>
			<div className={classes['net-charge__explanation']}>
				*There is one amino acid (H) which has a net charge of 0.1. This is because it has a positive charge on the side chain, but a negative charge on the main chain.
			</div>
			<div className={classes['net-charge__value']}>
				Net Charge: {Math.floor(netCharge)}
			</div>
		</div>
	);
}

export default NetCharge;