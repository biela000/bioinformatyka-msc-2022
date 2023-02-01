export default function calculateIsoelectricPoint(protein : string)
{

	let ProtLength = protein.length;

	const Asp = 'D';
	const Glu = 'E';
	const Cys = 'C';
	const Tyr = 'Y';
	const His = 'H';
	const Lys = 'K';
	const Arg = 'R';

	let AspNumber = 0;
	let GluNumber = 0;
	let CysNumber = 0;
	let TyrNumber = 0;
	let HisNumber = 0;
	let LysNumber = 0;
	let ArgNumber = 0;

	let i = 0;


	for (i = 0; i <= protein.length - 1; ++i) {
		if (protein[i] == Asp) {
			++AspNumber;
		}

		if (protein[i] == Glu) {
			++GluNumber;
		}

		if (protein[i] == Cys) {
			++CysNumber;
		}

		if (protein[i] == Tyr) {
			++TyrNumber;
		}

		if (protein[i] == His) {
			++HisNumber;
		}

		if (protein[i] == Lys) {
			++LysNumber;
		}

		if (protein[i] == Arg) {
			++ArgNumber;
		}
	}

	let NQ = 0.0;
	let QN1 = 0;
	let QN2 = 0;
	let QN3 = 0;
	let QN4 = 0;
	let QN5 = 0;
	let QP1 = 0;
	let QP2 = 0;
	let QP3 = 0;
	let QP4 = 0;

	let pH = 6.5;
	let pHprev = 0.0;
	let pHnext = 14.0;
	let X = 0.0;
	let E = 0.01;
	let temp = 0.0;

	for (;;) {
		QN1 = -1 / (1 + Math.pow(10, (3.65 - pH)));
		QN2 = -AspNumber / (1 + Math.pow(10, (3.9 - pH)));
		QN3 = -GluNumber / (1 + Math.pow(10, (4.07 - pH)));
		QN4 = -CysNumber / (1 + Math.pow(10, (8.18 - pH)));
		QN5 = -TyrNumber / (1 + Math.pow(10, (10.46 - pH)));
		QP1 = HisNumber / (1 + Math.pow(10, (pH - 6.04)));
		QP2 = 1 / (1 + Math.pow(10, (pH - 8.2)));
		QP3 = LysNumber / (1 + Math.pow(10, (pH - 10.54)));
		QP4 = ArgNumber / (1 + Math.pow(10, (pH - 12.48)));

		NQ = QN1 + QN2 + QN3 + QN4 + QN5 + QP1 + QP2 + QP3 + QP4;

		if (pH >= 14.0) {
			console.log("Something is wrong - pH is higher than 14");
			break;
		}

		if (NQ < 0) {
			temp = pH;
			pH = pH - ((pH - pHprev) / 2);
			pHnext = temp;
			console.log(`pH: ${pH}, \tpHnext: ${pHnext}`);
		} else {
			temp = pH;
			pH = pH + ((pHnext - pH) / 2);
			pHprev = temp;
			console.log(`pH: ${pH},\tpHprev: ${pHprev}`);
		}

		if ((pH - pHprev < E) && (pHnext - pH < E)) {
			break;
		}
	}

	return pH
}