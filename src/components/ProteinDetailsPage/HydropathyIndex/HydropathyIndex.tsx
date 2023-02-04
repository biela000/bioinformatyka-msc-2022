import React from 'react';
import {Codon} from '../../../types/proteinTypes';
import {AminoAcids} from '../../../utils/aminoAcids';
import {Line} from 'react-chartjs-2';
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip,} from 'chart.js';

interface HydropathyIndexProps {
	chain: Codon[];
}

ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	Tooltip,
	PointElement,
);

function HydropathyIndex({ chain }: HydropathyIndexProps) {
	// Omitting the last element because the last element is STOP
	const currentChainHydropathyIndexes: number[] = [];
	const labels: number[] = [];

	for (let i = 0; i + 8 < chain.length; i++) {
		let sum = 0;
		for (let o = i; o <= i + 8; o++) {
			sum +=
				AminoAcids.get(chain[o].aminoAcidLetter)?.hydropathyIndex ?? 0;
		}
		currentChainHydropathyIndexes.push(sum / 9);
		labels.push(i);
	}

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Hydropathy Index',
				data: currentChainHydropathyIndexes,
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
			<Line data={data} options={options} />
		</div>
	);
}

export default HydropathyIndex;
