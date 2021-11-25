import { Reservations } from "./components/Reservations/Reservations";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "./redux";

import "./App.css";
import { bindActionCreators } from "redux";

function App() {
	const dispatch = useDispatch();
	const { recalculateDates, appInit } = bindActionCreators(
		actionCreators,
		dispatch
	);

	useEffect(() => {
		window.addEventListener("resize", callResize);
		window.addEventListener("load", callAppInit);

		return () => {
			window.removeEventListener("load", callAppInit);
			window.removeEventListener("resize", callResize);
		};
	}, []);

	function callResize() {
		recalculateDates();
	}

	function callAppInit() {
		const parent = document.querySelector("#parent");
		appInit(parent);
		recalculateDates();
	}

	return (
		<div>
			<Reservations />
		</div>
	);
}

export default App;
