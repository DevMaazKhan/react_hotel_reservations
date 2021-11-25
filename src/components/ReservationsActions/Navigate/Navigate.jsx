import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux";

export const Navigate = () => {
	const dispatch = useDispatch();
	const { nextDate, prevDate, todaysDate } = bindActionCreators(
		actionCreators,
		dispatch
	);

	return (
		<div className="buttons">
			<div onClick={prevDate}>
				<MdKeyboardArrowLeft size={20} />
			</div>
			<div onClick={todaysDate}>
				<span>Today</span>
			</div>
			<div onClick={nextDate}>
				<MdKeyboardArrowRight size={20} />
			</div>
		</div>
	);
};
