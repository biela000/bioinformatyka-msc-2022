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

	const proteinStrings = rnaData.proteins[resultIndex]?.map(protein => {
		return protein.map(codon => codon.aminoAcidLetter).join('');
	});

	return (
		<div data-testid="ProteinOverviewComponent">
			<h3>Proteins found: {proteinStrings?.length}</h3>
			<ProteinsInCode
				aminoAcidString={rnaData.formattedAminoAcidString[resultIndex]}
				aminoAcidLetterString={
					rnaData.formattedAminoAcidLetterString[resultIndex]
				}
			/>
			<ProteinList proteins={proteinStrings} />
		</div>
	);
}

export default ProteinOverview;
