import React from "react";
import classes from "./ResultPage.module.scss";
import { useAppSelector } from "../../store/storeHooks";
import { NavLink } from "react-router-dom";
import ProteinOverview from "../../components/ResultPage/ProteinOverview/ProteinOverview";

function ResultPage() {
	const rnaData = useAppSelector(state => state.protein);
	const handleActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
		return isActive ? classes['active-link'] : '';
	}

	console.log(rnaData);
	return (
		<div data-testid="ResultPageComponent">
			<ProteinOverview />
			<div className={classes['result-links']} data-testid="ShiftPageLinkContainer">
				<NavLink to="/result/1" className={handleActiveLinkClass} data-testid="ShiftPageLink1">1</NavLink>
				<NavLink to="/result/2" className={handleActiveLinkClass} data-testid="ShiftPageLink2">2</NavLink>
				<NavLink to="/result/3" className={handleActiveLinkClass} data-testid="ShiftPageLink3">3</NavLink>
			</div>
		</div>
	);
}

export default ResultPage;