import React, { useEffect, useRef, useState } from "react";
import { useContainerDimensions } from "../../hooks/useCurrentDimenssions";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import moment from "moment";

export function ReservationsHeader({ dates, currentSingleDateWidth }) {
	return (
		<>
			<div className="inner">
				{dates.map((date) => (
					<div className="month">
						<div
							className="monthName"
							style={{
								width: `calc(${
									currentSingleDateWidth * date.dates.length
								} + 1.5rem)`,
							}}
						>
							<span>{date.monthName}</span>
						</div>
						<div className="dates">
							{date.dates.map((el) => (
								<div
									className={`date ${el.activeDate && "activeDate"} ${
										(el.day === "Sat" || el.day === "Sun") && "weekend"
									}`}
									style={{ width: `${currentSingleDateWidth}px` }}
								>
									<span className="dateText">{el.date}</span>
									<span className="dayText">{el.day}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

// [
// 	{
// 		monthName: '',
// 		dates: [{date: '', day: ''}, {date: '', day: ''}]
// 	}
// 	{
// 		monthName: 'Dec',
// 		dates: [{date: '', day: ''}, {date: '', day: ''}]
// 	}
// ]
