import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	const { totalDatesInARow, dates, currentSingleDateWidth } =
		state.reservations;
	return {
		totalDatesInARow,
		dates,
		currentSingleDateWidth,
	};
};

export const BookingsRow = connect(mapStateToProps)(
	memo(({ totalDatesInARow, dates, bookings, currentSingleDateWidth }) => {
		const [bookingsRowItems, setBookingsRowItems] = useState([]);

		useEffect(() => {
			if (dates) generateBookingsRow();
		}, [dates]);

		function generateBookingsRow() {
			const tempBookings = [];
			const startDate = dates[0].dates[0];
			const lastDate =
				dates[dates.length - 1].dates[dates[dates.length - 1].dates.length - 1];
			const startDateMoment = moment(`${startDate.date} ${dates[0].monthName}`);
			const endDateMoment = moment(
				`${lastDate.date} ${dates[dates.length - 1].monthName}`
			);

			for (let i = 0; i < bookings.length; i++) {
				const booking = { ...bookings[i] };
				const bookingStartDateMoment = moment(booking.startsAt);
				const bookingEndDate = moment(booking.endsAt);
				if (
					bookingStartDateMoment.isSameOrAfter(startDateMoment) &&
					bookingStartDateMoment.isSameOrBefore(endDateMoment)
				) {
					const totalDays = bookingEndDate.diff(bookingStartDateMoment, "days");
					const bookingWidth = totalDays * currentSingleDateWidth;
					const diffFronFirstDate = bookingStartDateMoment.diff(
						startDateMoment,
						"days"
					);

					tempBookings.push({
						...booking,
						bookingWidth,
						x:
							diffFronFirstDate * currentSingleDateWidth +
							currentSingleDateWidth / 2,
					});
				}

				if (
					bookingEndDate.isSameOrBefore(endDateMoment) &&
					bookingEndDate.isSameOrAfter(startDateMoment) &&
					bookingStartDateMoment.isBefore(startDateMoment)
				) {
					const totalDays = bookingEndDate.diff(startDateMoment, "days");
					const bookingWidth =
						totalDays * currentSingleDateWidth + currentSingleDateWidth / 2;
					tempBookings.push({
						...booking,
						bookingWidth,
						x: 0,
					});
				}
			}

			setBookingsRowItems([...tempBookings]);
		}

		if (bookingsRowItems.length === 0) return null;
		return (
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "transparent",
					zIndex: 100,
				}}
			>
				{bookingsRowItems.map((el) => (
					<div
						style={{
							transform: `translateX(${el.x}px)`,
							width: `${el.bookingWidth}px`,
							backgroundColor:
								el.status !== "Processing"
									? "rgba(190, 231, 248, .8)"
									: "rgba(179, 222, 219, .8)",
							height: "100%",
							display: "flex",
							alignItems: "center",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							overflow: "hidden",
							padding: "0rem 1rem",
							position: "absolute",
						}}
					>
						<span
							style={{
								color: el.status !== "Processing" ? "#68C6ED" : "#59B59D",
								fontWeight: "bold",
							}}
						>
							{el.name}
						</span>
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "4px",
								height: "100%",
								backgroundColor:
									el.status !== "Processing" ? "#68C6ED" : "#59B59D",
							}}
						></div>
						<div
							style={{
								position: "absolute",
								top: 0,
								right: 0,
								width: "50px",
								height: "100%",
								backgroundImage: `linear-gradient(to right, transparent 10%, ${
									el.status !== "Processing"
										? "rgba(190, 231, 248, 1)"
										: "rgba(179, 222, 219, 1)"
								} 90%)`,
							}}
						></div>
					</div>
				))}
			</div>
		);
	})
);
