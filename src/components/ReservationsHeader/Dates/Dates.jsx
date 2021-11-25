import React, { memo } from "react";
import { connect } from "react-redux";
import { Date } from "./Date";

const mapStateToProps = (state) => {
	const { dates, currentSingleDateWidth } = state.reservations;
	return {
		dates,
		currentSingleDateWidth,
	};
};

export const Dates = memo(
	connect(mapStateToProps)(({ dates, currentSingleDateWidth }) => {
		return (
			<div className="row_right" id="parent">
				<div className="inner">
					{dates.map((date) => (
						<div className="month">
							<div
								className="monthName"
								style={{
									width: `calc(${
										currentSingleDateWidth * date.dates.length
									} + 1.5rem)`,
								}}
							>
								<span>{date.monthName}</span>
							</div>
							<div className="dates">
								{date.dates.map((el) => (
									<Date date={el} />
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	})
);
