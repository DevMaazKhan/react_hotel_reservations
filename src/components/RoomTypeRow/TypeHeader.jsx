import React, { memo } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { MdDragIndicator } from "react-icons/md";
import { connect } from "react-redux";
import { Box } from "../utils/Box";

const mapStateToProps = (state) => {
	const { expandAll, dates } = state.reservations;
	return {
		dates,
		expandAll,
	};
};

export const TypeHeader = connect(mapStateToProps)(
	memo(({ handleProps, room, dates, expandAll, toggle, setToggle }) => {
		if (dates.length === 0) return null;

		return (
			<div className="row">
				<div
					className="row_left_bordered"
					style={{ borderBottom: "none", padding: "1rem 1rem .4rem 1rem" }}
					{...handleProps}
				>
					<span
						style={{
							fontWeight: "bold",
							display: "flex",
							alignItems: "center",
						}}
					>
						<MdDragIndicator color="#888" />
						{room.roomType}
					</span>
					<div onClick={() => setToggle((curr) => !curr)}>
						<AiFillCaretDown
							color="#33A1FD"
							style={{
								transform: `rotate(${toggle !== 0 ? "-180" : "0"}deg)`,
								transition: ".3s all ease-in-out",
							}}
						/>
					</div>
				</div>
				<div className="row_right">
					{dates.map((date, pI) =>
						date.dates.map((el, i) => (
							<Box key={i} date={el} styles={{ borderBottom: "none" }}>
								<span className={`num num_green`} style={{ zIndex: 2 }}>
									20
								</span>
							</Box>
						))
					)}
				</div>
			</div>
		);
	})
);
