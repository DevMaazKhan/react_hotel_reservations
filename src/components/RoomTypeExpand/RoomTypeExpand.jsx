import React, { useEffect, useRef, useState } from "react";
import { RoomBookings } from "../RoomBookings/RoomBooking";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export function RoomTypeExpand({
	room,
	currentSingleDateWidth,
	dates,
	hoveredIndex,
	setHoveredIndex,
	toggle,
}) {
	const [height, setHeight] = useState();
	const contentRef = useRef();

	useEffect(() => {
		if (toggle) {
			setHeight(contentRef.current.scrollHeight);
		} else {
			setHeight(0);
		}
	}, [toggle]);

	return (
		<div
			ref={contentRef}
			style={{
				maxHeight: `${height}px`,
				overflow: "hidden",
				transition: ".3s all ease-in-out",
			}}
		>
			{room.roomNumbers.map((roomNumber) => (
				<div className="row">
					<div className="row_left_bordered">
						<span
							style={{
								display: "flex",
								alignItems: "center",
								gap: ".5rem",
								fontWeight: "normal",
							}}
						>
							<div
								style={{
									width: "12px",
									height: "12px",
									backgroundColor: roomNumber.active ? "#58AE9A" : "#DE6466",
									borderRadius: "3px",
								}}
							></div>
							{roomNumber.number}
						</span>
						<div
							style={{
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
							}}
						>
							<BiDotsHorizontalRounded size={20} color="#aaa" />
						</div>
					</div>
					<RoomBookings
						currentSingleDateWidth={currentSingleDateWidth}
						dates={dates}
						hoveredIndex={hoveredIndex}
						setHoveredIndex={setHoveredIndex}
						roomBookings={roomNumber}
					/>
				</div>
			))}
		</div>
	);
}
