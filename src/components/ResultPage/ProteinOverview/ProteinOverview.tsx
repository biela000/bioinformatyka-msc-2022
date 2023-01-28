import React from 'react';
import ProteinsInCode from './ProteinsInCode/ProteinsInCode';
import ProteinList from './ProteinList/ProteinList';
import { useAppSelector } from '../../../store/storeHooks';
import { useParams } from 'react-router-dom';
import classes from './ProteinOverview.module.scss';

function ProteinOverview() {
	const rnaData = useAppSelector(state => state.protein);
	const { id } = useParams();
	const resultIndex = parseInt(id!) - 1;

	const proteins = rnaData.proteins[resultIndex]?.map(protein => {
		return {
			proteinString: protein.aminoAcidChain.map(codon => codon.aminoAcidLetter).join(''),
			mass: protein.mass,
			netCharge: protein.netCharge,
		};
	});

	return (
		<div data-testid="ProteinOverviewComponent">
			<h3>Proteins found: {proteins?.length}</h3>
			<ProteinsInCode
				aminoAcidString={rnaData.formattedAminoAcidString[resultIndex]}
				aminoAcidLetterString={
					rnaData.formattedAminoAcidLetterString[resultIndex]
				}
			/>
			<ProteinList proteins={proteins} />
		</div>
	);
}

export default ProteinOverview;
