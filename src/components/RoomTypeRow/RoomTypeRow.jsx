import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { RoomTypeExpand } from "../RoomTypeExpand/RoomTypeExpand";
import { TypeHeader } from "./TypeHeader";
import { TypeRoomCount } from "./TypeRoomCount";

const mapStateToProps = (state) => ({
	expandAll: state.reservations.expandAll,
});

export const RoomTypeRow = connect(mapStateToProps)(
	({ room, index, expandAll }) => {
		const [toggleState, setToggle] = useState();

		useEffect(() => {
			setToggle(expandAll);
		}, [expandAll]);

		return (
			<Draggable draggableId={room.id} index={index} key={room.id}>
				{(provided) => (
					<>
						<div ref={provided.innerRef} {...provided.draggableProps}>
							<TypeHeader
								handleProps={provided.dragHandleProps}
								setToggle={setToggle}
								toggle={toggleState}
								room={room}
							/>
							<TypeRoomCount />
							<RoomTypeExpand room={room} toggle={toggleState} />
						</div>
					</>
				)}
			</Draggable>
		);
	}
);

// ${
// 	pI == hoveredIndex.parentIndex &&
// 	i == hoveredIndex.index &&
// 	"date_hovered"
// }

// ${hovered && "date_hovered"}
