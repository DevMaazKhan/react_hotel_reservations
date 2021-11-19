import moment from "moment";
import React, { useState } from "react";
import { Bookings } from "../Bookings/Bookings";

export function RoomBookings({
	currentSingleDateWidth,
	dates,
	setHoveredIndex,
	hoveredIndex,
	roomBookings,
}) {
	const [hovered, setHovered] = useState(false);

	function toggleHover(e) {
		setHoveredIndex(e.target.dataset.index);
		setHovered((curr) => (curr ? false : true));

		if (e.type === "mouseout") {
			setHoveredIndex();
		}
	}

	return (
		<div className={`row_right`}>
			{dates.map((date) =>
				date.dates.map((el, i) => {
					return (
						<div
							data-index={i}
							onMouseEnter={toggleHover}
							onMouseOut={toggleHover}
							className={`date ${i === +hoveredIndex && "date_hovered"} ${
								hovered && "date_hovered"
							} ${el.activeDate && "activeDate_bordered"} ${
								(el.day === "Sat" || el.day === "Sun") && "weekend_bordered"
							}`}
							style={{
								width: `${currentSingleDateWidth}px`,
								borderTop: "none",
								position: "relative",
							}}
						>
							<Bookings roomBookings={roomBookings} />
						</div>
					);
				})
			)}
		</div>
	);
}
