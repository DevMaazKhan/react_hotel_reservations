import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillCaretDown } from "react-icons/ai";
import { MdDragIndicator } from "react-icons/md";
import { RoomTypeExpand } from "../RoomTypeExpand/RoomTypeExpand";

export function RoomTypeRow({
	room,
	dates,
	currentSingleDateWidth,
	index,
	expand,
	hoveredIndex,
	setHoveredIndex,
}) {
	const [height, setHeight] = useState(0);
	const [hovered, setHovered] = useState(false);
	const [toggleState, setToggle] = useState(expand);
	const contentRef = useRef(null);

	function toggleHover(e) {
		setHoveredIndex(e.target.dataset.index);

		setHovered((curr) => (curr ? false : true));

		if (e.type === "mouseout") {
			setHoveredIndex();
		}
	}

	return (
		<Draggable draggableId={room.id} index={index} key={room.id}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<div className="row">
						<div
							className="row_left_bordered"
							style={{ borderBottom: "none" }}
							{...provided.dragHandleProps}
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
										transform: `rotate(${height !== 0 ? "-180" : "0"}deg)`,
										transition: ".3s all ease-in-out",
									}}
								/>
							</div>
						</div>
						<div className="row_right">
							{dates.map((date) =>
								date.dates.map((el, i) => (
									<div
										data-index={i}
										onMouseEnter={toggleHover}
										onMouseOut={toggleHover}
										className={`date ${i === +hoveredIndex && "date_hovered"} ${
											el.activeDate && "activeDate_bordered"
										} ${
											(el.day === "Sat" || el.day === "Sun") &&
											"weekend_bordered"
										}`}
										style={{
											width: `${currentSingleDateWidth}px`,
											borderBottom: "none",
										}}
									>
										<span className={`num num_green`}>20</span>
									</div>
								))
							)}
						</div>
					</div>
					<div className="row">
						<div
							className="row_left_bordered"
							style={{ borderTop: "none", borderBottom: "none" }}
						></div>
						<div className="row_right">
							{dates.map((date) =>
								date.dates.map((el, i) => (
									<div
										data-index={i}
										onMouseEnter={toggleHover}
										onMouseOut={toggleHover}
										className={`date ${i === +hoveredIndex && "date_hovered"} ${
											hovered && "date_hovered"
										} ${el.activeDate && "activeDate_bordered"} ${
											(el.day === "Sat" || el.day === "Sun") &&
											"weekend_bordered"
										}`}
										style={{
											width: `${currentSingleDateWidth}px`,
											borderTop: "none",
										}}
									></div>
								))
							)}
						</div>
					</div>
					<RoomTypeExpand
						room={room}
						currentSingleDateWidth={currentSingleDateWidth}
						dates={dates}
						hoveredIndex={hoveredIndex}
						setHoveredIndex={setHoveredIndex}
						toggleHover={toggleHover}
						expand={expand}
						toggle={toggleState}
					/>
				</div>
			)}
		</Draggable>
	);
}
