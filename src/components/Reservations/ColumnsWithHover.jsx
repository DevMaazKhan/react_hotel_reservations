import React from "react";
import { connect } from "react-redux";
import { ColumnWithHover } from "../utils/ColumnWithHover";

const mapStateToProps = (state) => {
	const { totalDatesInARow } = state.reservations;
	return {
		totalDatesInARow,
	};
};

export const ColumnsWithHover = connect(mapStateToProps)(
	({ totalDatesInARow }) => {
		if (totalDatesInARow === 0) return null;

		return (
			<>
				{Array(totalDatesInARow)
					.fill(0)
					.map((val, i) => (
						<ColumnWithHover index={i} />
					))}
			</>
		);
	}
);
