import React from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux";

const mapStateToProps = (state, ownProps) => {
	const { currentSingleDateWidth } = state.reservations;
	const { children, date, styles } = ownProps;
	return {
		currentSingleDateWidth,
		children,
		date,
		styles,
	};
};

export const Box = connect(mapStateToProps)(
	({ children, currentSingleDateWidth, date, styles }) => {
		return (
			<div
				className={`date ${date.activeDate && "activeDate_bordered"} ${
					(date.day === "Sat" || date.day === "Sun") && "weekend_bordered"
				}`}
				style={{
					...styles,
					width: `${currentSingleDateWidth}px`,
				}}
			>
				{children}
			</div>
		);
	}
);
