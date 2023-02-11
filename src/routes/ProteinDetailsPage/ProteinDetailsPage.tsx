import React from 'react';
import classes from './ProteinDetailsPage.module.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProteinState } from '../../store/slices/proteinSlice';
import NetCharge from '../../components/ProteinDetailsPage/NetCharge/NetCharge';
import HydropathyIndex from '../../components/ProteinDetailsPage/HydropathyIndex/HydropathyIndex';
import IsoelectricPoint from "../../components/ProteinDetailsPage/IsoelectricPoint/IsoelectricPoint";
import Bulkiness from "../../components/ProteinDetailsPage/Bulkiness/Bulkiness";

function ProteinDetailsPage() {
	const shiftId = parseInt(useParams().id ?? '1') - 1;
	const proteinId = parseInt(useParams().proteinId ?? '1') - 1;
	const protein = useSelector(
		(state: { protein: ProteinState }) =>
			state.protein.proteins[shiftId][proteinId],
	);

	return (
		<div
			className={classes.proteinDetailsPage}
			data-testid="ProteinDetailsPageComponent"
		>
			<NetCharge
				chain={protein.aminoAcidChain}
				netCharge={protein.netCharge}
			/>
			<HydropathyIndex chain={protein.aminoAcidChain} />
			<Bulkiness chain={protein.aminoAcidChain} />
			<IsoelectricPoint chain={protein.aminoAcidChain} />
		</div>

	);
}

export default ProteinDetailsPage;
