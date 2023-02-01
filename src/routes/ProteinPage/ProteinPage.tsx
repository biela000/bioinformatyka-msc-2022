import React from 'react';
import classes from './ProteinPage.module.scss';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ProteinState } from '../../store/slices/proteinSlice';
import AminoAcidChain from '../../components/ProteinPage/AminoAcidChain/AminoAcidChain';
import ProteinStructure from '../../components/ProteinPage/ProteinStructure/ProteinStructure';

function ProteinPage() {
	const shiftId = parseInt(useParams().id ?? '1') - 1;
	const proteinId = parseInt(useParams().proteinId ?? '1') - 1;
	const protein = useSelector(
		(state: { protein: ProteinState }) =>
			state.protein.proteins[shiftId][proteinId],
	);
	const proteinString = protein.aminoAcidChain
		.map(aminoAcid => aminoAcid.aminoAcidLetter)
		.join('');

	return (
		<div className={classes.proteinPage} data-testid="ProteinPageComponent">
			<AminoAcidChain chain={protein.aminoAcidChain} />
			<ProteinStructure
				proteinString={proteinString}
				mass={protein.mass}
			/>
			<Link
				to={`/result/${shiftId + 1}/protein/${proteinId + 1}/details`}
				className={classes['protein-link']}
			>
				Details
			</Link>
		</div>
	);
}

export default ProteinPage;
