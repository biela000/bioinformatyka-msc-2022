import React from "react";
import ProteinsInCode from "./ProteinsInCode/ProteinsInCode";
import ProteinList from "./ProteinList/ProteinList";
import { useAppSelector } from "../../../store/storeHooks";
import { useParams } from "react-router-dom";
import classes from "./ProteinOverview.module.scss";

function ProteinOverview() {
	const rnaData = useAppSelector(state => state.protein);
	const { id } = useParams();
	const resultIndex = parseInt(id!) - 1;
	const aminoAcidElements = [];

	let isStarted = false;
	for (let i = 0; i < rnaData.translatedAminoAcids[resultIndex].length; i++) {
		if (rnaData.translatedAminoAcids[resultIndex][i].isStart) {
			isStarted = true;
		}
		const isElementStop = rnaData.translatedAminoAcids[resultIndex][i].isStop;
		if (isElementStop) {
			isStarted = false;
		}
		aminoAcidElements.push(<span key={i} className={`${classes['amino-acid']} ${isStarted ? classes['protein-part'] : isElementStop ? classes.stop : ''}`}>{rnaData.translatedAminoAcids[resultIndex][i].aminoAcidLetter}</span>)
	}

	const proteinStrings = rnaData.proteins[resultIndex].map(protein => {
		return protein.map(codon => codon.aminoAcidLetter).join('');
	});

	return (
		<div>
			<h3>Proteins found: {proteinStrings.length}</h3>
			<ProteinsInCode aminoAcidElements={aminoAcidElements} />
			<ProteinList proteins={proteinStrings} />
		</div>
	)
}

export default ProteinOverview;