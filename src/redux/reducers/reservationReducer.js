import * as actionTypes from "../types/reservationActionTypes";

const initialState = {
	parent: null,
	currentSingleDateWidth: 0,
	totalDatesInARow: 0,
	zoomLevel: 0,
	hoverIndex: {},
	expandAll: true,
	dates: [],
};

export const reservationReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.APP_INIT: {
			const { parent, totalDatesInARow, dates, currentSingleDateWidth } =
				action.payload;
			return {
				...state,
				parent,
				totalDatesInARow,
				dates,
				currentSingleDateWidth,
			};
		}
		case actionTypes.SET_DATES: {
			const { totalDatesInARow, dates, currentSingleDateWidth } =
				action.payload;
			return {
				...state,
				currentSingleDateWidth,
				totalDatesInARow,
				dates,
			};
		}
		case actionTypes.SET_SINGLE_DATE_WIDTH: {
			const { currentSingleDateWidth } = action.payload;
			return {
				...state,
				currentSingleDateWidth,
			};
		}
		case actionTypes.PREV_DATE:
		case actionTypes.NEXT_DATE:
		case actionTypes.TODAY_DATE: {
			const { dates } = action.payload;
			return {
				...state,
				dates,
			};
		}
		case actionTypes.ZOOM_IN:
		case actionTypes.ZOOM_OUT: {
			const { zoomLevel, totalDatesInARow, dates, currentSingleDateWidth } =
				action.payload;
			return {
				...state,
				zoomLevel,
				totalDatesInARow,
				currentSingleDateWidth,
				dates,
			};
		}
		case actionTypes.SET_HOVERINDEX: {
			return {
				...state,
				hoverIndex: {
					parent: action.payload.parent,
					index: action.payload.index,
				},
			};
		}
		case actionTypes.SET_EXPAND_ALL: {
			return {
				...state,
				expandAll: !state.expandAll,
			};
		}
		default:
			return state;
	}
};
