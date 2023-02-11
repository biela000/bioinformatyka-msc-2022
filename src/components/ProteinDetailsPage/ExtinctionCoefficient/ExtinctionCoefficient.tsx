import React, { useMemo } from 'react';
import classes from './ExtinctionCoefficient.module.scss';
import { Codon } from '../../../types/proteinTypes';

interface ExtinctionCoefficientProps {
	chain: Codon[];
	proteinMass: number;
}

const TYR_EXTINCTION_COEFFICIENT = 1490;
const TRP_EXTINCTION_COEFFICIENT = 5500;
const CYS_EXTINCTION_COEFFICIENT = 125;

function ExtinctionCoefficient({ chain, proteinMass }: ExtinctionCoefficientProps) {
	const { proteinExtinctionCoefficient, proteinAbsorbance } = useMemo(() => {
		const tyrosineCount = chain.filter(codon => codon.aminoAcidLetter === 'Y').length;
		const tryptophanCount = chain.filter(codon => codon.aminoAcidLetter === 'W').length;
		const cysteineCount = chain.filter(codon => codon.aminoAcidLetter === 'C').length;
		const proteinExtinctionCoefficient = (
			tyrosineCount * TYR_EXTINCTION_COEFFICIENT +
			tryptophanCount * TRP_EXTINCTION_COEFFICIENT +
			cysteineCount * CYS_EXTINCTION_COEFFICIENT
		);
		const proteinAbsorbance = proteinExtinctionCoefficient / proteinMass;
		return {
			proteinExtinctionCoefficient,
			proteinAbsorbance,
		};
	}, [chain, proteinMass]);

	return (
		<div className={classes.extinctionCoefficient}>
			<p>Extinction coefficient: {proteinExtinctionCoefficient}</p>
			<p>Absorbance: {proteinAbsorbance.toFixed(2)}</p>
		</div>
	);
}

export default ExtinctionCoefficient;