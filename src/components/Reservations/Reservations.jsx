import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { ReservationsHeader } from "../ReservationsHeader/ReservationsHeader";
import moment from "moment";
import { useContainerDimensions } from "../../hooks/useCurrentDimenssions";
import {
	MdKeyboardArrowLeft,
	MdKeyboardArrowRight,
	MdDragIndicator,
} from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RoomTypeRow } from "../RoomTypeRow/RoomTypeRow";

// Importing mock data
import { room1Data } from "../../data/MOCK_DATA";
import { room5Data } from "../../data/MOCK_DATA (1)";
import { room4Data } from "../../data/MOCK_DATA (2)";
import { room3Data } from "../../data/MOCK_DATA (3)";
import { room2Data } from "../../data/MOCK_DATA (4)";

let flag1 = true;
let flag2 = true;
let flag3 = true;
let flag4 = true;

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

export function Reservations() {
	const [dates, setDates] = useState([]);
	const [currentSingleDateWidth, setCurrentSingleDateWidth] = useState(0);
	const [totalDatesInARow, setTotalDatesInARow] = useState(0);
	const [zoomLevel, setZoomLevel] = useState(0);
	const [roomState, setRooms] = useState([...rooms]);
	const [expandAll, setExpandAll] = useState(true);
	const [hoveredIndex, setHoveredIndex] = useState();

	const parentRef = useRef();

	const { width, recalculate } = useContainerDimensions(parentRef);

	useEffect(() => {
		recalculate();
	}, [dates]);

	useEffect(() => {
		if (width < 1420 && width > 1000) {
			setCurrentSingleDateWidth(width / totalDatesInARow);
		} else if (width < 1000 && width > 600) {
			setCurrentSingleDateWidth(width / totalDatesInARow);
		} else if (width < 600) {
			setCurrentSingleDateWidth(width / totalDatesInARow);
		} else {
			setCurrentSingleDateWidth(width / totalDatesInARow);
		}
	}, [width, totalDatesInARow]);

	useEffect(() => {
		if (width < 1420 && width > 1000 && flag1) {
			setTotalDatesInARow(17);
			flag1 = false;
			flag4 = true;
			flag2 = true;
			flag3 = true;
		} else if (width < 1000 && width > 600 && flag2) {
			setTotalDatesInARow(13);
			flag2 = false;
			flag1 = true;
			flag4 = true;
			flag3 = true;
		} else if (width < 600 && width > 10 && flag3) {
			console.log("object");
			setTotalDatesInARow(5);
			flag3 = false;
			flag1 = true;
			flag2 = true;
			flag4 = true;
		} else if (width > 1420 && flag4) {
			setTotalDatesInARow(23);
			flag4 = false;
			flag1 = true;
			flag2 = true;
			flag3 = true;
		}
	}, [width]);

	useEffect(() => {
		getDates(totalDatesInARow);
	}, [totalDatesInARow]);

	useEffect(() => {
		// It is called when the component is loaded
		getDates(totalDatesInARow);
	}, []);

	/**
	 * This Function will set dates state to the correct date format, which is shown at the bottom of this component
	 */
	const getDates = (noOfDates) => {
		// Get Current Date
		const todayDate = moment();
		// Get Previos Dates
		const prevDates = getPrevDates(todayDate, Math.floor(noOfDates / 2));
		// Get Next Dates
		const nextDates = getNextDates(todayDate, Math.floor(noOfDates / 2));
		// Merging all dates into 1 variable
		const allDates = [...prevDates, todayDate, ...nextDates];
		// Getting final dates in the correct format
		const finalDates = getFinalDates(allDates, todayDate);
		// Setting dates state
		setDates([...finalDates]);
	};

	/**
	 * This function will get 15 dates previous to the given date
	 * @param {date} date
	 * @returns previous dates of the given date
	 */
	function getPrevDates(date, noOfDates) {
		const todayDate = date.clone();
		const dates = [];
		for (let i = 1; i <= noOfDates; i++) {
			let nextDate = moment(todayDate.subtract(1, "day"));
			dates.push(nextDate);
		}

		return dates.reverse();
	}

	/**
	 * This function will get 15 dates next to the given date
	 *
	 * @param {date} date
	 * @returns next dates of the given date
	 */
	function getNextDates(date, noOfDates) {
		const todayDate = date.clone();
		const dates = [];

		for (let i = 1; i <= noOfDates; i++) {
			let nextDate = moment(todayDate.add(1, "day"));
			dates.push(nextDate);
		}

		return dates;
	}

	/**
	 * This function will return the fromated dates in the format given below the component
	 * @param {dates} dates dates to be fromatted
	 * @param {todayDate} todayDate if passed will set the matching date in dates array to the activeDate
	 * @returns formatted dates (Format which is shown below the component)
	 */
	function getFinalDates(dates, todayDate) {
		const tempArr = [];
		let tempObj = {};
		for (let i = 0; i < dates.length; i++) {
			const currMonth = dates[i].format("MMM") + " " + dates[i].format("YYYY");
			const currDate = dates[i].format("DD");
			const currDay = dates[i].format("ddd");
			const activeDate =
				currMonth ===
					todayDate.format("MMM") + " " + todayDate.format("YYYY") &&
				currDate === todayDate.format("DD")
					? true
					: false;

			// Checking if the loop is running first time
			if (!tempObj.monthName) {
				tempObj.monthName = currMonth;
				tempObj.dates = [{ date: currDate, day: currDay, activeDate }];
			} else if (tempObj.monthName !== currMonth) {
				// if all dates of the month has ended, and the next date is of another month
				tempArr.push(tempObj);
				tempObj = {};
				tempObj.monthName = currMonth;
				tempObj.dates = [{ date: currDate, day: currDay, activeDate }];
			} else {
				// If the month is same as of prev date month
				tempObj.dates = [
					...tempObj.dates,
					{ date: currDate, day: currDay, activeDate },
				];
			}
		}
		tempArr.push(tempObj);
		return tempArr;
	}

	/**
	 * This function is running when the next button in the UI is pressed, It will generate next date and remove first date
	 */
	function next() {
		getNextDate();
	}

	/**
	 * This function is running when the Prev button in the UI is pressed, It will generate Prev date and remove last date
	 */
	function prev() {
		const todayDate = moment();
		let tempDates = [...dates];
		const lastMonth = dates[0].monthName;
		const lastDate = dates[0].dates[0];

		const tempDate = moment(`${lastDate.date} ${lastMonth}`);
		const prevDate = tempDate.clone();
		prevDate.subtract(1, "day");

		const activeDate =
			prevDate.format("MMM") + " " + prevDate.format("YYYY") ===
				todayDate.format("MMM") + " " + todayDate.format("YYYY") &&
			prevDate.format("DD") === todayDate.format("DD")
				? true
				: false;

		if (prevDate.format("MMM") === tempDate.format("MMM")) {
			removeLastDay(tempDates);
			tempDates[0] = {
				...tempDates[0],
				dates: [
					{
						date: prevDate.format("DD"),
						day: prevDate.format("ddd"),
						activeDate,
					},
					...tempDates[0].dates,
				],
			};

			setDates([...tempDates]);
		} else {
			removeLastDay(tempDates);
			tempDates = [
				{
					monthName: `${prevDate.format("MMM")} ${prevDate.format("YYYY")}`,
					dates: [
						{
							date: prevDate.format("DD"),
							day: prevDate.format("ddd"),
							activeDate,
						},
					],
				},
				...tempDates,
			];
			setDates([...tempDates]);
		}
	}

	function getNextDate() {
		const todayDate = moment();
		let tempDates = [...dates];
		const lastMonth = dates[dates.length - 1].monthName;
		const lastDate =
			dates[dates.length - 1].dates[dates[dates.length - 1].dates.length - 1];

		const tempDate = moment(`${lastDate.date} ${lastMonth}`);
		const nextDate = tempDate.clone();
		nextDate.add(1, "day");

		const activeDate =
			nextDate.format("MMM") + " " + nextDate.format("YYYY") ===
				todayDate.format("MMM") + " " + todayDate.format("YYYY") &&
			nextDate.format("DD") === todayDate.format("DD")
				? true
				: false;

		if (tempDate.format("MMM") === nextDate.format("MMM")) {
			removeFirstDay(tempDates);
			tempDates[tempDates.length - 1] = {
				...tempDates[tempDates.length - 1],
				dates: [
					...tempDates[tempDates.length - 1].dates,
					{
						date: nextDate.format("DD"),
						day: nextDate.format("ddd"),
						activeDate,
					},
				],
			};

			setDates([...tempDates]);
		} else {
			removeFirstDay(tempDates);
			tempDates = [
				...tempDates,
				{
					monthName: `${nextDate.format("MMM")} ${nextDate.format("YYYY")}`,
					dates: [
						{
							date: nextDate.format("DD"),
							day: nextDate.format("ddd"),
							activeDate,
						},
					],
				},
			];
			setDates([...tempDates]);
		}
	}

	/**
	 * This function will remove the first date from the given dates.
	 * @param {dates} dates dates from which the first date has to be removed
	 */
	function removeFirstDay(dates) {
		if (dates[0].dates.length === 1) {
			dates.splice("0", 1);
		} else {
			dates[0].dates.splice("0", 1);
		}
	}

	/**
	 * This function will remove the last date from the given dates.
	 * @param {dates} dates dates from which the last date has to be removed
	 */
	function removeLastDay(dates) {
		if (dates[dates.length - 1].dates.length === 1) {
			dates.splice(`${dates.length - 1}`, 1);
		} else {
			dates[dates.length - 1].dates.splice(
				`${dates[dates.length - 1].dates.length - 1}`,
				1
			);
		}
	}

	function gotoTodaysDate() {
		getDates(totalDatesInARow);
	}

	function zoomIn() {
		if (zoomLevel < 3) {
			setZoomLevel((curr) => curr + 1);
			setTotalDatesInARow((curr) => curr - 2);
		}
	}

	function zoomOut() {
		if (zoomLevel > -3) {
			setZoomLevel((curr) => curr - 1);
			setTotalDatesInARow((curr) => curr + 2);
		}
	}

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

	function toggleExpand() {
		setExpandAll((curr) => !curr);
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="reservations">
				<div
					style={{
						marginBottom: ".5rem",
						display: "flex",
						gap: "1rem",
						justifyContent: "flex-end",
					}}
				>
					<div className="buttons">
						<div
							onClick={zoomOut}
							className={`${zoomLevel === -3 && "disabled"}`}
						>
							<AiOutlineMinus size={20} />
						</div>
						<div
							onClick={zoomIn}
							className={`${zoomLevel === 3 && "disabled"}`}
						>
							<IoAddOutline size={20} />
						</div>
					</div>
					<div className="buttons">
						<div onClick={prev}>
							<MdKeyboardArrowLeft size={20} />
						</div>
						<div onClick={gotoTodaysDate}>
							<span>Today</span>
						</div>
						<div onClick={next}>
							<MdKeyboardArrowRight size={20} />
						</div>
					</div>
				</div>

				<div className="row">
					<div className="row_left_bordered">
						<span style={{ fontWeight: "bold" }}>Rooms</span>
						<div onClick={toggleExpand}>
							<AiFillCaretDown
								color="#33A1FD"
								style={{
									transform: `rotate(${expandAll ? "-180" : "0"}deg)`,
									transition: ".3s all ease-in-out",
								}}
							/>
						</div>
					</div>
					<div className="row_right" ref={parentRef}>
						<ReservationsHeader
							dates={dates}
							currentSingleDateWidth={currentSingleDateWidth}
						/>
					</div>
				</div>
				<div className="row">
					<div className="row_left"></div>
					<div className="row_right">
						{dates.map((date) =>
							date.dates.map((el) => (
								<div
									className={`date`}
									style={{
										width: `${currentSingleDateWidth}px`,
										border: "none",
									}}
								>
									<span className={`num num_green`}>10</span>
								</div>
							))
						)}
					</div>
				</div>

				<Droppable droppableId="rooms">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{roomState.map((room, i) => (
								<RoomTypeRow
									key={room.id}
									room={room}
									index={i}
									dates={dates}
									currentSingleDateWidth={currentSingleDateWidth}
									expand={expandAll}
									hoveredIndex={hoveredIndex}
									setHoveredIndex={setHoveredIndex}
								/>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
}
