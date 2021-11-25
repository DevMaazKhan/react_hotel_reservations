import moment from "moment";

// Helper functions
export function getTotalDatesInARow(parent) {
	const width = parent.offsetWidth;
	if (width < 1420 && width > 1000) {
		return 17;
	} else if (width < 1000 && width > 600) {
		return 13;
	} else if (width < 600 && width > 10) {
		return 5;
	} else if (width > 1420) {
		return 23;
	}
}

export function getSingleDateWidth(parent, totalDatesInARow) {
	return parent.offsetWidth / totalDatesInARow;
}

export function getDates(noOfDates) {
	const todayDate = moment();
	// Get Previos Dates
	const prevDates = getPrevDates(todayDate, Math.floor(noOfDates / 2));
	// Get Next Dates
	const nextDates = getNextDates(todayDate, Math.floor(noOfDates / 2));
	// Merging all dates into 1 variable
	const allDates = [...prevDates, todayDate, ...nextDates];
	// Getting final dates in the correct format
	return getFinalDates(allDates, todayDate);
}

/**
 * This function will get 15 dates previous to the given date
 * @param {date} date
 * @returns previous dates of the given date
 */
export function getPrevDates(date, noOfDates) {
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
export function getNextDates(date, noOfDates) {
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
export function getFinalDates(dates, todayDate) {
	const tempArr = [];
	let tempObj = {};
	for (let i = 0; i < dates.length; i++) {
		const currMonth = dates[i].format("MMM") + " " + dates[i].format("YYYY");
		const currDate = dates[i].format("DD");
		const currDay = dates[i].format("ddd");
		const activeDate =
			currMonth === todayDate.format("MMM") + " " + todayDate.format("YYYY") &&
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
export function next(dates) {
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

		return tempDates;
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
		return tempDates;
	}
}

/**
 * This function is running when the Prev button in the UI is pressed, It will generate Prev date and remove last date
 */
export function prev(dates) {
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

		return tempDates;
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
		return tempDates;
	}
}

/**
 * This function will remove the first date from the given dates.
 * @param {dates} dates dates from which the first date has to be removed
 */
export function removeFirstDay(dates) {
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
export function removeLastDay(dates) {
	if (dates[dates.length - 1].dates.length === 1) {
		dates.splice(`${dates.length - 1}`, 1);
	} else {
		dates[dates.length - 1].dates.splice(
			`${dates[dates.length - 1].dates.length - 1}`,
			1
		);
	}
}

// export function onDragEnd(result) {
// 	const { destination, source, draggableId } = result;

// 	if (!destination) return;

// 	if (
// 		destination.droppableId === source.droppableId &&
// 		destination.index === source.index
// 	)
// 		return;

// 	const tempArr = Array.from(roomState);
// 	const destinationItem = tempArr[source.index];

// 	tempArr.splice(source.index, 1);
// 	tempArr.splice(destination.index, 0, destinationItem);

// 	setRooms([...tempArr]);
// }

// export function toggleExpand() {
// 	setExpandAll((curr) => !curr);
// }
