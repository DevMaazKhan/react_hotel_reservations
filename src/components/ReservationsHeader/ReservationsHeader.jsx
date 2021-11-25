import React, { memo } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux";
import { Dates } from "./Dates/Dates";

const mapStateToProps = (state) => {
	const { expandAll } = state.reservations;
	return {
		expandAll,
	};
};

export const ReservationsHeader = connect(mapStateToProps)(
	memo(({ expandAll }) => {
		const dispatch = useDispatch();
		const { setExpandAll } = bindActionCreators(actionCreators, dispatch);

		return (
			<div className="row">
				<div
					className="row_left_bordered"
					style={{
						padding: "1rem 1rem .4rem 1rem",
						alignItems: "flex-end",
					}}
				>
					<span style={{ fontWeight: "bold" }}>Rooms</span>
					<div onClick={setExpandAll}>
						<AiFillCaretDown
							color="#33A1FD"
							style={{
								cursor: "pointer",
								transition: ".3s all ease-in-out",
								transform: `rotate(${expandAll ? "0" : "180"}deg)`,
							}}
						/>
					</div>
				</div>
				<Dates />
			</div>
		);
	})
);

// [
// 	{
// 		monthName: '',
// 		dates: [{date: '', day: ''}, {date: '', day: ''}]
// 	}
// 	{
// 		monthName: 'Dec',
// 		dates: [{date: '', day: ''}, {date: '', day: ''}]
// 	}
// ]
