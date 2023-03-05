export default function calculateIsoelectricPoint(protein : string)
{
	const aminoAcidCount = {
		'D': 0,
		'E': 0,
		'C': 0,
		'Y': 0,
		'H': 0,
		'K': 0,
		'R': 0,
	}

	for (let i = 0; i <= protein.length - 1; ++i) {
		if (/[DECYHKR]/g.test(protein[i])) {
			aminoAcidCount[protein[i] as 'D' | 'E' | 'C' | 'Y' | 'H' | 'K' | 'R']++;
		}
	}

	let pH = 6.5;
	let pHprev = 0.0;
	let pHnext = 14.0;
	const E = 0.01;

	for (;;) {
		const QN1 = -1 / (1 + Math.pow(10, (3.65 - pH)));
		const QN2 = -aminoAcidCount['D'] / (1 + Math.pow(10, (3.9 - pH)));
		const QN3 = -aminoAcidCount['E'] / (1 + Math.pow(10, (4.07 - pH)));
		const QN4 = -aminoAcidCount['C'] / (1 + Math.pow(10, (8.18 - pH)));
		const QN5 = -aminoAcidCount['Y'] / (1 + Math.pow(10, (10.46 - pH)));
		const QP1 = aminoAcidCount['H'] / (1 + Math.pow(10, (pH - 6.04)));
		const QP2 = 1 / (1 + Math.pow(10, (pH - 8.2)));
		const QP3 = aminoAcidCount['K'] / (1 + Math.pow(10, (pH - 10.54)));
		const QP4 = aminoAcidCount['R'] / (1 + Math.pow(10, (pH - 12.48)));

		const NQ = QN1 + QN2 + QN3 + QN4 + QN5 + QP1 + QP2 + QP3 + QP4;

		if (pH >= 14.0) {
			break;
		}

		if (NQ < 0) {
			const temp = pH;
			pH = pH - ((pH - pHprev) / 2);
			pHnext = temp;
		} else {
			const temp = pH;
			pH = pH + ((pHnext - pH) / 2);
			pHprev = temp;
		}

		if ((pH - pHprev < E) && (pHnext - pH < E)) {
			break;
		}
	}

	return pH
}