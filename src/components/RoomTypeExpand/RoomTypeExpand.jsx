import React, { useEffect, useRef, useState, memo } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { connect } from "react-redux";
import { Box } from "../utils/Box";
import { RowWithHover } from "../utils/RowWithHover";
import { BookingsRow } from "./BookingsRow";

const mapStateToProps = (state) => ({ dates: state.reservations.dates });

export const RoomTypeExpand = connect(mapStateToProps)(
	memo(({ room, toggle, dates }) => {
		const [height, setHeight] = useState();
		const contentRef = useRef();

		useEffect(() => {
			if (contentRef.current) {
				if (toggle) {
					setHeight(contentRef.current.scrollHeight);
				} else {
					setHeight(0);
				}
			}
		}, [toggle, contentRef, dates]);

		if (dates.length === 0) return null;

		return (
			<div
				style={{
					position: "relative",
				}}
			>
				<div
					ref={contentRef}
					style={{
						transition: ".3s all ease-in-out",
						overflow: "hidden",
						maxHeight: `${height}px`,
					}}
				>
					{room.roomNumbers.map((roomNumber, i) => (
						<div className="row">
							<div className="row_left_bordered">
								<RoomNumber room={room} roomNumber={roomNumber} index={i} />
								<RoomOptions />
							</div>
							<div className={`row_right`} style={{ position: "relative" }}>
								{dates.map((date, pI) =>
									date.dates.map((el, i) => {
										return (
											<>
												<Box
													key={i}
													date={el}
													styles={{ borderTop: "none" }}
												></Box>
											</>
										);
									})
								)}
								<RowWithHover />

								<BookingsRow bookings={roomNumber.bookings} />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	})
);

const RoomOptions = () => {
	const [showOptions, setShowOptions] = useState(false);
	const onFocus = () => {
		setShowOptions(true);
	};

	const onBlur = () => {
		setShowOptions(false);
	};

	return (
		<button
			onFocus={onFocus}
			onBlur={onBlur}
			style={{
				cursor: "pointer",
				display: "flex",
				alignItems: "center",
				backgroundColor: "transparent",
				border: "none",
				padding: "0rem .5rem 0rem .5rem",
			}}
		>
			<BiDotsHorizontalRounded size={20} color="#aaa" />

			<div
				className="room_dropdown_options"
				style={{
					display: showOptions ? "block" : "none",
				}}
			>
				<div className="room_dropdown_option">Clean</div>
				<div className="room_dropdown_option">Cleaning</div>
				<div className="room_dropdown_option">Dirty</div>
				<div className="room_dropdown_option">Out of service</div>
			</div>
		</button>
	);
};

const RoomNumber = ({ roomNumber, room, index }) => {
	const [showRoom, setShowRoom] = useState(false);
	const [top, setTop] = useState(false);

	useEffect(() => {
		const parentEl = document.getElementById(`${roomNumber.number}`);
		parentEl.addEventListener("mousemove", hovering);
		parentEl.addEventListener("mouseleave", out);

		return () => {
			parentEl.removeEventListener("mousemove", hovering);
			parentEl.removeEventListener("mousemove", out);
		};
	}, [showRoom]);

	const hovering = (e) => {
		if (!showRoom) {
			if (e.clientY + 550 > window.innerHeight) {
				setTop(true);
			} else {
				setTop(false);
			}
			setShowRoom(true);
		}
	};

	const out = () => {
		setShowRoom(false);
	};

	return (
		<div id={`${roomNumber.number}`} className="room_number_text">
			<div
				style={{
					width: "12px",
					height: "12px",
					backgroundColor: roomNumber.active ? "#58AE9A" : "#DE6466",
					borderRadius: "3px",
				}}
			></div>
			{roomNumber.number}

			<div
				style={{
					position: "absolute",
					top: top ? `-${500 - 50 * index}px` : `${30 + 50 * index}px`,
					left: "80px",
					width: "250px",
					display: showRoom ? "block" : "none",
					zIndex: 200,
				}}
			>
				<div style={{ pointerEvents: "none" }}>
					<img
						src={`https://source.unsplash.com/1600x900/?${room.roomType}`}
						style={{
							width: "100%",
							height: "150px",
							objectFit: "cover",
							borderStartStartRadius: "3px",
							borderStartEndRadius: "3px",
							display: "block",
							boxShadow:
								"10px 8px 10px -15px rgba(0, 0, 0, 0.75), -10px -8px 7px -15px rgba(0, 0, 0, 0.75)",
						}}
					/>
				</div>
				<div
					style={{
						backgroundColor: "#fff",
						padding: "1rem 1rem 1rem 1rem",
						boxShadow:
							"10px 8px 10px -15px rgba(0, 0, 0, 0.75), -10px -8px 7px -15px rgba(0, 0, 0, 0.75)",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						pointerEvents: "none",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<span style={{ fontWeight: "bold" }}>Room {roomNumber.number}</span>
						<span>( {room.roomType} )</span>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<span style={{ display: "flex", gap: ".3rem" }}>
							Floor:<span style={{ fontWeight: "bold" }}>01</span>
						</span>
						<span style={{ display: "flex", gap: ".3rem" }}>
							Area:
							<span style={{ fontWeight: "bold" }}>40</span>
						</span>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: ".4rem",
							}}
						>
							<span style={{ display: "flex", gap: ".3rem" }}>
								Capacity:
								<span style={{ fontWeight: "bold" }}>4</span>
							</span>
							<span style={{ display: "flex", gap: ".3rem" }}>
								max:
								<span style={{ fontWeight: "bold" }}>4</span>
							</span>
						</div>
						<span style={{ display: "flex", gap: ".3rem" }}>
							Cleaning required:
							<span style={{ fontWeight: "bold" }}>No</span>
						</span>
					</div>
					<div>
						<span style={{ fontWeight: "bold" }}>Facilities: </span>
						<div
							style={{
								maxHeight: "130px",
								overflow: "auto",
								display: "flex",
								flexWrap: "wrap",
								gap: ".5rem",
								marginTop: ".4rem",
								pointerEvents: "all",
							}}
						>
							{[
								"Bathroom",
								"Hairdryer",
								"Bath",
								"Bathrome",
								"Free toiletries",
								"Heating",
								"Dressing Room",
								"Garden View",
								"Desk",
								"Refregirator",
							].map((el) => (
								<div
									style={{
										backgroundColor: "#eee",
										padding: ".4rem .7rem",
										fontSize: "12px",
										borderRadius: "4px",
									}}
								>
									{/* Icon here */}
									<span>{el}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
