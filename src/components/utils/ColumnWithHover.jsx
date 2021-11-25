import React, { memo, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
	const { currentSingleDateWidth } = state.reservations;
	const { index } = ownProps;
	return {
		currentSingleDateWidth,
		index,
	};
};

export const ColumnWithHover = connect(mapStateToProps)(
	memo(({ currentSingleDateWidth, index }) => {
		const ref = useRef(null);
		const [bgColor, setBgColor] = useState("transparent");

		useEffect(() => {
			const parentEl = document.getElementById("hover");
			parentEl.addEventListener("mousemove", hovering);
			parentEl.addEventListener("mouseleave", out);

			return () => parentEl.removeEventListener("mousemove", hovering);
		}, []);

		function out() {
			setBgColor("transparent");
		}

		function hovering(e) {
			if (ref.current) {
				const child = ref.current.getBoundingClientRect();
				if (
					e.clientX >= child.left &&
					e.clientX <= child.right &&
					e.clientY >= child.top &&
					e.clientY <= child.bottom
				) {
					setBgColor("rgba(227, 245, 252, .9)");
				} else {
					setBgColor("transparent");
				}
			}
		}

		return (
			<div
				ref={ref}
				className="hovered"
				id="child"
				style={{
					left: `${168 + currentSingleDateWidth * index + 2}px`,
					width: `${currentSingleDateWidth}px`,
					minHeight: `${currentSingleDateWidth}px`,
					backgroundColor: bgColor,
					pointerEvents: "none",
					zIndex: "0",
				}}
			></div>
		);
	})
);
