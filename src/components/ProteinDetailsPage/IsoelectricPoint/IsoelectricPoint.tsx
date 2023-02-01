import { Scatter } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
} from 'chart.js';
import calculateIsoelectricPoint from './calculateIsoelectricPoint';
import { Codon } from '../../../types/proteinTypes';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export interface IsoelectricPointProps {
	chain: Codon[];
}

export default function IsoelectricPoint({ chain }: IsoelectricPointProps) {
	const pI = calculateIsoelectricPoint(chain.join(''))
	const options = {
		scales: {
			x: {
				min: 0,
				max: 14,
			},
			y: {
				min: -2,
				max: 2,
				ticks: {
					stepSize: 1
				}
			},

		},
		title: "Isoelectric Point (pI)"
	};
	const data = {
		labels: [pI + "pH"],
		datasets: [
			{
				label: "Isoelectric Point",
				data: [{ x: pI, y: 0 }],
				borderColor: "rgb(0,255,166)",
				backgroundColor: "rgba(0,255,166,0.5)",
				pointStyle: "circle",
				pointRadius: 5
			},
		],
	};
	return (
		<div style={{ maxWidth: '1000px'}}>
			<Scatter data={data} options={options} />
		</div>
	);
}
