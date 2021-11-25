import { combineReducers } from "redux";
import { reservationReducer } from "./reservationReducer";

export const reducers = combineReducers({
	reservations: reservationReducer,
});
