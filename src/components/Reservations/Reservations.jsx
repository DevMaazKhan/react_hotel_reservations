import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { ReservationsHeader } from "../ReservationsHeader/ReservationsHeader";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RoomTypeRow } from "../RoomTypeRow/RoomTypeRow";
import { connect } from "react-redux";

// Importing mock data
import { room1Data } from "../../data/MOCK_DATA";
import { room5Data } from "../../data/MOCK_DATA (1)";
import { room4Data } from "../../data/MOCK_DATA (2)";
import { room3Data } from "../../data/MOCK_DATA (3)";
import { room2Data } from "../../data/MOCK_DATA (4)";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux";
import { ReservationsActions } from "../ReservationsActions/ReservationsActions";
import { RoomsAvailable } from "../RoomsAvailable/RoomsAvailable";
import { ColumnWithHover } from "../utils/ColumnWithHover";
import { ColumnsWithHover } from "./ColumnsWithHover";

const rooms = [
	{
		id: "room-1",
		roomType: "Double",
		roomNumbers: [
			{
				number: "201",
				active: true,
				bookings: [...room1Data],
			},
			{ number: "202", active: false, bookings: [...room3Data] },
		],
	},
	{
		id: "room-2",
		roomType: "Family",
		roomNumbers: [
			{ number: "401", active: true, bookings: [...room2Data] },
			{ number: "402", active: true, bookings: [...room3Data] },
			{ number: "403", active: true, bookings: [...room4Data] },
			{ number: "404", active: false, bookings: [...room1Data] },
		],
	},
	{
		id: "room-3",
		roomType: "Single",
		roomNumbers: [
			{ number: "501", active: true, bookings: [...room5Data] },
			{ number: "502", active: true, bookings: [...room2Data] },
			{ number: "503", active: true, bookings: [...room1Data] },
			{ number: "504", active: true, bookings: [...room3Data] },
		],
	},
	{
		id: "room-4",
		roomType: "Luxuary",
		roomNumbers: [
			{ number: "601", active: true, bookings: [...room4Data] },
			{ number: "602", active: true, bookings: [...room2Data] },
			{ number: "603", active: true, bookings: [...room1Data] },
			{ number: "604", active: true, bookings: [...room3Data] },
		],
	},
	{
		id: "room-5",
		roomType: "Hospitallity",
		roomNumbers: [
			{ number: "701", active: true, bookings: [...room5Data] },
			{ number: "702", active: true, bookings: [...room2Data] },
			{ number: "703", active: true, bookings: [...room1Data] },
			{ number: "704", active: true, bookings: [...room3Data] },
		],
	},
];

export const Reservations = () => {
	const [roomState, setRooms] = useState([...rooms]);

	function onDragEnd(result) {
		const { destination, source, draggableId } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const tempArr = Array.from(roomState);
		const destinationItem = tempArr[source.index];

		tempArr.splice(source.index, 1);
		tempArr.splice(destination.index, 0, destinationItem);

		setRooms([...tempArr]);
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="reservations">
				<ReservationsActions />
				<ReservationsHeader />
				<RoomsAvailable />

				<Droppable droppableId="rooms">
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							style={{ position: "relative" }}
							id="hover"
						>
							{roomState.map((room, i) => (
								<RoomTypeRow key={room.id} index={i} room={room} />
							))}

							<ColumnsWithHover />
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
};
