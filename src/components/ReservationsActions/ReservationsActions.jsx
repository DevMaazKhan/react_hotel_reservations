import React, { memo } from "react";
import { Zoom } from "./Zoom/Zoom";
import { Navigate } from "./Navigate/Navigate";

export const ReservationsActions = memo(() => {
	return (
		<div className="reservation_actions">
			<Zoom />
			<Navigate />
		</div>
	);
});
