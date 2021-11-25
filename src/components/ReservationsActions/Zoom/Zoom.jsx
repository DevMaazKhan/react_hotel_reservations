import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux";

const mapStateToProps = (state) => ({
	zoomLevel: state.reservations.zoomLevel,
});

export const Zoom = connect(mapStateToProps)(({ zoomLevel }) => {
	const dispatch = useDispatch();
	const { zoomIn, zoomOut } = bindActionCreators(actionCreators, dispatch);

	return (
		<div className="buttons">
			<div onClick={zoomOut} className={`${zoomLevel === -3 && "disabled"}`}>
				<AiOutlineMinus size={20} />
			</div>
			<div onClick={zoomIn} className={`${zoomLevel === 3 && "disabled"}`}>
				<IoAddOutline size={20} />
			</div>
		</div>
	);
});
