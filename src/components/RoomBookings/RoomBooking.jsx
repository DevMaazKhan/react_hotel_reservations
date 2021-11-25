import moment from "moment";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Bookings } from "../Bookings/Bookings";
import { Box } from "../utils/Box";

const mapStateToProps = (state, ownProps) => {
	const { currentSingleDateWidth, dates } = state.reservations;
	const { roomBookings } = ownProps;
	return {
		roomBookings,
		currentSingleDateWidth,
		dates,
	};
};

export const RoomBookings = connect(mapStateToProps)(
	({ roomBookings, dates }) => {
		const [hovered, setHovered] = useState(false);

		function toggleHover(e) {
			setHovered((curr) => (curr ? false : true));
		}

		return <div></div>;
	}
);
