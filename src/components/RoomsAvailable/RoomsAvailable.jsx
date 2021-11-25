import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	const { dates, currentSingleDateWidth } = state.reservations;
	return {
		dates,
		currentSingleDateWidth,
	};
};

export const RoomsAvailable = connect(mapStateToProps)(
	({ dates, currentSingleDateWidth }) => {
		return (
			<div className="row">
				<div className="row_left"></div>
				<div className="row_right">
					{dates.map((date) =>
						date.dates.map((el) => (
							<div
								className={`date`}
								style={{
									width: `${currentSingleDateWidth}px`,
									border: "none",
								}}
							>
								<span className={`num num_green`}>10</span>
							</div>
						))
					)}
				</div>
			</div>
		);
	}
);
