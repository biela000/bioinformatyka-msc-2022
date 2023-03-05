import React from 'react';
import classes from './AminoAcidChain.module.scss';
import { Codon } from '../../../types/proteinTypes';

interface AminoAcidChainProps {
	chain: Codon[];
}

function AminoAcidChain({ chain }: AminoAcidChainProps) {
	// Omitting the last element because the last element is STOP
	const chainElements = chain
		.slice(0, chain.length - 1)
		.map((aminoAcid, index) => {
			return (
				<div className={classes['amino-acid']} key={index}>
					{aminoAcid.aminoAcidLetter}
				</div>
			);
		});
	return (
		<div
			className={classes['amino-acid-chain-container']}
			data-testid="AminoAcidChainContainerComponent"
		>
			<div
				className={classes['amino-acid-chain']}
				data-testid="AminoAcidChainComponent"
			>
				{chainElements}
			</div>
		</div>
	);
}

export default AminoAcidChain;
