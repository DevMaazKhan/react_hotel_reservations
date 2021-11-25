import * as actionTypes from "../types/reservationActionTypes";
import { helpers } from "../../helpers";

export const appInit = (parent) => (dispatch) => {
	const totalDatesInARow = helpers.getTotalDatesInARow(parent);
	const currentSingleDateWidth = helpers.getSingleDateWidth(
		parent,
		totalDatesInARow
	);
	const dates = helpers.getDates(totalDatesInARow);

	return dispatch({
		type: actionTypes.APP_INIT,
		payload: { parent, totalDatesInARow, currentSingleDateWidth, dates },
	});
};

export const recalculateDates = () => (dispatch, getState) => {
	const { parent, totalDatesInARow } = getState().reservations;
	const newTotalDatesInARow = helpers.getTotalDatesInARow(parent);
	const currentSingleDateWidth = helpers.getSingleDateWidth(
		parent,
		newTotalDatesInARow
	);

	dispatch({
		type: actionTypes.SET_SINGLE_DATE_WIDTH,
		payload: {
			currentSingleDateWidth,
		},
	});

	if (newTotalDatesInARow === totalDatesInARow) {
		return;
	}

	const dates = helpers.getDates(newTotalDatesInARow);

	dispatch({
		type: actionTypes.SET_DATES,
		payload: {
			totalDatesInARow: newTotalDatesInARow,
			currentSingleDateWidth,
			dates,
		},
	});
};

export const prevDate = () => (dispatch, getState) => {
	const { dates } = getState().reservations;

	const newDates = helpers.prev(dates);

	dispatch({
		type: actionTypes.PREV_DATE,
		payload: { dates: newDates },
	});
};

export const nextDate = () => (dispatch, getState) => {
	const { dates } = getState().reservations;

	const newDates = helpers.next(dates);

	dispatch({
		type: actionTypes.NEXT_DATE,
		payload: { dates: newDates },
	});
};

export const todaysDate = () => (dispatch, getState) => {
	const { totalDatesInARow } = getState().reservations;

	const dates = helpers.getDates(totalDatesInARow);

	dispatch({
		type: actionTypes.TODAY_DATE,
		payload: { dates },
	});
};

export const zoomIn = () => (dispatch, getState) => {
	const { zoomLevel, totalDatesInARow, parent } = getState().reservations;

	if (zoomLevel < 3) {
		const dates = helpers.getDates(totalDatesInARow - 2);
		const currentSingleDateWidth = helpers.getSingleDateWidth(
			parent,
			totalDatesInARow - 2
		);
		dispatch({
			type: actionTypes.ZOOM_IN,
			payload: {
				zoomLevel: zoomLevel + 1,
				totalDatesInARow: totalDatesInARow - 2,
				currentSingleDateWidth,
				dates,
			},
		});
	}
};

export const zoomOut = () => (dispatch, getState) => {
	const { zoomLevel, totalDatesInARow, parent } = getState().reservations;

	if (zoomLevel > -3) {
		const dates = helpers.getDates(totalDatesInARow + 2);
		const currentSingleDateWidth = helpers.getSingleDateWidth(
			parent,
			totalDatesInARow + 2
		);
		dispatch({
			type: actionTypes.ZOOM_IN,
			payload: {
				zoomLevel: zoomLevel - 1,
				totalDatesInARow: totalDatesInARow + 2,
				currentSingleDateWidth,
				dates,
			},
		});
	}
};

export const serHoveredIndex = (parent, index) => (dispatch) =>
	dispatch({ type: actionTypes.SET_HOVERINDEX, payload: { parent, index } });

export const setExpandAll = () => (dispatch) =>
	dispatch({ type: actionTypes.SET_EXPAND_ALL });
