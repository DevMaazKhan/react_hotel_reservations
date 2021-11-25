import React from "react";
import { connect } from "react-redux";
import { Box } from "../../utils/Box";

const mapStateToProps = (state, ownProps) => {
	return {
		date: ownProps.date,
		classNames: ownProps.classNames,
		currentSingleDateWidth: state.reservations.currentSingleDateWidth,
	};
};

export const Date = connect(mapStateToProps)(
	({ date, currentSingleDateWidth, classNames }) => {
		return (
			<div
				className={`date ${date.activeDate && "activeDate"} ${
					(date.day === "Sat" || date.day === "Sun") && "weekend"
				} `}
				style={{
					maxWidth: `${currentSingleDateWidth}px`,
					width: `${currentSingleDateWidth}px`,
				}}
			>
				<span className="dateText">{date.date}</span>
				<span className="dayText">{date.day}</span>
			</div>
		);
	}
);
