import styles from './PossibleProteinDisplay.module.scss';
import { Codon } from '../../../types/proteinTypes';

interface PossibleProteinDisplayProps {
	protein: Codon[];
}

function PossibleProteinDisplay({ protein }: PossibleProteinDisplayProps) {
	return (
		<div>
			{protein.map((codon, i) => {
				return (
					<div className={styles['codon-div']} key={i}>
						<p className={styles.codonAminoAcid}>
							{codon.aminoAcidLetter}
						</p>
						<p className={styles.codonThreeLetter}>
							{codon.threeLetterCode}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export default PossibleProteinDisplay;
