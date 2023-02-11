import React, { useState, useMemo } from 'react';
import {Codon} from '../../../types/proteinTypes';
import {AminoAcids} from '../../../utils/aminoAcids';
import {Line} from 'react-chartjs-2';
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip,} from 'chart.js';
import useWindowOptions from '../../../hooks/useWindowOptions';

interface BulkinessProps {
	chain: Codon[];
}

ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	Tooltip,
	PointElement,
);

function Bulkiness({ chain }: BulkinessProps) {
	const { windowOptions, window, handleWindowChange } = useWindowOptions(chain);

	// Omitting the last element because the last element is STOP
	const currentBulkinessValues: number[] = [];
	const labels: number[] = [];

	for (let i = 0; i + window - 1 < chain.length - 1; i++) {
		let sum = 0;
		for (let o = i; o <= i + window - 1; o++) {
			sum +=
				AminoAcids.get(chain[o].aminoAcidLetter)?.bulkiness ?? 0;
		}
		currentBulkinessValues.push(sum / window);
		labels.push(i);
	}

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Bulkiness',
				data: currentBulkinessValues,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				tension: 0.4,
				pointRadius: 0,
			},
		],
	};

	const options = {
		responsive: true,
		animation: false as any,
		scales: {
			x: {
				min: 0,
				max: chain.length - 1,
				ticks: {
					autoSkip: true,
					maxTicksLimit: 20,
				},
			},
		},
	};

	return (
		<div style={{ maxWidth: '1000px'}}>
			{chain.length < 6 && <p>Protein must be at least 6 amino acids long to display its
				hydropathy plot</p>}
			{chain.length >= 6 && (
				<React.Fragment>
					<Line data={data} options={options} />
					<select name="window-select" value={window} onChange={handleWindowChange}>{windowOptions}</select>
				</React.Fragment>
			)}
		</div>
	);
}

export default Bulkiness;