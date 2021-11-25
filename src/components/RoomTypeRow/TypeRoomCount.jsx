import React, { memo } from "react";
import { connect } from "react-redux";
import { Box } from "../utils/Box";
import { RowWithHover } from "../utils/RowWithHover";

const mapStateToProps = (state) => {
	const { dates } = state.reservations;
	return { dates };
};

export const TypeRoomCount = connect(mapStateToProps)(
	memo(({ dates }) => {
		if (dates.length === 0) return null;
		return (
			<div className="row">
				<div
					className="row_left_bordered"
					style={{ borderTop: "none", borderBottom: "none" }}
				></div>
				<div className="row_right" style={{ position: "relative" }}>
					{dates.map((date, pI) =>
						date.dates.map((el, i) => (
							<>
								<Box key={i} date={el} styles={{ borderTop: "none" }} />
							</>
						))
					)}
					<RowWithHover />
				</div>
			</div>
		);
	})
);
